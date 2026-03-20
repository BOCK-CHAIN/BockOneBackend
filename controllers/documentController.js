const { v4: uuidv4 } = require('uuid');
const prisma = require('../prismaClient.js');
const { sendShareEmail } = require('../utils/emailService');

const ensureOwnership = async (documentId, userId) => {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    return { error: { status: 404, message: 'Document not found' } };
  }

  if (document.userId !== userId) {
    return { error: { status: 403, message: 'You do not have access to this document' } };
  }

  return { document };
};

const createDocument = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, content } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const document = await prisma.document.create({
      data: {
        userId,
        title: title?.trim() || 'Untitled Document',
        content: content || '',
      },
    });
    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Failed to create document' });
  }
};

// Get a document by ID
const getDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const documentId = Number(id);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!Number.isInteger(documentId)) {
      return res.status(400).json({ error: 'Invalid document id' });
    }

    const { error, document } = await ensureOwnership(documentId, userId);
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }

    res.json(document);
  } catch (error) {
    console.error('Error getting document:', error);
    res.status(500).json({ error: 'Failed to get document' });
  }
};

// Get all documents for a user
const getUserDocuments = async (req, res) => {
  try {
    const requestedUserId = req.params.userId ? Number(req.params.userId) : null;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (requestedUserId && requestedUserId !== userId) {
      return res.status(403).json({ error: 'You can only access your own documents' });
    }

    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { lastModified: 'desc' },
    });
    res.json(documents);
  } catch (error) {
    console.error('Error getting user documents:', error);
    res.status(500).json({ error: 'Failed to get user documents' });
  }
};

// Helper function to validate share token and check edit permission
const validateShareToken = async (shareToken, documentId) => {
  if (!shareToken) {
    return { error: 'Share token is required' };
  }

  const share = await prisma.shareLink.findUnique({
    where: { token: shareToken },
    include: { document: true },
  });

  if (!share) {
    return { error: { status: 404, message: 'Invalid share token' } };
  }

  if (share.expiresAt && share.expiresAt < new Date()) {
    return { error: { status: 403, message: 'Share link has expired' } };
  }

  if (Number(share.documentId) !== Number(documentId)) {
    return { error: { status: 403, message: 'Share token does not match document' } };
  }

  if (share.permission !== 'edit') {
    return { error: { status: 403, message: 'You do not have edit permission for this document' } };
  }

  return { share, document: share.document };
};

// Update a document
const saveDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const documentId = Number(id);
    const { title, content, shareToken } = req.body;

    console.log('Save document request:', {
      documentId,
      hasShareToken: !!shareToken,
      shareToken: shareToken ? shareToken.substring(0, 8) + '...' : null,
      hasAuthToken: !!req.user?.id,
      userId: req.user?.id,
    });

    if (!Number.isInteger(documentId)) {
      return res.status(400).json({ error: 'Invalid document id' });
    }

    let document;
    let hasAccess = false;

    // Check if share token is provided (for shared documents)
    if (shareToken) {
      console.log('Validating share token for document:', documentId);
      const shareValidation = await validateShareToken(shareToken, documentId);
      if (shareValidation.error) {
        console.log('Share token validation failed:', shareValidation.error);
        return res.status(shareValidation.error.status || 403).json({ 
          error: shareValidation.error.message 
        });
      }
      console.log('Share token validated successfully');
      document = shareValidation.document;
      hasAccess = true;
    } else {
      // Check regular authentication (for owned documents)
      const userId = req.user?.id;
      if (!userId) {
        console.log('No share token and no auth token provided');
        return res.status(401).json({ error: 'Authorization token is missing. Please provide either authentication token or share token.' });
      }

      const ownershipCheck = await ensureOwnership(documentId, userId);
      if (ownershipCheck.error) {
        return res.status(ownershipCheck.error.status).json({ 
          error: ownershipCheck.error.message 
        });
      }
      document = ownershipCheck.document;
      hasAccess = true;
    }

    if (!hasAccess) {
      return res.status(403).json({ error: 'You do not have access to this document' });
    }

    const updated = await prisma.document.update({
      where: { id: document.id },
      data: {
        title: title ?? document.title,
        content: content ?? document.content,
      },
    });
    res.json(updated);
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ error: 'Failed to save document' });
  }
};

// Delete a document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const documentId = Number(id);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!Number.isInteger(documentId)) {
      return res.status(400).json({ error: 'Invalid document id' });
    }

    const { error, document } = await ensureOwnership(documentId, userId);
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }

    await prisma.document.delete({ where: { id: document.id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};



const createShareLink = async (req, res) => {
  try {
    const { docId } = req.params;
    const userId = req.user?.id;
    const permission = req.body.permission === 'edit' ? 'edit' : 'view';
    const expiresIn = Number(req.body.expiresIn);
    const documentId = Number(docId);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!Number.isInteger(documentId)) {
      return res.status(400).json({ error: 'Invalid document id' });
    }

    const { error } = await ensureOwnership(documentId, userId);
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }

    const token = uuidv4();
    const expiresAt = !Number.isNaN(expiresIn) && expiresIn > 0 ? new Date(Date.now() + expiresIn * 1000) : null;

    const shareLink = await prisma.shareLink.create({
      data: {
        token,
        permission,
        expiresAt,
        documentId,
      },
    });

    // Generate frontend-accessible URL (not API endpoint)
    // For web: use the frontend URL, for mobile apps this would be a deep link
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:8080';
    // Use both path and query parameter for maximum compatibility
    const shareUrl = `${frontendBaseUrl}/shared?token=${shareLink.token}`;
    // Alternative: `${frontendBaseUrl}/shared/${shareLink.token}`;

    res.json({
      shareUrl: shareUrl,
      token: shareLink.token,
      expiresAt: shareLink.expiresAt,
      permission: shareLink.permission,
    });
  } catch (err) {
    console.error('Error creating share link:', err);
    res.status(500).json({ error: 'Failed to create share link' });
  }
};

const getSharedDocument = async (req, res) => {
  try {
    const { token } = req.params;

    const share = await prisma.shareLink.findUnique({
      where: { token },
      include: { document: true },
    });

    if (!share) return res.status(404).json({ error: "Invalid link" });
    if (share.expiresAt && share.expiresAt < new Date())
      return res.status(403).json({ error: "Link expired" });

    res.json({
      document: share.document,
      permission: share.permission,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch shared document" });
  }
};

const shareDocumentWithEmail = async (req, res) => {
  try {
    const { docId } = req.params;
    const userId = req.user?.id;
    const documentId = Number(docId);
    const { email, permission } = req.body;

    // Validation
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!Number.isInteger(documentId)) {
      return res.status(400).json({ error: 'Invalid document id' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check document ownership
    const { error, document: doc } = await ensureOwnership(documentId, userId);
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }

    // Get current user info
    const sharer = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    if (!sharer) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create share link
    const token = uuidv4();
    const permissionType = permission === 'edit' ? 'edit' : 'view';
    const expiresIn = 24 * 60 * 60; // 24 hours in seconds
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    const shareLink = await prisma.shareLink.create({
      data: {
        token,
        permission: permissionType,
        expiresAt,
        documentId,
      },
    });

    // Generate share URL
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:8080';
    const shareUrl = `${frontendBaseUrl}/shared?token=${shareLink.token}`;

    // Send email
    const sharerName = sharer.name || sharer.email.split('@')[0] || 'Someone';
    const documentTitle = doc.title || 'Untitled Document';

    try {
      await sendShareEmail(email.trim(), shareUrl, documentTitle, sharerName, permissionType);
      res.json({
        success: true,
        message: `Document shared with ${email.trim()}`,
        shareUrl: shareUrl,
      });
    } catch (emailError) {
      // If email fails but share link was created, still return success
      // but log the error (in production, you might want to handle this differently)
      console.error('Error sending share email:', emailError);
      // Still return success because the share link was created
      // The user can manually share the link
      res.json({
        success: true,
        message: `Share link created. Email may not have been sent.`,
        shareUrl: shareUrl,
        warning: 'Email sending failed, but share link was created',
      });
    }
  } catch (err) {
    console.error('Error sharing document with email:', err);
    res.status(500).json({ error: 'Failed to share document with email' });
  }
};

module.exports = {
  createDocument,
  getDocument,
  getUserDocuments,
  saveDocument,
  deleteDocument,
  createShareLink,
  getSharedDocument,
  shareDocumentWithEmail,
};