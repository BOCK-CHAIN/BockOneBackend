// server.js - Complete BockSheets Backend API
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));

// Database connection
const connectionString = process.env.DATABASE_URL || 
  `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'bocksheets_db'}`;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle database client:', err.message || err);
});

let dbStatus = 'starting';
let lastDbError = null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const testDatabaseConnection = async (attempt = 1) => {
  const maxAttempts = Number(process.env.DB_CONNECT_RETRIES || 5);
  const retryDelayMs = Number(process.env.DB_CONNECT_RETRY_DELAY_MS || 5000);

  try {
    await pool.query('SELECT NOW()');
    dbStatus = 'connected';
    lastDbError = null;
    console.log('✅ Database connected successfully');
  } catch (err) {
    dbStatus = 'error';
    lastDbError = err.code || err.message;
    console.error(`❌ Database connection failed (attempt ${attempt}/${maxAttempts}):`, err);

    if (attempt < maxAttempts) {
      await sleep(retryDelayMs);
      return testDatabaseConnection(attempt + 1);
    }
  }
};

testDatabaseConnection();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// =====================================================
// HEALTH CHECK
// =====================================================
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: dbStatus,
    databaseError: lastDbError,
    message: 'BockSheets API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/sheets/health', (req, res) => {
  res.json({
    status: 'ok',
    database: dbStatus,
    databaseError: lastDbError,
    message: 'BockSheets API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: dbStatus,
    databaseError: lastDbError,
    message: 'BockSheets API is running',
    timestamp: new Date().toISOString()
  });
});

// =====================================================
// AUTH ROUTES
// =====================================================

// Sign Up
app.post('/api/sheets/auth/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO public.profiles (username, email, password_hash) 
       VALUES ($1, $2, $3) RETURNING id, username, email, full_name, created_at`,
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Email or username already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Sign In
app.post('/api/sheets/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT * FROM public.profiles WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// PROFILE ROUTES
// =====================================================

// Get Profile
app.get('/api/sheets/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, full_name, avatar_url, created_at FROM public.profiles WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update Profile
app.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username, full_name, avatar_url } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (username) {
      updates.push(`username = $${paramCount++}`);
      values.push(username);
    }
    if (full_name !== undefined) {
      updates.push(`full_name = $${paramCount++}`);
      values.push(full_name);
    }
    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramCount++}`);
      values.push(avatar_url);
    }

    values.push(req.user.userId);

    const result = await pool.query(
      `UPDATE public.profiles SET ${updates.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING id, username, email, full_name, avatar_url`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// SPREADSHEET ROUTES
// =====================================================

// Get All Spreadsheets
app.get('/api/sheets/spreadsheets', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, is_deleted, created_at, updated_at, last_accessed_at
       FROM public.spreadsheets 
       WHERE owner_id = $1
       ORDER BY updated_at DESC`,
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get spreadsheets error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create Spreadsheet
app.post('/api/sheets/spreadsheets', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      `INSERT INTO public.spreadsheets (owner_id, title, description)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.user.userId, title || 'Untitled Spreadsheet', description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create spreadsheet error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get Spreadsheet by ID
app.get('/api/sheets/spreadsheets/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public.spreadsheets 
       WHERE id = $1 AND owner_id = $2`,
      [req.params.id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get spreadsheet error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update Spreadsheet
app.put('/spreadsheets/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, is_deleted, last_accessed_at } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (is_deleted !== undefined) {
      updates.push(`is_deleted = $${paramCount++}`);
      values.push(is_deleted);
    }
    if (last_accessed_at !== undefined) {
      updates.push(`last_accessed_at = $${paramCount++}`);
      values.push(last_accessed_at);
    }

    values.push(req.params.id, req.user.userId);

    const result = await pool.query(
      `UPDATE public.spreadsheets SET ${updates.join(', ')} 
       WHERE id = $${paramCount} AND owner_id = $${paramCount + 1}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update spreadsheet error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete Spreadsheet (hard delete)
app.delete('/spreadsheets/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM public.spreadsheets 
       WHERE id = $1 AND owner_id = $2 
       RETURNING id`,
      [req.params.id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Delete spreadsheet error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// CELL ROUTES
// =====================================================

// Get Cells
app.get('/api/sheets/spreadsheets/:id/cells', authenticateToken, async (req, res) => {
  try {
    // Verify ownership
    const ownerCheck = await pool.query(
      'SELECT id FROM public.spreadsheets WHERE id = $1 AND owner_id = $2',
      [req.params.id, req.user.userId]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    const result = await pool.query(
      `SELECT * FROM public.cells WHERE spreadsheet_id = $1 ORDER BY row_index, column_index`,
      [req.params.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get cells error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save Cells
app.post('/api/sheets/spreadsheets/:id/cells', authenticateToken, async (req, res) => {
  const client = await pool.connect();

  try {
    const { cells } = req.body;

    // Verify ownership
    const ownerCheck = await client.query(
      'SELECT id FROM public.spreadsheets WHERE id = $1 AND owner_id = $2',
      [req.params.id, req.user.userId]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    await client.query('BEGIN');

    // Delete existing cells
    await client.query(
      'DELETE FROM public.cells WHERE spreadsheet_id = $1',
      [req.params.id]
    );

    // Insert new cells
    if (cells && cells.length > 0) {
      for (const cell of cells) {
        await client.query(
          `INSERT INTO public.cells (
            spreadsheet_id, row_index, column_index, value, display_value, 
            data_type, formula, font_weight, font_style, text_decoration, 
            text_align, background_color, font_color, font_size
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            req.params.id,
            cell.row_index,
            cell.column_index,
            cell.value,
            cell.display_value,
            cell.data_type,
            cell.formula,
            cell.font_weight,
            cell.font_style,
            cell.text_decoration,
            cell.text_align,
            cell.background_color,
            cell.font_color,
            cell.font_size,
          ]
        );
      }
    }

    await client.query('COMMIT');

    res.json({ success: true, count: cells?.length || 0 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Save cells error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// =====================================================
// COLUMN SETTINGS ROUTES
// =====================================================

// Get Column Settings
app.get('/api/sheets/spreadsheets/:id/columns', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cs.* FROM public.column_settings cs
       JOIN public.spreadsheets s ON s.id = cs.spreadsheet_id
       WHERE cs.spreadsheet_id = $1 AND s.owner_id = $2`,
      [req.params.id, req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get column settings error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save Column Settings
app.post('/api/sheets/spreadsheets/:id/columns', authenticateToken, async (req, res) => {
  try {
    const { column_index, width } = req.body;

    const result = await pool.query(
      `INSERT INTO public.column_settings (spreadsheet_id, column_index, width)
       VALUES ($1, $2, $3)
       ON CONFLICT (spreadsheet_id, column_index) 
       DO UPDATE SET width = $3
       RETURNING *`,
      [req.params.id, column_index, width]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Save column settings error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// ROW SETTINGS ROUTES
// =====================================================

// Get Row Settings
app.get('/api/sheets/spreadsheets/:id/rows', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT rs.* FROM public.row_settings rs
       JOIN public.spreadsheets s ON s.id = rs.spreadsheet_id
       WHERE rs.spreadsheet_id = $1 AND s.owner_id = $2`,
      [req.params.id, req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get row settings error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save Row Settings
app.post('/api/sheets/spreadsheets/:id/rows', authenticateToken, async (req, res) => {
  try {
    const { row_index, height } = req.body;

    const result = await pool.query(
      `INSERT INTO public.row_settings (spreadsheet_id, row_index, height)
       VALUES ($1, $2, $3)
       ON CONFLICT (spreadsheet_id, row_index) 
       DO UPDATE SET height = $3
       RETURNING *`,
      [req.params.id, row_index, height]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Save row settings error:', error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// ERROR HANDLER
// =====================================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// =====================================================
// START SERVER
// =====================================================
// Server configuration
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log(`🚀 BockSheets API running on ${host}:${port}`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ========================================');
  console.log('');
  console.log('🔒 CORS allowed origins:');
  allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
  console.log('');
  console.log('📋 Available endpoints:');
  console.log('   GET  /health');
  console.log('   POST /auth/signup');
  console.log('   POST /auth/login');
  console.log('   GET  /profile');
  console.log('   PUT  /profile');
  console.log('   GET  /spreadsheets');
  console.log('   POST /spreadsheets');
  console.log('   GET  /spreadsheets/:id');
  console.log('   PUT  /spreadsheets/:id');
  console.log('   DELETE /spreadsheets/:id');
  console.log('   GET  /spreadsheets/:id/cells');
  console.log('   POST /spreadsheets/:id/cells');
  console.log('   GET  /spreadsheets/:id/columns');
  console.log('   POST /spreadsheets/:id/columns');
  console.log('   GET  /spreadsheets/:id/rows');
  console.log('   POST /spreadsheets/:id/rows');
  console.log('');
});
