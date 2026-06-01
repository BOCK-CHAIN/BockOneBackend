const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const logger = require('./lib/logger');
const { apiLimiter } = require('./middleware/rateLimiter');

// ─── Route Imports ─────────────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const fileRoutes = require('./routes/fileRoutes');
const folderRoutes = require('./routes/folderRoutes');
const shareRoutes = require('./routes/shareRoutes');
const storageRoutes = require('./routes/storageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ─── Ensure logs directory exists ─────────────────────────────────────────────
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow CDN/cross-origin images
  contentSecurityPolicy: false, // Disable CSP for API (no HTML responses)
}));

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Request Logging ──────────────────────────────────────────────────────────
app.use(logger.requestMiddleware);

// ─── Global Rate Limiter ───────────────────────────────────────────────────────
app.use('/api/', apiLimiter);

// ─── Serve local uploaded files (fallback when S3 not configured) ─────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/drive/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    storage: process.env.AWS_S3_BUCKET ? 's3' : 'local',
  });
});

// ─── API Version 1 Routes ─────────────────────────────────────────────────────
// New versioned routes
app.use('/api/drive/api/v1/auth', authRoutes);
app.use('/api/drive/api/v1/upload', uploadRoutes);
app.use('/api/drive/api/v1/files', fileRoutes);
app.use('/api/drive/api/v1/folders', folderRoutes);
app.use('/api/drive/api/v1/shares', shareRoutes);
app.use('/api/drive/api/v1/storage', storageRoutes);
app.use('/api/drive/api/v1/profile', profileRoutes);
app.use('/api/drive/api/v1/admin', adminRoutes);

// ─── Backward-Compatible Routes (legacy /api/ prefix – keeps Flutter app working)
app.use('/api/drive/api/auth', authRoutes);
app.use('/api/drive/api/upload', uploadRoutes);
app.use('/api/drive/api/files', fileRoutes);
app.use('/api/drive/api/folders', folderRoutes);
app.use('/api/drive/api/shares', shareRoutes);

// ─── API Info Endpoint ────────────────────────────────────────────────────────
app.get('/api', (req, res) => {
  res.json({
    name: 'BockDrive API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      files: '/api/v1/files',
      folders: '/api/v1/folders',
      upload: '/api/v1/upload',
      shares: '/api/v1/shares',
      storage: '/api/v1/storage',
      profile: '/api/v1/profile',
      admin: '/api/v1/admin',
    },
    docs: 'https://github.com/your-repo/BockDrive#api-docs',
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((error, req, res, next) => {
  logger.error('Unhandled error', {
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  logger.info(`🚀 BockDrive API running on ${HOST}:${PORT}`);
  logger.info(`📊  Health: http://localhost:${PORT}/health`);
  logger.info(`📋  API Info: http://localhost:${PORT}/api`);
  logger.info(`🗂️  Storage: ${process.env.AWS_S3_BUCKET ? `S3 (${process.env.AWS_S3_BUCKET})` : 'Local Disk'}`);
  logger.info(`🌍  Node env: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
