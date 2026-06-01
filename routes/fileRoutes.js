const express = require('express');
const router = express.Router();
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { getPresignedDownloadUrl, deleteFile: deleteS3File, getCloudfrontUrl } = require('../lib/s3');
const { decrementStorageUsed } = require('../lib/storageHelper');
const { createAuditLog, getIpAddress } = require('../lib/auditLog');
const { authenticateToken } = require('../middleware/auth');
const { validateBody, schemas } = require('../middleware/validate');
const path = require('path');
const fs = require('fs');

// ─── Serialize file (BigInt → string) ────────────────────────────────────────
const serializeFile = (file) => ({
  id: file.id,
  name: file.name,
  originalName: file.originalName,
  type: 'FILE',
  mimeType: file.mimeType,
  size: file.size?.toString() || '0',
  s3Key: file.s3Key || null,
  cloudFrontUrl: file.cloudFrontUrl || null,
  // Only expose cloudFrontUrl as public URL when CloudFront is configured
  url: process.env.CLOUDFRONT_URL ? (file.cloudFrontUrl || null) : null,
  publicUrl: process.env.CLOUDFRONT_URL ? (file.cloudFrontUrl || null) : null,
  filePath: file.filePath || null,
  isStarred: file.isStarred,
  isInTrash: file.isInTrash,
  folderId: file.folderId,
  versionCount: file.versionCount,
  createdAt: file.createdAt,
  updatedAt: file.updatedAt,
  trashedAt: file.trashedAt,
  lastAccessedAt: file.lastAccessedAt,
});

// ─── GET /api/files – List files + folders in a directory ────────────────────
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { folderId, type, sort = 'name', order = 'asc' } = req.query;
    const userId = req.user.userId;

    const orderBy = sort === 'size' ? { size: order } :
                    sort === 'date' ? { createdAt: order } :
                    { name: order };

    const [files, folders] = await Promise.all([
      type === 'folder' ? [] : prisma.file.findMany({
        where: { userId, folderId: folderId || null, isInTrash: false },
        orderBy,
      }),
      type === 'file' ? [] : prisma.folder.findMany({
        where: { userId, parentId: folderId || null, isInTrash: false },
        orderBy: { name: order },
      }),
    ]);

    const allItems = [
      ...folders.map((f) => ({ id: f.id, name: f.name, type: 'FOLDER', isStarred: f.isStarred, color: f.color, folderId: f.parentId, createdAt: f.createdAt, updatedAt: f.updatedAt })),
      ...files.map(serializeFile),
    ];

    res.json({ files: allItems, currentFolder: folderId || null, total: allItems.length });
  } catch (error) {
    logger.error('List files error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch files' });
  }
});

// ─── GET /api/files/starred ───────────────────────────────────────────────────
router.get('/starred', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [files, folders] = await Promise.all([
      prisma.file.findMany({ where: { userId, isStarred: true, isInTrash: false }, orderBy: { updatedAt: 'desc' } }),
      prisma.folder.findMany({ where: { userId, isStarred: true, isInTrash: false }, orderBy: { updatedAt: 'desc' } }),
    ]);

    res.json({
      files: files.map(serializeFile),
      folders,
    });
  } catch (error) {
    logger.error('Starred files error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch starred files' });
  }
});

// ─── GET /api/files/recent ────────────────────────────────────────────────────
router.get('/recent', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = Math.min(parseInt(req.query.limit || '20'), 50);

    const files = await prisma.file.findMany({
      where: { userId, isInTrash: false },
      orderBy: { updatedAt: 'desc' },
      take: limit,
    });

    res.json({ files: files.map(serializeFile) });
  } catch (error) {
    logger.error('Recent files error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch recent files' });
  }
});

// ─── GET /api/files/search ────────────────────────────────────────────────────
router.get('/search', authenticateToken, async (req, res) => {
  try {
    const { q, mimeType } = req.query;
    const userId = req.user.userId;

    if (!q) return res.status(400).json({ message: 'Search query is required' });

    const [files, folders] = await Promise.all([
      prisma.file.findMany({
        where: {
          userId,
          isInTrash: false,
          ...(mimeType && { mimeType: { contains: mimeType, mode: 'insensitive' } }),
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { originalName: { contains: q, mode: 'insensitive' } },
          ],
        },
        orderBy: { name: 'asc' },
        take: 50,
      }),
      prisma.folder.findMany({
        where: {
          userId,
          isInTrash: false,
          name: { contains: q, mode: 'insensitive' },
        },
        take: 20,
      }),
    ]);

    res.json({ files: files.map(serializeFile), folders, query: q });
  } catch (error) {
    logger.error('Search error', { error: error.message });
    res.status(500).json({ message: 'Failed to search files' });
  }
});

// ─── GET /api/files/trash – List trashed items ───────────────────────────────
router.get('/trash', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [files, folders] = await Promise.all([
      prisma.file.findMany({ where: { userId, isInTrash: true }, orderBy: { trashedAt: 'desc' } }),
      prisma.folder.findMany({ where: { userId, isInTrash: true }, orderBy: { trashedAt: 'desc' } }),
    ]);
    res.json({ files: files.map(serializeFile), folders });
  } catch (error) {
    logger.error('Trash list error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch trash' });
  }
});

// ─── GET /api/files/:id – Get file metadata ──────────────────────────────────
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json({ file: serializeFile(file) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch file' });
  }
});

// ─── GET /api/files/:id/url – Get presigned download URL ─────────────────────
router.get('/:id/url', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.id, userId: req.user.userId, isInTrash: false },
    });
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (file.s3Key) {
      const url = await getPresignedDownloadUrl(file.s3Key, 3600);
      await prisma.file.update({ where: { id: file.id }, data: { lastAccessedAt: new Date() } });
      return res.json({ url, expires: 3600, cloudFrontUrl: file.cloudFrontUrl });
    }

    if (file.filePath) {
      // Return a proxy URL for local files
      return res.json({ url: `/api/files/proxy/${file.id}`, expires: null });
    }

    res.status(404).json({ message: 'File storage location not found' });
  } catch (error) {
    logger.error('Get file URL error', { error: error.message });
    res.status(500).json({ message: 'Failed to get file URL' });
  }
});

// ─── GET /api/files/:id/versions – List file versions ───────────────────────
router.get('/:id/versions', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.id, userId: req.user.userId },
    });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const versions = await prisma.fileVersion.findMany({
      where: { fileId: file.id },
      orderBy: { versionNumber: 'desc' },
      include: { createdBy: { select: { id: true, name: true, email: true } } },
    });

    res.json({ versions: versions.map(v => ({ ...v, size: v.size?.toString() })) });
  } catch (error) {
    logger.error('Get versions error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch versions' });
  }
});

// ─── PATCH /api/files/:id/rename ─────────────────────────────────────────────
router.patch('/:id/rename', authenticateToken, validateBody(schemas.renameItem), async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({ where: { id, userId } });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const updated = await prisma.file.update({ where: { id }, data: { name } });

    await createAuditLog({ userId, action: 'file.rename', resourceType: 'file', resourceId: id,
      metadata: { oldName: file.name, newName: name }, ipAddress: getIpAddress(req) });

    res.json({ file: serializeFile(updated) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to rename file' });
  }
});

// ─── PATCH /api/files/:id/star ────────────────────────────────────────────────
router.patch('/:id/star', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const updated = await prisma.file.update({ where: { id: req.params.id }, data: { isStarred: !file.isStarred } });
    res.json({ file: serializeFile(updated), starred: updated.isStarred });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle star' });
  }
});

// ─── PATCH /api/files/:id/trash – Move to trash ──────────────────────────────
router.patch('/:id/trash', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const updated = await prisma.file.update({
      where: { id: req.params.id },
      data: { isInTrash: true, trashedAt: new Date() },
    });

    await createAuditLog({ userId: req.user.userId, action: 'file.trash', resourceType: 'file',
      resourceId: file.id, ipAddress: getIpAddress(req) });

    res.json({ message: 'File moved to trash', file: serializeFile(updated) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move to trash' });
  }
});

// ─── PATCH /api/files/:id/restore ────────────────────────────────────────────
router.patch('/:id/restore', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const updated = await prisma.file.update({
      where: { id: req.params.id },
      data: { isInTrash: false, trashedAt: null },
    });

    await createAuditLog({ userId: req.user.userId, action: 'file.restore', resourceType: 'file',
      resourceId: file.id, ipAddress: getIpAddress(req) });

    res.json({ message: 'File restored', file: serializeFile(updated) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to restore file' });
  }
});

// ─── DELETE /api/files/trash – Empty all trash ───────────────────────────────
router.delete('/trash', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const trashFiles = await prisma.file.findMany({ where: { userId, isInTrash: true } });

    // Delete from S3
    const { deleteFile } = require('../lib/s3');
    await Promise.allSettled(
      trashFiles.filter((f) => f.s3Key).map((f) => deleteFile(f.s3Key))
    );

    // Delete local files
    trashFiles.filter((f) => f.filePath).forEach((f) => {
      try { if (fs.existsSync(f.filePath)) fs.unlinkSync(f.filePath); } catch {}
    });

    const deleted = await prisma.file.deleteMany({ where: { userId, isInTrash: true } });

    await createAuditLog({ userId, action: 'trash.empty', resourceType: 'file',
      metadata: { count: deleted.count }, ipAddress: getIpAddress(req) });

    res.json({ message: `${deleted.count} files permanently deleted`, deletedCount: deleted.count });
  } catch (error) {
    logger.error('Empty trash error', { error: error.message });
    res.status(500).json({ message: 'Failed to empty trash' });
  }
});

// ─── DELETE /api/files/:id – Permanently delete ──────────────────────────────
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({ where: { id, userId } });
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Delete from S3
    if (file.s3Key) {
      try { await deleteS3File(file.s3Key); } catch (e) { logger.warn('S3 delete failed', { key: file.s3Key, error: e.message }); }
    }

    // Delete local file
    if (file.filePath) {
      try { if (fs.existsSync(file.filePath)) fs.unlinkSync(file.filePath); } catch {}
    }

    await prisma.file.delete({ where: { id } });
    await decrementStorageUsed(userId, Number(file.size));

    await createAuditLog({ userId, action: 'file.delete', resourceType: 'file', resourceId: id,
      metadata: { fileName: file.originalName }, ipAddress: getIpAddress(req) });

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    logger.error('Delete file error', { error: error.message });
    res.status(500).json({ message: 'Failed to delete file' });
  }
});

// ─── GET /api/files/proxy/:id – Serve local files ────────────────────────────
router.get('/proxy/:fileId', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.fileId, userId: req.user.userId, isInTrash: false },
    });
    if (!file) return res.status(404).json({ message: 'File not found' });

    // If S3, redirect to presigned URL
    if (file.s3Key) {
      const url = await getPresignedDownloadUrl(file.s3Key, 300);
      return res.redirect(url);
    }

    if (!file.filePath || !fs.existsSync(file.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    await prisma.file.update({ where: { id: file.id }, data: { lastAccessedAt: new Date() } });

    res.set({
      'Content-Type': file.mimeType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${file.originalName}"`,
      'Cache-Control': 'public, max-age=3600',
    });

    fs.createReadStream(file.filePath).pipe(res);
  } catch (error) {
    logger.error('File proxy error', { error: error.message });
    res.status(500).json({ message: 'Failed to serve file' });
  }
});

// ─── GET /api/files/download/:id – Force download ───────────────────────────
router.get('/download/:fileId', authenticateToken, async (req, res) => {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.fileId, userId: req.user.userId, isInTrash: false },
    });
    if (!file) return res.status(404).json({ message: 'File not found' });

    await prisma.file.update({ where: { id: file.id }, data: { lastAccessedAt: new Date() } });

    if (file.s3Key) {
      const url = await getPresignedDownloadUrl(file.s3Key, 300);
      return res.redirect(url);
    }

    if (!file.filePath || !fs.existsSync(file.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.originalName}"`,
      'Cache-Control': 'no-cache',
    });

    fs.createReadStream(file.filePath).pipe(res);
  } catch (error) {
    logger.error('File download error', { error: error.message });
    res.status(500).json({ message: 'Failed to download file' });
  }
});

module.exports = router;
