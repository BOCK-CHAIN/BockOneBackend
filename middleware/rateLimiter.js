const rateLimit = require('express-rate-limit');

/**
 * Strict rate limiter for auth endpoints
 * 15 requests per 15 minutes per IP
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests from this IP. Please try again in 15 minutes.',
    retryAfter: 900,
  },
  skipSuccessfulRequests: false,
});

/**
 * General API rate limiter
 * 200 requests per minute per IP
 */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests. Please slow down.',
  },
});

/**
 * File upload rate limiter
 * 30 uploads per minute per IP
 */
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many upload requests. Please slow down.',
  },
});

module.exports = { authLimiter, apiLimiter, uploadLimiter };
