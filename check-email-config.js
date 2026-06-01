// Quick script to check if email is configured
require('dotenv').config();

console.log('\n📧 Email Configuration Check\n');
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE || '❌ Not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ Not set');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Set (' + process.env.EMAIL_PASSWORD.length + ' chars)' : '❌ Not set');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM || '❌ Not set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || '❌ Not set (will use default)');

const isConfigured = process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

if (isConfigured) {
  console.log('\n✅ Email is configured!');
  if (process.env.EMAIL_SERVICE === 'gmail') {
    console.log('📧 Using Gmail SMTP');
    if (process.env.EMAIL_PASSWORD.length === 16) {
      console.log('✅ App Password looks correct (16 characters)');
    } else {
      console.log('⚠️  App Password should be 16 characters (you may have spaces - remove them)');
    }
  }
} else {
  console.log('\n❌ Email is NOT configured');
  console.log('\nTo set up Gmail:');
  console.log('1. Follow the guide in GMAIL_SETUP_GUIDE.md');
  console.log('2. Add EMAIL_SERVICE, EMAIL_USER, and EMAIL_PASSWORD to your .env file');
}

console.log('');

