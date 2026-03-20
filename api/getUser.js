const pool = require('./_utils/db');

module.exports = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res
        .status(403)
        .json({ error: 'Forbidden: User email not found in token.' });
    }

    const result = await pool.query(
      'SELECT name, email FROM users WHERE email = $1',
      [userEmail]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
