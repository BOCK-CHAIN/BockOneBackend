const express = require('express');
const {
  signUp,
  signIn,
  googleAuth,
  googleAuthWithAccessToken,
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  logout,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleAuth);
router.post('/google-access', googleAuthWithAccessToken);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, changePassword);
router.delete('/account', authMiddleware, deleteAccount);

// Stateless logout – client should drop the token, but we keep the route for consistency
router.post('/logout', authMiddleware, logout);

module.exports = router;
