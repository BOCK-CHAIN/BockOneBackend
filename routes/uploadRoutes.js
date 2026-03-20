const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const prisma = require('../lib/prismaClient');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?.userId;
    if (!userId) {
      return cb(new Error('User not authenticated'));
    }
    
    const userUploadDir = path.join(uploadsDir, userId);
    if (!fs.existsSync(userUploadDir)) {
      fs.mkdirSync(userUploadDir, { recursive: true });
    }
    cb(null, userUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// POST /api/upload - Direct file upload
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folderId } = req.body;
    const userId = req.user.userId;

    // Create file record in database
    const file = await prisma.file.create({
      data: {
        name: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: BigInt(req.file.size),
        filePath: path.join(req.file.destination, req.file.filename),
        folderId: folderId || null,
        userId
      }
    });

    res.json({
      message: 'File uploaded successfully',
      file: {
        id: file.id,
        name: file.originalName,
        mimeType: file.mimeType,
        size: file.size.toString(),
        createdAt: file.createdAt,
        folderId: file.folderId
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if database operation failed
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to clean up file:', unlinkError);
      }
    }
    
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

// POST /api/upload/multiple - Multiple file upload
router.post('/multiple', authenticateToken, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const { folderId } = req.body;
    const userId = req.user.userId;

    // Create file records for all uploaded files
    const files = await Promise.all(
      req.files.map(async (file) => {
        return await prisma.file.create({
          data: {
            name: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: BigInt(file.size),
            filePath: path.join(file.destination, file.filename),
            folderId: folderId || null,
            userId
          }
        });
      })
    );

    res.json({
      message: `${files.length} file(s) uploaded successfully`,
      files: files.map(file => ({
        id: file.id,
        name: file.originalName,
        mimeType: file.mimeType,
        size: file.size.toString(),
        createdAt: file.createdAt,
        folderId: file.folderId
      }))
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    
    // Clean up uploaded files if database operation failed
    if (req.files) {
      req.files.forEach(file => {
        try {
          if (file.path) fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error('Failed to clean up file:', unlinkError);
        }
      });
    }
    
    res.status(500).json({ message: 'Failed to upload files' });
  }
});

module.exports = router;
