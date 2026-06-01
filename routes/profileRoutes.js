const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { authenticateToken } = require('../middleware/auth');
const { validateBody, schemas } = require('../middleware/validate');
const { createAuditLog, getIpAddress } = require('../lib/auditLog');

// ─── GET /api/v1/profile ─────────────────────────────────────────────────────
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        hexId: true,
        profilePicture: true,
        planType: true,
        storageQuota: true,
        storageUsed: true,
        isEmailVerified: true,
        mfaEnabled: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: { files: true, folders: true },
        },
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user: {
        ...user,
        storageQuota: user.storageQuota.toString(),
        storageUsed: user.storageUsed.toString(),
      },
    });
  } catch (error) {
    logger.error('Get profile error', { error: error.message });
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

// ─── PUT /api/v1/profile ──────────────────────────────────────────────────────
router.put('/', authenticateToken, validateBody(schemas.updateProfile), async (req, res) => {
  try {
    const { name, hexId } = req.body;
    const userId = req.user.userId;

    // Check hexId uniqueness
    if (hexId) {
      const existing = await prisma.user.findFirst({ where: { hexId, id: { not: userId } } });
      if (existing) return res.status(400).json({ message: 'Hex ID already in use' });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(hexId !== undefined && { hexId }),
      },
      select: {
        id: true, email: true, name: true, hexId: true,
        profilePicture: true, planType: true, storageQuota: true, storageUsed: true,
      },
    });

    await createAuditLog({ userId, action: 'profile.update', resourceType: 'auth',
      ipAddress: getIpAddress(req) });

    res.json({
      message: 'Profile updated successfully',
      user: { ...updated, storageQuota: updated.storageQuota.toString(), storageUsed: updated.storageUsed.toString() },
    });
  } catch (error) {
    logger.error('Update profile error', { error: error.message });
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// ─── POST /api/v1/profile/avatar ─────────────────────────────────────────────
const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

router.post('/avatar', authenticateToken, avatarUpload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    const userId = req.user.userId;
    const useS3 = !!(process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID);

    let profilePicture = null;
    let s3Key = null;

    if (useS3) {
      const { uploadFile, buildAvatarKey, getCloudfrontUrl } = require('../lib/s3');
      const ext = path.extname(req.file.originalname) || '.jpg';
      s3Key = buildAvatarKey(userId, `avatar${ext}`);
      const result = await uploadFile({
        key: s3Key,
        body: req.file.buffer,
        contentType: req.file.mimetype,
      });
      profilePicture = result.cloudFrontUrl;
    } else {
      // Fallback: save to disk (not recommended for production)
      const fs = require('fs');
      const uploadsDir = path.join(__dirname, '../../uploads', userId);
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const filename = `avatar${path.extname(req.file.originalname) || '.jpg'}`;
      fs.writeFileSync(path.join(uploadsDir, filename), req.file.buffer);
      profilePicture = `/uploads/${userId}/${filename}`;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { profilePicture, profilePictureS3Key: s3Key },
    });

    logger.info('Avatar updated', { userId });

    res.json({ message: 'Avatar updated successfully', profilePicture });
  } catch (error) {
    logger.error('Avatar upload error', { error: error.message });
    if (error.message === 'Only image files are allowed') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
});

// ─── GET /api/v1/profile/hex/:hexId – Get user by hexId ──────────────────────
router.get('/hex/:hexId', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { hexId: req.params.hexId },
      select: { id: true, name: true, hexId: true, profilePicture: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to find user' });
  }
});

module.exports = router;
