// utils/emailService.js
// Email service for sending password reset emails

const nodemailer = require('nodemailer');

// Create transporter based on environment variables
const createTransporter = () => {
  // If using Gmail SMTP
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
      },
    });
  }

  // If using custom SMTP
  if (process.env.EMAIL_HOST) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Default: Use Ethereal Email for testing (doesn't actually send emails)
  // This is useful for development when you don't have email credentials
  return nodemailer.createTransporter({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass',
    },
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    // Check if email is configured
    const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
    
    if (!isEmailConfigured) {
      console.warn('⚠️  Email not configured. Password reset token for', email, ':', resetToken);
      console.warn('📧 To enable email sending, add these to your .env file:');
      console.warn('   EMAIL_SERVICE=gmail');
      console.warn('   EMAIL_USER=your-email@gmail.com');
      console.warn('   EMAIL_PASSWORD=your-app-password');
      // In development, we'll just log the token instead of failing
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Email service not configured');
      }
      return null; // Return null to indicate email wasn't sent but don't throw error
    }

    const transporter = createTransporter();
    
    // Get frontend URL from environment or use default
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
    const resetLink = `${frontendUrl}/#/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@bockdocs.com',
      to: email,
      subject: 'Reset Your BockDocs Password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #7C3AED;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover {
              background-color: #9333EA;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            .token {
              background-color: #f0f0f0;
              padding: 10px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
              word-break: break-all;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">BockDocs</div>
            </div>
            
            <h2>Reset Your Password</h2>
            
            <p>You requested to reset your password for your BockDocs account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="token">${resetLink}</div>
            
            <p><strong>This link will expire in 1 hour.</strong></p>
            
            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} BockDocs. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Reset Your BockDocs Password
        
        You requested to reset your password for your BockDocs account.
        
        Click the link below to reset your password:
        ${resetLink}
        
        This link will expire in 1 hour.
        
        If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
      `,
    };

    // Verify connection before sending
    await transporter.verify();
    console.log('✅ Email server connection verified');

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully!');
    console.log('   To:', email);
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    
    return info;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error.message);
    if (error.code === 'EAUTH') {
      console.error('   Authentication failed. Check your EMAIL_USER and EMAIL_PASSWORD in .env');
    } else if (error.code === 'ECONNECTION') {
      console.error('   Connection failed. Check your internet connection and email server settings.');
    } else {
      console.error('   Full error:', error);
    }
    throw error;
  }
};

// Send document share email
const sendShareEmail = async (recipientEmail, shareUrl, documentTitle, sharerName, permission) => {
  try {
    // Check if email is configured
    const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
    
    if (!isEmailConfigured) {
      console.warn('⚠️  Email not configured. Share link for', recipientEmail, ':', shareUrl);
      console.warn('📧 To enable email sending, add these to your .env file:');
      console.warn('   EMAIL_SERVICE=gmail');
      console.warn('   EMAIL_USER=your-email@gmail.com');
      console.warn('   EMAIL_PASSWORD=your-app-password');
      // In development, we'll just log the link instead of failing
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Email service not configured');
      }
      return null; // Return null to indicate email wasn't sent but don't throw error
    }

    const transporter = createTransporter();
    
    const permissionText = permission === 'edit' ? 'edit' : 'view';
    const permissionVerb = permission === 'edit' ? 'edit' : 'view';

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@bockdocs.com',
      to: recipientEmail,
      subject: `${sharerName} shared "${documentTitle}" with you`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #7C3AED;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover {
              background-color: #9333EA;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            .share-link {
              background-color: #f0f0f0;
              padding: 10px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
              word-break: break-all;
              margin: 10px 0;
            }
            .document-title {
              font-size: 18px;
              font-weight: bold;
              color: #7C3AED;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">BockDocs</div>
            </div>
            
            <h2>${sharerName} shared a document with you</h2>
            
            <p>${sharerName} has shared the document <span class="document-title">"${documentTitle}"</span> with you.</p>
            
            <p>You have been granted <strong>${permissionText}</strong> access to this document.</p>
            
            <p>Click the button below to ${permissionVerb} the document:</p>
            
            <div style="text-align: center;">
              <a href="${shareUrl}" class="button">Open Document</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="share-link">${shareUrl}</div>
            
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} BockDocs. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        ${sharerName} shared a document with you
        
        ${sharerName} has shared the document "${documentTitle}" with you.
        
        You have been granted ${permissionText} access to this document.
        
        Click the link below to ${permissionVerb} the document:
        ${shareUrl}
        
        This is an automated message. Please do not reply to this email.
        © ${new Date().getFullYear()} BockDocs. All rights reserved.
      `,
    };

    // Verify connection before sending
    await transporter.verify();
    console.log('✅ Email server connection verified');

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Document share email sent successfully!');
    console.log('   To:', recipientEmail);
    console.log('   Document:', documentTitle);
    console.log('   Message ID:', info.messageId);
    
    return info;
  } catch (error) {
    console.error('❌ Error sending document share email:', error.message);
    if (error.code === 'EAUTH') {
      console.error('   Authentication failed. Check your EMAIL_USER and EMAIL_PASSWORD in .env');
    } else if (error.code === 'ECONNECTION') {
      console.error('   Connection failed. Check your internet connection and email server settings.');
    } else {
      console.error('   Full error:', error);
    }
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendShareEmail,
};

