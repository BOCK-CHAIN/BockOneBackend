const express = require('express');
const {
  createDocument,
  getDocument,
  getUserDocuments,
  saveDocument,
  deleteDocument,
  createShareLink,
  getSharedDocument,
  shareDocumentWithEmail,
} = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Share routes - more specific routes first
router.post('/share/:docId/email', authMiddleware, shareDocumentWithEmail);
router.post('/share/:docId', authMiddleware, createShareLink);
router.get('/share/:token', getSharedDocument);

// Save document - allow either auth token OR share token
router.put('/save/:id', optionalAuthMiddleware, saveDocument);

// All routes below require authentication
router.use(authMiddleware);

// Create document
router.post('/create', createDocument);

// Get all documents for the authenticated user (legacy path supported)
router.get('/', getUserDocuments);
router.get('/user/:userId', getUserDocuments);

// Get document by id
router.get('/:id', getDocument);

// Delete document
router.delete('/delete/:id', deleteDocument);

module.exports = router;