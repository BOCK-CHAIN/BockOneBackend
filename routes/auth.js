const express = require('express');
const pool = require('../utils/db');
const router = express.Router();
const crypto = require('crypto');
const { upload, buildCdnUrl } = require('../utils/s3');

// Upload profile photo to S3 (now returns CloudFront URL)
router.post('/upload-photo', upload.single('profilePhoto'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const key = req.file.key;             // e.g., profiles/...
  const imageUrl = buildCdnUrl(key);    // CloudFront URL

  return res.json({ key, imageUrl });
});

// SIGNUP
router.post('/signup', async (req, res) => {
  const {
    username, password, firstName, lastName,
    dob, gender, hexId, profilePhoto
  } = req.body;

  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    await pool.query(`
      INSERT INTO users (username, password, first_name, last_name, dob, gender, hex_id, profile_photo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [username, password, firstName, lastName, dob, gender, hexId, profilePhoto]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userRes = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userRes.rows.length === 0 || userRes.rows[0].password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', user: userRes.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//Krysonix Login
router.post('/krysonixLogin', async (req, res) => {
  const { hexId, password } = req.body;

  try {
    const userRes = await pool.query(
      'SELECT * FROM users WHERE hex_id = $1',
      [hexId]
    );

    if (userRes.rows.length === 0 || userRes.rows[0].password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', user: userRes.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
