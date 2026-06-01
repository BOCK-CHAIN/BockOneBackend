const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/docs/api/documents', documentRoutes);
app.use('/api/docs/api/auth', authRoutes);

// Health check endpoint
app.get('/api/docs/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all interfaces for mobile access

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Accessible at http://localhost:${PORT} (local)`);
  console.log(`For mobile devices, use your computer's IP address: http://<YOUR_IP>:${PORT}`);
});
