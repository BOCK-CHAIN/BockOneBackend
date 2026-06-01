const prisma = require('./prismaClient');
const logger = require('./logger');

/**
 * Get current storage usage and quota for a user
 */
const getStorageInfo = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      storageQuota: true,
      storageUsed: true,
      planType: true,
    },
  });

  if (!user) throw new Error('User not found');

  return {
    used: user.storageUsed || BigInt(0),
    limit: user.storageQuota,
    planType: user.planType || 'free',
    available: user.storageQuota - (user.storageUsed || BigInt(0)),
    usedBytes: (user.storageUsed || BigInt(0)).toString(),
    limitBytes: user.storageQuota.toString(),
    usedPercent: Number(((user.storageUsed || BigInt(0)) * BigInt(100)) / user.storageQuota),
  };
};

/**
 * Check if a user has enough storage space for a given file size
 */
const checkStorageAvailable = async (userId, fileSizeBytes) => {
  const info = await getStorageInfo(userId);
  const fileSizeBigInt = BigInt(fileSizeBytes);
  if (info.used + fileSizeBigInt > info.limit) {
    const available = info.limit - info.used;
    throw new Error(
      `Insufficient storage. You need ${formatBytes(fileSizeBigInt)} but only ${formatBytes(available)} is available.`
    );
  }
  return true;
};

/**
 * Increment the user's used storage by the given bytes
 */
const incrementStorageUsed = async (userId, bytes) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        storageUsed: {
          increment: BigInt(bytes),
        },
      },
    });
  } catch (err) {
    logger.error('Failed to increment storage used', { userId, bytes, error: err.message });
  }
};

/**
 * Decrement the user's used storage by the given bytes
 */
const decrementStorageUsed = async (userId, bytes) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { storageUsed: true },
    });

    const current = user?.storageUsed || BigInt(0);
    const decrement = BigInt(bytes);
    const newValue = current > decrement ? current - decrement : BigInt(0);

    await prisma.user.update({
      where: { id: userId },
      data: { storageUsed: newValue },
    });
  } catch (err) {
    logger.error('Failed to decrement storage used', { userId, bytes, error: err.message });
  }
};

/**
 * Recalculate a user's used storage from the database (repair function)
 */
const recalculateStorageUsed = async (userId) => {
  const result = await prisma.file.aggregate({
    where: { userId, isInTrash: false },
    _sum: { size: true },
  });

  const totalUsed = result._sum.size || BigInt(0);

  await prisma.user.update({
    where: { id: userId },
    data: { storageUsed: totalUsed },
  });

  return totalUsed;
};

/**
 * Human-readable bytes formatter
 */
const formatBytes = (bytes) => {
  const n = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const PLAN_QUOTAS = {
  free: BigInt(5) * BigInt(1024) * BigInt(1024) * BigInt(1024),       // 5GB
  pro: BigInt(100) * BigInt(1024) * BigInt(1024) * BigInt(1024),      // 100GB
  business: BigInt(1024) * BigInt(1024) * BigInt(1024) * BigInt(1024), // 1TB
};

module.exports = {
  getStorageInfo,
  checkStorageAvailable,
  incrementStorageUsed,
  decrementStorageUsed,
  recalculateStorageUsed,
  formatBytes,
  PLAN_QUOTAS,
};
