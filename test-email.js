// test-email.js
// Test script to verify email sending works

require('dotenv').config();
const { sendPasswordResetEmail } = require('./utils/emailService');

async function testEmail() {
  console.log('\n🧪 Testing Email Configuration...\n');
  
  // Check configuration
  const isConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
  
  if (!isConfigured) {
    console.log('❌ Email not configured!');
    console.log('\nPlease add to your .env file:');
    console.log('EMAIL_SERVICE=gmail');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASSWORD=your-app-password');
    console.log('EMAIL_FROM=noreply@bockdocs.com');
    console.log('FRONTEND_URL=http://localhost:5000');
    process.exit(1);
  }
  
  console.log('✅ Email configuration found');
  console.log('   EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'not set');
  console.log('   EMAIL_USER:', process.env.EMAIL_USER);
  console.log('   EMAIL_FROM:', process.env.EMAIL_FROM || process.env.EMAIL_USER);
  console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:5000');
  console.log('');
  
  // Get test email from command line or use EMAIL_USER
  const testEmail = process.argv[2] || process.env.EMAIL_USER;
  const testToken = 'test-token-' + Date.now();
  
  console.log('📧 Sending test email to:', testEmail);
  console.log('   Using test token:', testToken);
  console.log('');
  
  try {
    const result = await sendPasswordResetEmail(testEmail, testToken);
    console.log('\n✅ SUCCESS! Email sent!');
    console.log('   Check your inbox at:', testEmail);
    console.log('   Message ID:', result.messageId);
    console.log('   Response:', result.response);
  } catch (error) {
    console.log('\n❌ FAILED to send email');
    console.log('   Error:', error.message);
    if (error.code === 'EAUTH') {
      console.log('\n   💡 Tip: Make sure you\'re using a Gmail App Password, not your regular password.');
      console.log('   Get one at: https://myaccount.google.com/apppasswords');
    }
    process.exit(1);
  }
}

testEmail();

