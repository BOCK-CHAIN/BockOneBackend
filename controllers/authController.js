// controllers/authController.js
// COMPLETE AUTH CONTROLLER - PostgreSQL Only (No Firebase)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const prisma = require('../prismaClient');
const { sendPasswordResetEmail } = require('../utils/emailService');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==================== SIGN UP ====================
const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || email.split('@')[0], // Use email prefix if no name provided
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'bockdocs_secret_key',
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Return user data (without password) and token
    res.status(201).json({
      message: 'User created successfully',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// ==================== SIGN IN ====================
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if user has a password (not OAuth-only account)
    if (!user.password) {
      return res.status(401).json({ error: 'This account uses a different sign-in method' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'bockdocs_secret_key',
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.json({
      message: 'Sign in successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
};

// ==================== GET CURRENT USER ====================
const getCurrentUser = async (req, res) => {
  try {
    // User ID is added to req by the auth middleware
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Don't select password
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
};

// ==================== UPDATE USER PROFILE ====================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const updateData = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();

    // If email is being updated, check if it's already taken
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// ==================== CHANGE PASSWORD ====================
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return res.status(404).json({ error: 'User not found or invalid account type' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

// ==================== DELETE ACCOUNT ====================
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required to delete account' });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // Delete user (this will cascade delete documents if configured)
    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// ==================== GOOGLE OAUTH ====================
const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Validation
    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify the Google ID token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired ID token' });
    }

    // Extract user information from the verified token
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    const userEmail = email?.toLowerCase();

    if (!userEmail) {
      return res.status(400).json({ error: 'Email not found in ID token' });
    }

    // Check if user exists by email or Google ID (uid)
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userEmail },
          { uid: googleId },
        ],
      },
    });

    if (user) {
      // User exists - update their information
      // If they signed up with email/password but now using Google, link the accounts
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          uid: googleId,
          email: userEmail,
          name: name || user.name,
          // Don't overwrite password if it exists (user might want to use both methods)
        },
      });
    } else {
      // User doesn't exist - create new user
      user = await prisma.user.create({
        data: {
          email: userEmail,
          uid: googleId,
          name: name || userEmail.split('@')[0],
          // No password for OAuth-only accounts
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'bockdocs_secret_key',
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.json({
      message: 'Google authentication successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
};

// ==================== GOOGLE OAUTH WITH ACCESS TOKEN ====================
const googleAuthWithAccessToken = async (req, res) => {
  try {
    const { accessToken } = req.body;

    // Validation
    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    // Verify the access token by fetching user info from Google
    const https = require('https');
    let googleUserInfo;
    try {
      googleUserInfo = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'www.googleapis.com',
          path: '/oauth2/v2/userinfo',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          },
        };

        const req = https.request(options, (response) => {
          let data = '';
          response.on('data', (chunk) => data += chunk);
          response.on('end', () => {
            if (response.statusCode === 200) {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                reject(new Error('Failed to parse response: ' + e.message));
              }
            } else {
              reject(new Error(`HTTP ${response.statusCode}: ${data}`));
            }
          });
        });
        
        req.on('error', (error) => {
          reject(new Error('Request failed: ' + error.message));
        });
        
        req.end();
      });
    } catch (error) {
      console.error('Google API error:', error.message);
      return res.status(401).json({ error: 'Invalid or expired access token: ' + error.message });
    }

    // Extract user information from Google's response
    const { id: googleId, email, name } = googleUserInfo;
    const userEmail = email?.toLowerCase();

    if (!userEmail) {
      return res.status(400).json({ error: 'Email not found in Google user info' });
    }

    // Check if user exists by email or Google ID (uid)
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userEmail },
          { uid: googleId?.toString() },
        ],
      },
    });

    if (user) {
      // User exists - update their information
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          uid: googleId?.toString(),
          email: userEmail,
          name: name || user.name,
        },
      });
    } else {
      // User doesn't exist - create new user
      user = await prisma.user.create({
        data: {
          email: userEmail,
          uid: googleId?.toString(),
          name: name || userEmail.split('@')[0],
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'bockdocs_secret_key',
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.json({
      message: 'Google authentication successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Google auth with access token error:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
};

// ==================== FORGOT PASSWORD ====================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    // In production, you would send an email here
    if (!user) {
      return res.json({ 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      });
    }

    // Check if user has a password (not OAuth-only account)
    if (!user.password) {
      return res.json({ 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      });
    }

    // Generate reset token (using crypto for secure random token)
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: resetToken,
        resetTokenExpires: resetTokenExpires,
      },
    });

    // Send password reset email
    try {
      const emailResult = await sendPasswordResetEmail(user.email, resetToken);
      if (emailResult) {
        console.log('✅ Password reset email successfully sent to:', user.email);
      } else {
        console.warn('⚠️  Email not sent (not configured), but token generated:', resetToken);
      }
    } catch (emailError) {
      // Log error but don't fail the request - user still gets the token
      console.error('❌ Failed to send password reset email:', emailError.message);
      console.error('   User email:', user.email);
      // In development, still return the token if email fails
      if (process.env.NODE_ENV !== 'production') {
        console.log('📝 Development mode - Reset token for manual use:', resetToken);
      }
    }

    res.json({ 
      message: 'If an account with that email exists, a password reset link has been sent.',
      // Only include token in development - remove in production
      ...(process.env.NODE_ENV !== 'production' && { resetToken: resetToken })
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
};

// ==================== RESET PASSWORD ====================
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Validation
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// ==================== LOGOUT ====================
// Note: With JWT, logout is typically handled client-side by removing the token
// You could implement a token blacklist if needed
const logout = async (req, res) => {
  try {
    // In a more advanced implementation, you might add the token to a blacklist here
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};

module.exports = {
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
};