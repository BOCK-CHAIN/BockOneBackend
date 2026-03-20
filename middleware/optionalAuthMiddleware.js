const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'bockdocs_secret_key';

// Optional auth middleware - doesn't fail if no token is provided
// Sets req.user if token is valid, otherwise req.user remains undefined
const optionalAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    }
    // If no auth header or invalid token, just continue without req.user
    next();
  } catch (error) {
    // Invalid token, but don't fail - just continue without req.user
    // The controller will check for share token as alternative
    next();
  }
};

module.exports = optionalAuthMiddleware;

