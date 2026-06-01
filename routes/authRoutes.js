const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { createAuditLog, getIpAddress } = require('../lib/auditLog');
const { validateBody, schemas } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');
const { authenticateToken } = require('../middleware/auth');

// ─── Helper ───────────────────────────────────────────────────────────────────
const generateTokens = (user) => {
  const payload = { userId: user.id, email: user.email, role: user.role || 'user' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: '30d' });
  return { token, refreshToken };
};

const userPublic = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  hexId: user.hexId || null,
  profilePicture: user.profilePicture || null,
  planType: user.planType || 'free',
  storageQuota: user.storageQuota?.toString() || '5368709120',
  storageUsed: user.storageUsed?.toString() || '0',
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  lastLoginAt: user.lastLoginAt,
});

// ─── POST /register ───────────────────────────────────────────────────────────
router.post('/register', authLimiter, validateBody(schemas.register), async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        password: hashedPassword,
        storageQuota: BigInt(process.env.DEFAULT_USER_QUOTA || '5368709120'),
      },
    });

    const { token, refreshToken } = generateTokens(user);

    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

    await createAuditLog({
      userId: user.id,
      action: 'auth.register',
      resourceType: 'auth',
      ipAddress: getIpAddress(req),
      userAgent: req.headers['user-agent'],
    });

    logger.info('User registered', { userId: user.id, email });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      refreshToken,
      user: userPublic(user),
    });
  } catch (error) {
    logger.error('Registration error', { error: error.message });
    res.status(500).json({ message: 'Registration failed' });
  }
});

// ─── POST /login ──────────────────────────────────────────────────────────────
router.post('/login', authLimiter, validateBody(schemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      await createAuditLog({
        userId: user.id,
        action: 'auth.login.failed',
        resourceType: 'auth',
        ipAddress: getIpAddress(req),
        userAgent: req.headers['user-agent'],
      });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { token, refreshToken } = generateTokens(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), refreshToken },
    });

    await createAuditLog({
      userId: user.id,
      action: 'auth.login',
      resourceType: 'auth',
      ipAddress: getIpAddress(req),
      userAgent: req.headers['user-agent'],
    });

    logger.info('User logged in', { userId: user.id });

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: userPublic(user),
    });
  } catch (error) {
    logger.error('Login error', { error: error.message });
    res.status(500).json({ message: 'Login failed' });
  }
});

// ─── GET /me ──────────────────────────────────────────────────────────────────
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: userPublic(user) });
  } catch (error) {
    logger.error('Get me error', { error: error.message });
    res.status(500).json({ message: 'Failed to get user info' });
  }
});

// ─── POST /refresh ────────────────────────────────────────────────────────────
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const tokens = generateTokens(user);
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } });

    res.json({ token: tokens.token, refreshToken: tokens.refreshToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});

// ─── POST /logout ─────────────────────────────────────────────────────────────
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { refreshToken: null },
    });
    await createAuditLog({
      userId: req.user.userId,
      action: 'auth.logout',
      resourceType: 'auth',
      ipAddress: getIpAddress(req),
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
});

// ─── POST /forgot-password ────────────────────────────────────────────────────
router.post('/forgot-password', authLimiter, validateBody(schemas.forgotPassword), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always respond 200 to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordResetToken: resetToken, passwordResetExpiry: resetExpiry },
    });

    // In production, send email here. For now, return the token in dev.
    logger.info('Password reset requested', { userId: user.id, email });
    const responseData = { message: 'If that email exists, a reset link has been sent.' };
    if (process.env.NODE_ENV === 'development') {
      responseData.resetToken = resetToken; // Only expose in dev
    }

    res.json(responseData);
  } catch (error) {
    logger.error('Forgot password error', { error: error.message });
    res.status(500).json({ message: 'Failed to process request' });
  }
});

// ─── POST /reset-password ─────────────────────────────────────────────────────
router.post('/reset-password', authLimiter, validateBody(schemas.resetPassword), async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
        refreshToken: null, // Invalidate all sessions
      },
    });

    await createAuditLog({
      userId: user.id,
      action: 'auth.password_reset',
      resourceType: 'auth',
      ipAddress: getIpAddress(req),
    });

    res.json({ message: 'Password reset successfully. Please log in.' });
  } catch (error) {
    logger.error('Reset password error', { error: error.message });
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

// ─── POST /firebase-login (Google OAuth via Firebase) ────────────────────────
router.post('/firebase-login', authLimiter, async (req, res) => {
  try {
    const { firebaseToken } = req.body;
    if (!firebaseToken) {
      return res.status(400).json({ message: 'Firebase token required' });
    }

    let firebaseAdmin;
    try {
      firebaseAdmin = require('../lib/firebase');
    } catch (e) {
      return res.status(503).json({ message: 'Firebase auth not configured' });
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    const { email, name, picture, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ message: 'Email not available from Firebase token' });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          profilePicture: picture || null,
          isEmailVerified: true,
          storageQuota: BigInt(process.env.DEFAULT_USER_QUOTA || '5368709120'),
        },
      });
      logger.info('New user via Firebase OAuth', { userId: user.id, email });
    }

    const { token, refreshToken } = generateTokens(user);
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), refreshToken },
    });

    await createAuditLog({
      userId: user.id,
      action: 'auth.firebase_login',
      resourceType: 'auth',
      ipAddress: getIpAddress(req),
    });

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: userPublic(user),
    });
  } catch (error) {
    logger.error('Firebase login error', { error: error.message });
    res.status(401).json({ message: 'Firebase authentication failed' });
  }
});

module.exports = router;
