const prisma = require('./prismaClient');
const logger = require('./logger');

/**
 * Create an audit log entry
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.action - e.g. 'file.upload', 'file.delete', 'auth.login'
 * @param {string} params.resourceType - 'file' | 'folder' | 'share' | 'auth' | 'admin'
 * @param {string} [params.resourceId]
 * @param {object} [params.metadata] - extra JSON data
 * @param {string} [params.ipAddress]
 * @param {string} [params.userAgent]
 */
const createAuditLog = async ({
  userId,
  action,
  resourceType,
  resourceId = null,
  metadata = {},
  ipAddress = null,
  userAgent = null,
}) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resourceType,
        resourceId,
        metadata,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    // Never let audit logging break the main flow
    logger.error('Failed to create audit log', { error: error.message, action, userId });
  }
};

/**
 * Extract IP address from request
 */
const getIpAddress = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.ip ||
    req.connection?.remoteAddress ||
    null
  );
};

module.exports = { createAuditLog, getIpAddress };
