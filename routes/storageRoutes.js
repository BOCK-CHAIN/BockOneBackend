const express = require('express');
const router = express.Router();
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { authenticateToken } = require('../middleware/auth');
const { getStorageInfo, formatBytes, PLAN_QUOTAS, recalculateStorageUsed } = require('../lib/storageHelper');

// ─── GET /api/v1/storage/quota ────────────────────────────────────────────────
router.get('/quota', authenticateToken, async (req, res) => {
  try {
    const info = await getStorageInfo(req.user.userId);

    res.json({
      used: info.usedBytes,
      limit: info.limitBytes,
      available: info.available.toString(),
      usedPercent: Math.min(100, info.usedPercent),
      planType: info.planType,
      humanReadable: {
        used: formatBytes(info.used),
        limit: formatBytes(info.limit),
        available: formatBytes(info.available),
      },
    });
  } catch (error) {
    logger.error('Get quota error', { error: error.message });
    res.status(500).json({ message: 'Failed to get storage quota' });
  }
});

// ─── GET /api/v1/storage/plans ────────────────────────────────────────────────
router.get('/plans', async (req, res) => {
  res.json({
    plans: [
      {
        id: 'free',
        name: 'Free',
        storageBytes: PLAN_QUOTAS.free.toString(),
        storageHuman: '5 GB',
        priceMonthly: 0,
        features: ['5 GB storage', 'File sharing', 'Basic support'],
      },
      {
        id: 'pro',
        name: 'Pro',
        storageBytes: PLAN_QUOTAS.pro.toString(),
        storageHuman: '100 GB',
        priceMonthly: 9.99,
        features: ['100 GB storage', 'File versioning', 'Advanced sharing', 'Priority support'],
      },
      {
        id: 'business',
        name: 'Business',
        storageBytes: PLAN_QUOTAS.business.toString(),
        storageHuman: '1 TB',
        priceMonthly: 29.99,
        features: ['1 TB storage', 'Unlimited versioning', 'Team management', 'API access', '24/7 support'],
      },
    ],
  });
});

// ─── POST /api/v1/storage/upgrade ────────────────────────────────────────────
router.post('/upgrade', authenticateToken, async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user.userId;

    if (!['free', 'pro', 'business'].includes(planType)) {
      return res.status(400).json({ message: 'Invalid plan type. Must be: free, pro, business' });
    }

    const newQuota = PLAN_QUOTAS[planType];

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { planType, storageQuota: newQuota },
    });

    logger.info('Plan upgraded', { userId, planType });

    res.json({
      message: `Successfully upgraded to ${planType} plan`,
      plan: planType,
      storageQuota: newQuota.toString(),
      storageHuman: formatBytes(newQuota),
    });
  } catch (error) {
    logger.error('Plan upgrade error', { error: error.message });
    res.status(500).json({ message: 'Failed to upgrade plan' });
  }
});

// ─── POST /api/v1/storage/recalculate – Admin utility ────────────────────────
router.post('/recalculate', authenticateToken, async (req, res) => {
  try {
    const totalUsed = await recalculateStorageUsed(req.user.userId);
    res.json({
      message: 'Storage recalculated',
      storageUsed: totalUsed.toString(),
      human: formatBytes(totalUsed),
    });
  } catch (error) {
    logger.error('Recalculate error', { error: error.message });
    res.status(500).json({ message: 'Failed to recalculate storage' });
  }
});

module.exports = router;
