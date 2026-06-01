import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import messagesRoutes from './routes/messages.js';
import commentsRoutes from './routes/comments.js';
import likesRoutes from './routes/likes.js';
import followsRoutes from './routes/follows.js';
import activitiesRoutes from './routes/activities.js';
import storiesRoutes from './routes/stories.js';
import profilesRoutes from './routes/profiles.js';
import reelsRoutes from './routes/reels.js';
import bookmarksRoutes from './routes/bookmarks.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/ruviel/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('/api/ruviel/api/auth', authRoutes);
app.use('/api/ruviel/api/posts', postsRoutes);
app.use('/api/ruviel/api/messages', messagesRoutes);
app.use('/api/ruviel/api/comments', commentsRoutes);
app.use('/api/ruviel/api/likes', likesRoutes);
app.use('/api/ruviel/api/follows', followsRoutes);
app.use('/api/ruviel/api/activities', activitiesRoutes);
app.use('/api/ruviel/api/stories', storiesRoutes);
app.use('/api/ruviel/api/profiles', profilesRoutes);
app.use('/api/ruviel/api/reels', reelsRoutes);
app.use('/api/ruviel/api/bookmarks', bookmarksRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;