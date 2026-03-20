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

// POST /api/folders - Create folder
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const userId = req.user.userId;

    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }

    // Check if a folder with the same name already exists in the same parent
    const existingFolder = await prisma.folder.findFirst({
      where: {
        name,
        parentId: parentId || null,
        userId,
        isInTrash: false
      }
    });

    if (existingFolder) {
      return res.status(400).json({ message: 'A folder with this name already exists' });
    }

    // Create the folder
    const folder = await prisma.folder.create({
      data: {
        name,
        parentId: parentId || null,
        userId
      }
    });
    // });

    res.status(201).json({
      message: 'Folder created successfully',
      folder
    });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ message: 'Failed to create folder' });
  }
});

// GET /api/folders - Get folders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { parentId } = req.query;
    const userId = req.user.userId;

    const folders = await prisma.folder.findMany({
      where: {
        userId,
        parentId: parentId || null,
        isInTrash: false
      },
      orderBy: { name: 'asc' }
    });

    res.json({ folders });
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ message: 'Failed to fetch folders' });
  }
});

// GET /api/folders/:id - Get specific folder
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    res.json({ folder });
  } catch (error) {
    console.error('Error fetching folder:', error);
    res.status(500).json({ message: 'Failed to fetch folder' });
  }
});

// PATCH /api/folders/:id - Update folder (rename)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }

    const folder = await prisma.folder.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Check if a folder with the same name already exists in the same parent
    const existingFolder = await prisma.folder.findFirst({
      where: {
        name,
        parentId: folder.parentId,
        userId,
        isInTrash: false,
        id: { not: id }
      }
    });

    if (existingFolder) {
      return res.status(400).json({ message: 'A folder with this name already exists' });
    }

    const updatedFolder = await prisma.folder.update({
      where: { id },
      data: {
        name,
        updatedAt: new Date()
      }
    });

    // TODO: Add activity logging later
    // await prisma.activity.create({
    //   data: {
    //     type: 'RENAME',
    //     description: `Renamed folder to: ${name}`,
    //     entityId: folder.id,
    //     entityType: 'folder',
    //     userId
    //   }
    // });

    res.json({
      message: 'Folder updated successfully',
      folder: updatedFolder
    });
  } catch (error) {
    console.error('Error updating folder:', error);
    res.status(500).json({ message: 'Failed to update folder' });
  }
});

// DELETE /api/folders/:id - Delete folder
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const folder = await prisma.folder.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Check if folder has children
    const childFolders = await prisma.folder.count({
      where: {
        parentId: id,
        isInTrash: false
      }
    });

    const childFiles = await prisma.file.count({
      where: {
        folderId: id,
        isInTrash: false
      }
    });

    if (childFolders > 0 || childFiles > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete folder that contains files or subfolders' 
      });
    }

    // Delete the folder
    await prisma.folder.delete({
      where: { id }
    });

    // TODO: Add activity logging later
    // await prisma.activity.create({
    //   data: {
    //     type: 'DELETE',
    //     description: `Deleted folder: ${folder.name}`,
    //     entityId: folder.id,
    //     entityType: 'folder',
    //     userId
    //   }
    // });

    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ message: 'Failed to delete folder' });
  }
});

// GET /api/folders/:id/path - Get folder path (breadcrumb)
router.get('/:id/path', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!id || id === 'null') {
      return res.json({ path: [] });
    }

    const buildPath = async (folderId, path = []) => {
      if (!folderId) return path;

      const folder = await prisma.folder.findFirst({
        where: {
          id: folderId,
          userId
        }
      });

      if (!folder) return path;

      const pathItem = {
        id: folder.id,
        name: folder.name
      };

      if (folder.parentId) {
        return await buildPath(folder.parentId, [pathItem, ...path]);
      } else {
        return [pathItem, ...path];
      }
    };

    const path = await buildPath(id);
    res.json({ path });
  } catch (error) {
    console.error('Error getting folder path:', error);
    res.status(500).json({ message: 'Failed to get folder path' });
  }
});

module.exports = router;
