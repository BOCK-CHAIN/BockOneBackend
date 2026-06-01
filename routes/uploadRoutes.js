const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const prisma = require('../lib/prismaClient');
const logger = require('../lib/logger');
const { s3Client, buildFileKey, getCloudfrontUrl, BUCKET } = require('../lib/s3');
const { checkStorageAvailable, incrementStorageUsed } = require('../lib/storageHelper');
const { createAuditLog, getIpAddress } = require('../lib/auditLog');
const { authenticateToken } = require('../middleware/auth');
const { uploadLimiter } = require('../middleware/rateLimiter');

// ─── Local Storage (fallback if S3 not configured) ───────────────────────────
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const localStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?.userId;
    const userDir = path.join(uploadsDir, userId);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

// ─── S3 Storage Engine ───────────────────────────────────────────────────────
const s3StorageEngine = multerS3({
  s3: s3Client,
  bucket: BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const userId = req.user?.userId;
    const fileId = uuidv4();
    req.fileId = fileId; // Save for DB record
    const key = buildFileKey(userId, fileId, file.originalname);
    cb(null, key);
  },
  metadata: (req, file, cb) => {
    cb(null, {
      userId: req.user?.userId,
      originalName: file.originalname,
    });
  },
});

// Use S3 if bucket is configured, otherwise fall back to local disk
const useS3 = !!(process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID);
const storageEngine = useS3 ? s3StorageEngine : localStorageEngine;

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '104857600') }, // 100MB default
  fileFilter: (req, file, cb) => {
    // Allow all file types – add restrictions here if needed
    cb(null, true);
  },
});

// ─── POST /api/upload – Single file upload ────────────────────────────────────
router.post('/', authenticateToken, uploadLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { folderId } = req.body;
    const userId = req.user.userId;
    const fileSize = req.file.size;

    // Validate storage quota
    await checkStorageAvailable(userId, fileSize);

    // Determine storage paths
    const isS3Upload = useS3 && req.file.location;
    const s3Key = isS3Upload ? req.file.key : null;
    const localPath = isS3Upload ? null : req.file.path;
    const cloudFrontUrl = isS3Upload ? getCloudfrontUrl(s3Key) : null;

    // Validate folderId ownership if provided
    if (folderId) {
      const folder = await prisma.folder.findFirst({ where: { id: folderId, userId } });
      if (!folder) return res.status(404).json({ message: 'Folder not found' });
    }

    const file = await prisma.file.create({
      data: {
        name: req.file.filename || path.basename(req.file.originalname),
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: BigInt(fileSize),
        filePath: localPath,
        s3Key,
        cloudFrontUrl,
        folderId: folderId || null,
        userId,
      },
    });

    await incrementStorageUsed(userId, fileSize);

    await createAuditLog({
      userId,
      action: 'file.upload',
      resourceType: 'file',
      resourceId: file.id,
      metadata: { fileName: file.originalName, size: fileSize, storage: isS3Upload ? 's3' : 'local' },
      ipAddress: getIpAddress(req),
    });

    logger.info('File uploaded', { userId, fileId: file.id, size: fileSize, storage: isS3Upload ? 's3' : 'local' });

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file.id,
        name: file.originalName,
        mimeType: file.mimeType,
        size: file.size.toString(),
        s3Key: file.s3Key,
        cloudFrontUrl: file.cloudFrontUrl,
        url: process.env.CLOUDFRONT_URL ? file.cloudFrontUrl : null,
        publicUrl: process.env.CLOUDFRONT_URL ? file.cloudFrontUrl : null,
        folderId: file.folderId,
        createdAt: file.createdAt,
      },
    });
  } catch (error) {
    // Clean up local file if DB failed
    if (req.file?.path && !useS3) {
      try { fs.unlinkSync(req.file.path); } catch {}
    }
    logger.error('Upload error', { error: error.message });
    if (error.message?.includes('Insufficient storage')) {
      return res.status(413).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

// ─── POST /api/upload/multiple – Multiple files ───────────────────────────────
router.post('/multiple', authenticateToken, uploadLimiter,
  upload.array('files', parseInt(process.env.MAX_FILES_PER_UPLOAD || '10')),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const { folderId } = req.body;
      const userId = req.user.userId;
      const totalSize = req.files.reduce((sum, f) => sum + f.size, 0);

      await checkStorageAvailable(userId, totalSize);

      if (folderId) {
        const folder = await prisma.folder.findFirst({ where: { id: folderId, userId } });
        if (!folder) return res.status(404).json({ message: 'Folder not found' });
      }

      const files = await Promise.all(
        req.files.map(async (f) => {
          const isS3Upload = useS3 && f.location;
          const s3Key = isS3Upload ? f.key : null;
          const cloudFrontUrl = isS3Upload ? getCloudfrontUrl(s3Key) : null;

          return prisma.file.create({
            data: {
              name: f.filename || path.basename(f.originalname),
              originalName: f.originalname,
              mimeType: f.mimetype,
              size: BigInt(f.size),
              filePath: isS3Upload ? null : f.path,
              s3Key,
              cloudFrontUrl,
              folderId: folderId || null,
              userId,
            },
          });
        })
      );

      await incrementStorageUsed(userId, totalSize);

      logger.info('Multiple files uploaded', { userId, count: files.length });

      res.status(201).json({
        message: `${files.length} file(s) uploaded successfully`,
        files: files.map((f) => ({
          id: f.id,
          name: f.originalName,
          mimeType: f.mimeType,
          size: f.size.toString(),
          cloudFrontUrl: f.cloudFrontUrl,
          url: process.env.CLOUDFRONT_URL ? f.cloudFrontUrl : null,
          publicUrl: process.env.CLOUDFRONT_URL ? f.cloudFrontUrl : null,
          folderId: f.folderId,
          createdAt: f.createdAt,
        })),
      });
    } catch (error) {
      if (req.files && !useS3) {
        req.files.forEach((f) => { try { if (f.path) fs.unlinkSync(f.path); } catch {} });
      }
      logger.error('Multiple upload error', { error: error.message });
      if (error.message?.includes('Insufficient storage')) {
        return res.status(413).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to upload files' });
    }
  }
);

// ─── POST /api/upload/presign – Get a presigned S3 URL for direct client upload
router.post('/presign', authenticateToken, async (req, res) => {
  try {
    if (!useS3) {
      return res.status(503).json({ message: 'Direct upload not available in local storage mode' });
    }

    const { fileName, contentType, folderId, fileSize } = req.body;
    if (!fileName || !contentType) {
      return res.status(400).json({ message: 'fileName and contentType are required' });
    }

    const userId = req.user.userId;

    if (fileSize) await checkStorageAvailable(userId, fileSize);

    const fileId = uuidv4();
    const key = buildFileKey(userId, fileId, fileName);
    const { getPresignedUploadUrl } = require('../lib/s3');
    const presignedUrl = await getPresignedUploadUrl(key, contentType);

    res.json({
      presignedUrl,
      key,
      fileId,
      cloudFrontUrl: getCloudfrontUrl(key),
    });
  } catch (error) {
    logger.error('Presign error', { error: error.message });
    res.status(500).json({ message: 'Failed to generate presigned URL' });
  }
});

// ─── POST /api/upload/confirm-presign – Confirm a presigned upload completed
router.post('/confirm-presign', authenticateToken, async (req, res) => {
  try {
    const { key, fileName, mimeType, size, folderId } = req.body;
    if (!key || !fileName || !size) {
      return res.status(400).json({ message: 'key, fileName, and size are required' });
    }

    const userId = req.user.userId;

    const file = await prisma.file.create({
      data: {
        name: path.basename(fileName),
        originalName: fileName,
        mimeType: mimeType || 'application/octet-stream',
        size: BigInt(size),
        s3Key: key,
        cloudFrontUrl: getCloudfrontUrl(key),
        folderId: folderId || null,
        userId,
      },
    });

    await incrementStorageUsed(userId, parseInt(size));

    await createAuditLog({
      userId,
      action: 'file.upload',
      resourceType: 'file',
      resourceId: file.id,
      metadata: { fileName, size, storage: 's3-presigned' },
      ipAddress: getIpAddress(req),
    });

    res.status(201).json({
      message: 'File registered successfully',
      file: {
        id: file.id,
        name: file.originalName,
        mimeType: file.mimeType,
        size: file.size.toString(),
        cloudFrontUrl: file.cloudFrontUrl,
        url: process.env.CLOUDFRONT_URL ? file.cloudFrontUrl : null,
        publicUrl: process.env.CLOUDFRONT_URL ? file.cloudFrontUrl : null,
        folderId: file.folderId,
        createdAt: file.createdAt,
      },
    });
  } catch (error) {
    logger.error('Confirm presign error', { error: error.message });
    res.status(500).json({ message: 'Failed to confirm upload' });
  }
});

module.exports = router;
