const jwt = require('jsonwebtoken');

/**
 * Standard JWT authentication middleware
 * Attaches decoded user payload to req.user
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  // Fallback to token query parameter (used for file preview/download URLs
  // that cannot set the Authorization header, e.g. Image.network, browser links)
  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

/**
 * Optional authentication – attaches user if token present, continues either way
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err) req.user = user;
    next();
  });
};

/**
 * Admin-only middleware – must be used after authenticateToken
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { authenticateToken, optionalAuth, requireAdmin };
