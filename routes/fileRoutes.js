const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prismaClient');

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// GET /api/files - Get files and folders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { folderId } = req.query;
    const userId = req.user.userId;

    // Get files in the specified folder (or root if no folderId)
    const files = await prisma.file.findMany({
      where: {
        userId,
        folderId: folderId || null,
        isInTrash: false
      },
      orderBy: { name: 'asc' }
    });

    // Get folders in the specified folder (or root if no folderId)
    const folders = await prisma.folder.findMany({
      where: {
        userId,
        parentId: folderId || null,
        isInTrash: false
      },
      orderBy: { name: 'asc' }
    });

    // Combine and format the results
    const allItems = [
      ...folders.map(folder => ({
        id: folder.id,
        name: folder.name,
        type: 'FOLDER',
        isStarred: folder.isStarred,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
        folderId: folder.parentId
      })),
      ...files.map(file => ({
        id: file.id,
        name: file.name,
        originalName: file.originalName,
        type: 'FILE',
        mimeType: file.mimeType,
        size: file.size?.toString() || '0',
        filePath: file.filePath,
        isStarred: file.isStarred,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
        folderId: file.folderId
      }))
    ];

    res.json({
      files: allItems,
      currentFolder: folderId || null
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Failed to fetch files' });
  }
});

// GET /api/files/starred - Get starred files
router.get('/starred', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const starredFiles = await prisma.file.findMany({
      where: {
        userId,
        isStarred: true,
        isInTrash: false
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Convert BigInt sizes to strings
    const serializedFiles = starredFiles.map(file => ({
      ...file,
      size: file.size?.toString() || '0'
    }));

    res.json({ files: serializedFiles });
  } catch (error) {
    console.error('Error fetching starred files:', error);
    res.status(500).json({ message: 'Failed to fetch starred files' });
  }
});

// GET /api/files/search - Search files
router.get('/search', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const userId = req.user.userId;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const files = await prisma.file.findMany({
      where: {
        userId,
        isInTrash: false,
        OR: [
          {
            name: {
              contains: q,
              mode: 'insensitive'
            }
          },
          {
            originalName: {
              contains: q,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: { name: 'asc' }
    });

    // Convert BigInt sizes to strings
    const serializedFiles = files.map(file => ({
      ...file,
      size: file.size?.toString() || '0'
    }));

    res.json({ files: serializedFiles });
  } catch (error) {
    console.error('Error searching files:', error);
    res.status(500).json({ message: 'Failed to search files' });
  }
});

// GET /api/files/trash - Get trashed files
router.get('/trash', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const trashedFiles = await prisma.file.findMany({
      where: {
        userId,
        isInTrash: true
      },
      orderBy: { trashedAt: 'desc' }
    });

    // Convert BigInt sizes to strings
    const serializedFiles = trashedFiles.map(file => ({
      ...file,
      size: file.size?.toString() || '0'
    }));

    res.json({ files: serializedFiles });
  } catch (error) {
    console.error('Error fetching trashed files:', error);
    res.status(500).json({ message: 'Failed to fetch trashed files' });
  }
});

// GET /api/files/:id - Get specific file
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Convert BigInt size to string
    const serializedFile = {
      ...file,
      size: file.size?.toString() || '0'
    };

    res.json({ file: serializedFile });
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Failed to fetch file' });
  }
});

// DELETE /api/files/trash - Empty trash (delete all trashed files)
router.delete('/trash', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete all trashed files for the user
    const deletedFiles = await prisma.file.deleteMany({
      where: {
        userId,
        isInTrash: true
      }
    });

    res.json({ 
      message: `${deletedFiles.count} files permanently deleted`,
      deletedCount: deletedFiles.count
    });
  } catch (error) {
    console.error('Error emptying trash:', error);
    res.status(500).json({ message: 'Failed to empty trash' });
  }
});

// DELETE /api/files/:id - Delete file
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete the file record
    await prisma.file.delete({
      where: { id }
    });
    //     userId
    //   }
    // });

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Failed to delete file' });
  }
});

// PATCH /api/files/:id/star - Toggle star status
router.patch('/:id/star', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const updatedFile = await prisma.file.update({
      where: { id },
      data: {
        isStarred: !file.isStarred
      }
    });

    // Convert BigInt size to string
    const serializedFile = {
      ...updatedFile,
      size: updatedFile.size?.toString() || '0'
    };

    res.json({
      file: serializedFile,
      starred: updatedFile.isStarred
    });
  } catch (error) {
    console.error('Error toggling star:', error);
    res.status(500).json({ message: 'Failed to toggle star' });
  }
});

// PATCH /api/files/:id/trash - Move to trash
router.patch('/:id/trash', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const updatedFile = await prisma.file.update({
      where: { id },
      data: {
        isInTrash: true,
        trashedAt: new Date()
      }
    });

    // Convert BigInt size to string
    const serializedFile = {
      ...updatedFile,
      size: updatedFile.size?.toString() || '0'
    };

    res.json({ message: 'File moved to trash', file: serializedFile });
  } catch (error) {
    console.error('Error moving to trash:', error);
    res.status(500).json({ message: 'Failed to move to trash' });
  }
});

// PATCH /api/files/:id/restore - Restore from trash
router.patch('/:id/restore', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const file = await prisma.file.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const updatedFile = await prisma.file.update({
      where: { id },
      data: {
        isInTrash: false,
        trashedAt: null
      }
    });

    // Convert BigInt size to string
    const serializedFile = {
      ...updatedFile,
      size: updatedFile.size?.toString() || '0'
    };

    res.json({ message: 'File restored', file: serializedFile });
  } catch (error) {
    console.error('Error restoring file:', error);
    res.status(500).json({ message: 'Failed to restore file' });
  }
});

// GET /api/files/proxy/:fileId - Serve files from local storage
router.get('/proxy/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const path = require('path');
    const fs = require('fs');
    
    // Get token from Authorization header or query parameter
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[1]) {
      token = authHeader.split(' ')[1];
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    // Verify token
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const userId = user.userId;

    // Get file record
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId,
        isInTrash: false
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if file exists on disk
    if (!file.filePath || !fs.existsSync(file.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Update last accessed time
    await prisma.file.update({
      where: { id: file.id },
      data: { lastAccessedAt: new Date() }
    });

    // Set appropriate headers
    res.set({
      'Content-Type': file.mimeType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${file.originalName}"`,
      'Cache-Control': 'public, max-age=3600'
    });

    // Stream file
    const fileStream = fs.createReadStream(file.filePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error streaming file' });
      }
    });
  } catch (error) {
    console.error('File proxy error:', error);
    res.status(500).json({ message: 'Failed to serve file' });
  }
});

// GET /api/files/download/:fileId - Download file with proper headers to force download
router.get('/download/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const path = require('path');
    const fs = require('fs');
    
    // Get token from Authorization header or query parameter
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[1]) {
      token = authHeader.split(' ')[1];
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    // Verify token
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const userId = user.userId;

    // Get file record
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId,
        isInTrash: false
      }
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if file exists on disk
    if (!file.filePath || !fs.existsSync(file.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Update last accessed time
    await prisma.file.update({
      where: { id: file.id },
      data: { lastAccessedAt: new Date() }
    });

    // Set headers to force download
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.originalName}"`,
      'Cache-Control': 'no-cache'
    });

    // Stream file
    const fileStream = fs.createReadStream(file.filePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error streaming file' });
      }
    });
  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({ message: 'Failed to download file' });
  }
});

module.exports = router;
