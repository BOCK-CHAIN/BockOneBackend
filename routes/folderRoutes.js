const express = require('express');
const router = express.Router();
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { createAuditLog, getIpAddress } = require('../lib/auditLog');
const { authenticateToken } = require('../middleware/auth');
const { validateBody, schemas } = require('../middleware/validate');

// ─── POST /api/folders ────────────────────────────────────────────────────────
router.post('/', authenticateToken, validateBody(schemas.createFolder), async (req, res) => {
  try {
    const { name, parentId, color, description } = req.body;
    const userId = req.user.userId;

    if (parentId) {
      const parent = await prisma.folder.findFirst({ where: { id: parentId, userId } });
      if (!parent) return res.status(404).json({ message: 'Parent folder not found' });
    }

    const existing = await prisma.folder.findFirst({
      where: { name, parentId: parentId || null, userId, isInTrash: false },
    });
    if (existing) return res.status(400).json({ message: 'A folder with this name already exists' });

    const folder = await prisma.folder.create({
      data: { name, parentId: parentId || null, userId, color: color || null, description: description || null },
    });

    await createAuditLog({ userId, action: 'folder.create', resourceType: 'folder',
      resourceId: folder.id, metadata: { name }, ipAddress: getIpAddress(req) });

    res.status(201).json({ message: 'Folder created successfully', folder });
  } catch (error) {
    logger.error('Create folder error', { error: error.message });
    res.status(500).json({ message: 'Failed to create folder' });
  }
});

// ─── GET /api/folders ─────────────────────────────────────────────────────────
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { parentId } = req.query;
    const userId = req.user.userId;

    const folders = await prisma.folder.findMany({
      where: { userId, parentId: parentId || null, isInTrash: false },
      orderBy: { name: 'asc' },
    });

    res.json({ folders });
  } catch (error) {
    logger.error('Get folders error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch folders' });
  }
});

// ─── GET /api/folders/:id ─────────────────────────────────────────────────────
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.userId },
      include: {
        children: { where: { isInTrash: false }, orderBy: { name: 'asc' } },
        files: { where: { isInTrash: false }, orderBy: { name: 'asc' } },
      },
    });

    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    const filesWithStrings = folder.files.map((f) => ({ ...f, size: f.size?.toString() }));
    res.json({ folder: { ...folder, files: filesWithStrings } });
  } catch (error) {
    logger.error('Get folder error', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch folder' });
  }
});

// ─── PATCH /api/folders/:id – Rename ─────────────────────────────────────────
router.patch('/:id', authenticateToken, validateBody(schemas.renameItem), async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({ where: { id, userId } });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    const conflict = await prisma.folder.findFirst({
      where: { name, parentId: folder.parentId, userId, isInTrash: false, id: { not: id } },
    });
    if (conflict) return res.status(400).json({ message: 'A folder with this name already exists' });

    const updated = await prisma.folder.update({ where: { id }, data: { name } });

    await createAuditLog({ userId, action: 'folder.rename', resourceType: 'folder', resourceId: id,
      metadata: { oldName: folder.name, newName: name }, ipAddress: getIpAddress(req) });

    res.json({ message: 'Folder renamed', folder: updated });
  } catch (error) {
    logger.error('Rename folder error', { error: error.message });
    res.status(500).json({ message: 'Failed to rename folder' });
  }
});

// ─── PATCH /api/folders/:id/move – Move to another parent ────────────────────
router.patch('/:id/move', authenticateToken, async (req, res) => {
  try {
    const { parentId } = req.body;
    const { id } = req.params;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({ where: { id, userId } });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    // Prevent moving into itself or its own children
    if (parentId === id) return res.status(400).json({ message: 'Cannot move folder into itself' });

    if (parentId) {
      const newParent = await prisma.folder.findFirst({ where: { id: parentId, userId } });
      if (!newParent) return res.status(404).json({ message: 'Target folder not found' });
    }

    const updated = await prisma.folder.update({
      where: { id },
      data: { parentId: parentId || null },
    });

    res.json({ message: 'Folder moved', folder: updated });
  } catch (error) {
    logger.error('Move folder error', { error: error.message });
    res.status(500).json({ message: 'Failed to move folder' });
  }
});

// ─── PATCH /api/folders/:id/star ─────────────────────────────────────────────
router.patch('/:id/star', authenticateToken, async (req, res) => {
  try {
    const folder = await prisma.folder.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    const updated = await prisma.folder.update({
      where: { id: req.params.id },
      data: { isStarred: !folder.isStarred },
    });
    res.json({ folder: updated, starred: updated.isStarred });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle star' });
  }
});

// ─── PATCH /api/folders/:id/trash – Move folder to trash ─────────────────────
router.patch('/:id/trash', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({ where: { id, userId } });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    // Recursively trash all children
    const trashRecursive = async (folderId) => {
      await prisma.file.updateMany({
        where: { folderId, isInTrash: false },
        data: { isInTrash: true, trashedAt: new Date() },
      });
      const children = await prisma.folder.findMany({ where: { parentId: folderId, isInTrash: false } });
      for (const child of children) {
        await trashRecursive(child.id);
        await prisma.folder.update({ where: { id: child.id }, data: { isInTrash: true, trashedAt: new Date() } });
      }
    };

    await trashRecursive(id);
    const updated = await prisma.folder.update({ where: { id }, data: { isInTrash: true, trashedAt: new Date() } });

    await createAuditLog({ userId, action: 'folder.trash', resourceType: 'folder', resourceId: id,
      ipAddress: getIpAddress(req) });

    res.json({ message: 'Folder moved to trash', folder: updated });
  } catch (error) {
    logger.error('Trash folder error', { error: error.message });
    res.status(500).json({ message: 'Failed to move folder to trash' });
  }
});

// ─── PATCH /api/folders/:id/restore ──────────────────────────────────────────
router.patch('/:id/restore', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({ where: { id, userId } });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    const updated = await prisma.folder.update({ where: { id }, data: { isInTrash: false, trashedAt: null } });

    await createAuditLog({ userId, action: 'folder.restore', resourceType: 'folder', resourceId: id,
      ipAddress: getIpAddress(req) });

    res.json({ message: 'Folder restored', folder: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to restore folder' });
  }
});

// ─── DELETE /api/folders/:id – Permanently delete ────────────────────────────
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { force } = req.query;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({ where: { id, userId } });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    if (force !== 'true') {
      const [childFolders, childFiles] = await Promise.all([
        prisma.folder.count({ where: { parentId: id, isInTrash: false } }),
        prisma.file.count({ where: { folderId: id, isInTrash: false } }),
      ]);
      if (childFolders > 0 || childFiles > 0) {
        return res.status(400).json({
          message: 'Folder is not empty. Use ?force=true to delete with all contents.',
          childFolders, childFiles,
        });
      }
    }

    await prisma.folder.delete({ where: { id } });

    await createAuditLog({ userId, action: 'folder.delete', resourceType: 'folder', resourceId: id,
      metadata: { name: folder.name }, ipAddress: getIpAddress(req) });

    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    logger.error('Delete folder error', { error: error.message });
    res.status(500).json({ message: 'Failed to delete folder' });
  }
});

// ─── GET /api/folders/:id/path – Breadcrumb ──────────────────────────────────
router.get('/:id/path', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id || id === 'null') return res.json({ path: [] });

    const buildPath = async (folderId, acc = []) => {
      if (!folderId) return acc;
      const f = await prisma.folder.findFirst({ where: { id: folderId, userId } });
      if (!f) return acc;
      const item = { id: f.id, name: f.name };
      return f.parentId ? buildPath(f.parentId, [item, ...acc]) : [item, ...acc];
    };

    const pathItems = await buildPath(id);
    res.json({ path: pathItems });
  } catch (error) {
    logger.error('Folder path error', { error: error.message });
    res.status(500).json({ message: 'Failed to get folder path' });
  }
});

module.exports = router;
