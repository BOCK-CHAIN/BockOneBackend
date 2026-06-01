const Joi = require('joi');

/**
 * Validate request body against a Joi schema
 * Returns 400 with error details if invalid
 */
const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      })),
    });
  }
  req.body = value;
  next();
};

/**
 * Validate request query params against a Joi schema
 */
const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      message: 'Invalid query parameters',
      errors: error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      })),
    });
  }
  req.query = value;
  next();
};

// ─── Common Schemas ───────────────────────────────────────────────────────────

const schemas = {
  register: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(1).max(100).optional(),
  }),

  login: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),

  createFolder: Joi.object({
    name: Joi.string().min(1).max(255).required(),
    parentId: Joi.string().optional().allow(null, ''),
    color: Joi.string().optional(),
    description: Joi.string().max(500).optional(),
  }),

  renameItem: Joi.object({
    name: Joi.string().min(1).max(255).required(),
  }),

  createShare: Joi.object({
    fileId: Joi.string().optional(),
    folderId: Joi.string().optional(),
    sharedWithEmail: Joi.string().email({ tlds: { allow: false } }).optional(),
    permissionLevel: Joi.string().valid('view', 'edit', 'comment').default('view'),
    expiresAt: Joi.string().isoDate().optional().allow(null),
  }).or('fileId', 'folderId'),

  updateShare: Joi.object({
    permissionLevel: Joi.string().valid('view', 'edit', 'comment').optional(),
    expiresAt: Joi.string().isoDate().optional().allow(null),
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    hexId: Joi.string().optional(),
  }),
};

module.exports = { validateBody, validateQuery, schemas };
