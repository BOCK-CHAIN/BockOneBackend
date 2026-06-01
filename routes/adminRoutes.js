const express = require('express');
const router = express.Router();
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { formatBytes } = require('../lib/storageHelper');

// All admin routes require admin role
router.use(authenticateToken, requireAdmin);

// ─── GET /api/v1/admin/users ──────────────────────────────────────────────────
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = search
      ? { OR: [{ email: { contains: search, mode: 'insensitive' } }, { name: { contains: search, mode: 'insensitive' } }] }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, email: true, name: true, role: true, planType: true,
          storageQuota: true, storageUsed: true, isEmailVerified: true,
          createdAt: true, lastLoginAt: true,
          _count: { select: { files: true, folders: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const serialized = users.map((u) => ({
      ...u,
      storageQuota: u.storageQuota.toString(),
      storageUsed: u.storageUsed.toString(),
      storageHuman: {
        used: formatBytes(u.storageUsed),
        limit: formatBytes(u.storageQuota),
      },
    }));

    res.json({
      users: serialized,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    logger.error('Admin list users error', { error: error.message });
    res.status(500).json({ message: 'Failed to list users' });
  }
});

// ─── GET /api/v1/admin/stats ──────────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalFiles,
      totalFolders,
      totalShares,
      recentUsers,
      storageResult,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.file.count({ where: { isInTrash: false } }),
      prisma.folder.count({ where: { isInTrash: false } }),
      prisma.share.count({ where: { isRevoked: false } }),
      prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, email: true, name: true, createdAt: true } }),
      prisma.file.aggregate({ where: { isInTrash: false }, _sum: { size: true } }),
    ]);

    const planCounts = await prisma.user.groupBy({ by: ['planType'], _count: true });

    res.json({
      overview: {
        totalUsers,
        totalFiles,
        totalFolders,
        totalShares,
        totalStorageUsed: storageResult._sum.size?.toString() || '0',
        totalStorageHuman: formatBytes(storageResult._sum.size || BigInt(0)),
      },
      planDistribution: planCounts.reduce((acc, p) => {
        acc[p.planType || 'free'] = p._count;
        return acc;
      }, {}),
      recentUsers,
    });
  } catch (error) {
    logger.error('Admin stats error', { error: error.message });
    res.status(500).json({ message: 'Failed to get stats' });
  }
});

// ─── GET /api/v1/admin/audit-logs ────────────────────────────────────────────
router.get('/audit-logs', async (req, res) => {
  try {
    const { page = 1, limit = 50, userId, action, resourceType } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(userId && { userId }),
      ...(action && { action: { contains: action, mode: 'insensitive' } }),
      ...(resourceType && { resourceType }),
    };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, email: true } } },
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    logger.error('Admin audit logs error', { error: error.message });
    res.status(500).json({ message: 'Failed to get audit logs' });
  }
});

// ─── PATCH /api/v1/admin/users/:id/role ──────────────────────────────────────
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role must be: user or admin' });
    }

    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, email: true, name: true, role: true },
    });

    logger.info('User role updated by admin', { targetUserId: req.params.id, role, adminId: req.user.userId });
    res.json({ message: 'User role updated', user: updated });
  } catch (error) {
    logger.error('Admin role update error', { error: error.message });
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

// ─── DELETE /api/v1/admin/users/:id ──────────────────────────────────────────
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.userId) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await prisma.user.delete({ where: { id } });

    logger.warn('User deleted by admin', { targetUserId: id, adminId: req.user.userId });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Admin delete user error', { error: error.message });
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
