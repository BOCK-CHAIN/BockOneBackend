require('dotenv').config();

console.log('=== BockDrive Backend Configuration Check ===\n');

console.log('=== Database Configuration ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');

console.log('\n=== JWT Authentication Configuration ===');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✓ Set' : '✗ Missing');
if (!process.env.JWT_SECRET) {
  console.log('  ⚠️  Generate a JWT secret: openssl rand -base64 32');
}

console.log('\n=== AWS S3 Configuration (Optional - for cloud storage) ===');
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✓ Set' : '✗ Missing (optional)');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✓ Set' : '✗ Missing (optional)');
console.log('AWS_REGION:', process.env.AWS_REGION ? '✓ Set' : '✗ Missing (optional)');
console.log('AWS_S3_BUCKET:', process.env.AWS_S3_BUCKET ? '✓ Set' : '✗ Missing (optional)');

console.log('\n=== Server Configuration ===');
console.log('PORT:', process.env.PORT || '3001 (default)');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN || 'All origins (development mode)');

console.log('\n=== Setup Instructions ===');
console.log('1. Set DATABASE_URL to your PostgreSQL connection string');
console.log('2. Set JWT_SECRET to a secure random string (use: openssl rand -base64 32)');
console.log('3. (Optional) Configure AWS S3 for cloud file storage');
console.log('4. Run: npm run db:migrate (or npm run db:push)');
console.log('5. Start server: npm start (or npm run dev)');
