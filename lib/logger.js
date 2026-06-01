const winston = require('winston');
const path = require('path');

const { combine, timestamp, json, colorize, printf, errors } = winston.format;

// Custom format for development
const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `${timestamp} [${level}] ${message}`;
  if (Object.keys(meta).length) log += ` ${JSON.stringify(meta)}`;
  if (stack) log += `\n${stack}`;
  return log;
});

const transports = [
  new winston.transports.Console({
    format: process.env.NODE_ENV === 'production'
      ? combine(timestamp(), json())
      : combine(
          colorize(),
          timestamp({ format: 'HH:mm:ss' }),
          errors({ stack: true }),
          devFormat
        )
  })
];

// File transports in production
if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      format: combine(timestamp(), json())
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      format: combine(timestamp(), json())
    })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports
});

// HTTP request logger middleware
logger.requestMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection?.remoteAddress,
      userAgent: req.headers['user-agent']
    };
    if (res.statusCode >= 500) {
      logger.error('HTTP Request', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('HTTP Request', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });
  next();
};

module.exports = logger;
