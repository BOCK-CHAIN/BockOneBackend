// setup-email.js - Interactive email setup helper
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupEmail() {
  console.log('\n📧 Gmail Email Setup for BockDocs\n');
  console.log('This will help you configure email sending for password resets.\n');
  
  console.log('First, you need a Gmail App Password:');
  console.log('1. Go to: https://myaccount.google.com/apppasswords');
  console.log('2. Generate an App Password for "Mail"');
  console.log('3. Copy the 16-character password\n');
  
  const emailUser = await question('Enter your Gmail address: ');
  const emailPassword = await question('Enter your Gmail App Password (16 characters, no spaces): ');
  const emailFrom = await question('Enter sender email (or press Enter for ' + emailUser + '): ') || emailUser;
  const frontendUrl = await question('Enter frontend URL (or press Enter for http://localhost:5000): ') || 'http://localhost:5000';
  
  const envPath = path.join(__dirname, '.env');
  let envContent = '';
  
  // Read existing .env if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Remove existing email config
  envContent = envContent.split('\n')
    .filter(line => !line.startsWith('EMAIL_') && !line.startsWith('FRONTEND_URL='))
    .join('\n')
    .trim();
  
  // Add new email config
  const emailConfig = `
# Email Configuration (added by setup-email.js)
EMAIL_SERVICE=gmail
EMAIL_USER=${emailUser}
EMAIL_PASSWORD=${emailPassword}
EMAIL_FROM=${emailFrom}
FRONTEND_URL=${frontendUrl}
`;
  
  // Append to .env
  envContent += emailConfig;
  
  // Write back to .env
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ Email configuration saved to .env file!');
  console.log('\nNext steps:');
  console.log('1. Restart your backend server: npm start');
  console.log('2. Test email: node test-email.js ' + emailUser);
  console.log('3. Try the forgot password feature\n');
  
  rl.close();
}

setupEmail().catch(console.error);

