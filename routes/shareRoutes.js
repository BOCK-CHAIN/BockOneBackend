const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { createAuditLog, getIpAddress } = require('../lib/auditLog');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateBody, schemas } = require('../middleware/validate');

// ─── POST /api/v1/shares – Create a share ────────────────────────────────────
router.post('/', authenticateToken, validateBody(schemas.createShare), async (req, res) => {
  try {
    const { fileId, folderId, sharedWithEmail, permissionLevel, expiresAt } = req.body;
    const userId = req.user.userId;

    // Verify ownership
    if (fileId) {
      const file = await prisma.file.findFirst({ where: { id: fileId, userId, isInTrash: false } });
      if (!file) return res.status(404).json({ message: 'File not found' });
    }
    if (folderId) {
      const folder = await prisma.folder.findFirst({ where: { id: folderId, userId, isInTrash: false } });
      if (!folder) return res.status(404).json({ message: 'Folder not found' });
    }

    // Find recipient if email provided
    let sharedWithUserId = null;
    if (sharedWithEmail) {
      const recipient = await prisma.user.findUnique({ where: { email: sharedWithEmail } });
      if (recipient) sharedWithUserId = recipient.id;
      if (recipient?.id === userId) {
        return res.status(400).json({ message: 'Cannot share with yourself' });
      }
    }

    const share = await prisma.share.create({
      data: {
        fileId: fileId || null,
        folderId: folderId || null,
        sharedByUserId: userId,
        sharedWithUserId,
        sharedWithEmail: sharedWithEmail || null,
        permissionLevel: permissionLevel || 'view',
        isPublic: !sharedWithEmail,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    await createAuditLog({ userId, action: 'share.create', resourceType: 'share', resourceId: share.id,
      metadata: { fileId, folderId, sharedWithEmail, permissionLevel }, ipAddress: getIpAddress(req) });

    logger.info('Share created', { shareId: share.id, userId });

    res.status(201).json({
      message: 'Share created successfully',
      share: {
        id: share.id,
        shareToken: share.shareToken,
        shareLink: `${process.env.APP_URL || 'http://localhost:3001'}/api/v1/shares/access/${share.shareToken}`,
        permissionLevel: share.permissionLevel,
        isPublic: share.isPublic,
        expiresAt: share.expiresAt,
        createdAt: share.createdAt,
      },
    });
  } catch (error) {
    logger.error('Create share error', { error: error.message });
    res.status(500).json({ message: 'Failed to create share' });
  }
});

// ─── GET /api/v1/shares – My created shares ───────────────────────────────────
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const shares = await prisma.share.findMany({
      where: { sharedByUserId: userId, isRevoked: false },
      include: {
        file: { select: { id: true, originalName: true, mimeType: true, size: true } },
        folder: { select: { id: true, name: true } },
        sharedWith: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const serialized = shares.map((s) => ({
      ...s,
      file: s.file ? { ...s.file, size: s.file.size?.toString() } : null,
    }));

    res.json({ shares: serialized });
  } catch (error) {
    logger.error('List shares error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch shares' });
  }
});

// ─── GET /api/v1/shares/with-me – Shared with me ─────────────────────────────
router.get('/with-me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });

    const shares = await prisma.share.findMany({
      where: {
        isRevoked: false,
        OR: [
          { sharedWithUserId: userId },
          { sharedWithEmail: user.email },
        ],
      },
      include: {
        file: { select: { id: true, originalName: true, mimeType: true, size: true } },
        folder: { select: { id: true, name: true } },
        sharedBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const serialized = shares.map((s) => ({
      ...s,
      file: s.file ? { ...s.file, size: s.file.size?.toString() } : null,
    }));

    res.json({ shares: serialized });
  } catch (error) {
    logger.error('Shares with-me error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch shared items' });
  }
});

// ─── GET /api/v1/shares/:id – Get share details ──────────────────────────────
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const share = await prisma.share.findFirst({
      where: { id: req.params.id, sharedByUserId: userId },
      include: {
        file: { select: { id: true, originalName: true, mimeType: true, size: true } },
        folder: { select: { id: true, name: true } },
        sharedWith: { select: { id: true, name: true, email: true } },
      },
    });

    if (!share) return res.status(404).json({ message: 'Share not found' });

    res.json({ share: { ...share, file: share.file ? { ...share.file, size: share.file.size?.toString() } : null } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch share' });
  }
});

// ─── GET /api/v1/shares/access/:token – Public access via token ──────────────
router.get('/access/:token', optionalAuth, async (req, res) => {
  try {
    const share = await prisma.share.findFirst({
      where: { shareToken: req.params.token, isRevoked: false },
      include: {
        file: true,
        folder: { include: { files: true, children: true } },
        sharedBy: { select: { name: true, email: true } },
      },
    });

    if (!share) return res.status(404).json({ message: 'Shared link not found or revoked' });

    // Check expiry
    if (share.expiresAt && new Date() > share.expiresAt) {
      return res.status(410).json({ message: 'This share link has expired' });
    }

    // Increment access count
    await prisma.share.update({ where: { id: share.id }, data: { accessCount: { increment: 1 } } });

    // Build download URL if file
    let downloadUrl = null;
    if (share.file?.s3Key) {
      const { getPresignedDownloadUrl } = require('../lib/s3');
      downloadUrl = await getPresignedDownloadUrl(share.file.s3Key, 3600);
    }

    res.json({
      share: {
        id: share.id,
        permissionLevel: share.permissionLevel,
        isPublic: share.isPublic,
        expiresAt: share.expiresAt,
        sharedBy: share.sharedBy,
      },
      file: share.file ? {
        id: share.file.id,
        name: share.file.originalName,
        mimeType: share.file.mimeType,
        size: share.file.size?.toString(),
        downloadUrl,
        cloudFrontUrl: share.file.cloudFrontUrl,
        url: process.env.CLOUDFRONT_URL ? share.file.cloudFrontUrl : (downloadUrl || null),
        publicUrl: process.env.CLOUDFRONT_URL ? share.file.cloudFrontUrl : (downloadUrl || null),
      } : null,
      folder: share.folder ? {
        id: share.folder.id,
        name: share.folder.name,
        files: share.folder.files.map((f) => ({ ...f, size: f.size?.toString() })),
        subfolders: share.folder.children,
      } : null,
    });
  } catch (error) {
    logger.error('Share access error', { error: error.message });
    res.status(500).json({ message: 'Failed to access shared content' });
  }
});

// ─── PUT /api/v1/shares/:id – Update share ───────────────────────────────────
router.put('/:id', authenticateToken, validateBody(schemas.updateShare), async (req, res) => {
  try {
    const { permissionLevel, expiresAt } = req.body;
    const userId = req.user.userId;

    const share = await prisma.share.findFirst({ where: { id: req.params.id, sharedByUserId: userId } });
    if (!share) return res.status(404).json({ message: 'Share not found' });

    const updated = await prisma.share.update({
      where: { id: share.id },
      data: {
        ...(permissionLevel && { permissionLevel }),
        ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null }),
      },
    });

    res.json({ message: 'Share updated', share: updated });
  } catch (error) {
    logger.error('Update share error', { error: error.message });
    res.status(500).json({ message: 'Failed to update share' });
  }
});

// ─── DELETE /api/v1/shares/:id – Revoke share ────────────────────────────────
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const share = await prisma.share.findFirst({ where: { id: req.params.id, sharedByUserId: userId } });
    if (!share) return res.status(404).json({ message: 'Share not found' });

    await prisma.share.update({ where: { id: share.id }, data: { isRevoked: true } });

    await createAuditLog({ userId, action: 'share.revoke', resourceType: 'share', resourceId: share.id,
      ipAddress: getIpAddress(req) });

    res.json({ message: 'Share revoked successfully' });
  } catch (error) {
    logger.error('Revoke share error', { error: error.message });
    res.status(500).json({ message: 'Failed to revoke share' });
  }
});

module.exports = router;
