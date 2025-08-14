const express = require('express');
const pool = require('../utils/db');
const router = express.Router();

// GET user profile
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE user profile
router.put('/:username', async (req, res) => {
  const { username } = req.params;
  const {
    username: newUsername,
    firstName,
    lastName,
    password,
    gender,
    dob,
    profilePhoto
  } = req.body;

  try {
    const fields = [];
    const values = [];
    let i = 1;

    if (newUsername) {
      fields.push(`username = $${i++}`);
      values.push(newUsername);
    }
    if (firstName) {
      fields.push(`first_name = $${i++}`);
      values.push(firstName);
    }
    if (lastName) {
      fields.push(`last_name = $${i++}`);
      values.push(lastName);
    }
    if (password) {
      fields.push(`password = $${i++}`);
      values.push(password);
    }
    if (gender) {
      fields.push(`gender = $${i++}`);
      values.push(gender);
    }
    if (dob) {
      fields.push(`dob = $${i++}`);
      values.push(dob);
    }
    if (profilePhoto) {
      fields.push(`profile_photo = $${i++}`);
      values.push(profilePhoto);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided' });
    }

    values.push(username); // original username for WHERE clause

    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE username = $${i} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'Profile updated', user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
