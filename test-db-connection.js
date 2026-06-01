// Test database connection script
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('🔍 Testing database connection...');
  console.log(`📡 DATABASE_URL: ${process.env.DATABASE_URL ? 'Set (hidden)' : 'NOT SET'}`);
  console.log('');

  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Successfully connected to database!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Current users in database: ${userCount}`);
    
    console.log('\n✅ Database connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed!');
    console.error('Error:', error.message);
    
    if (error.code === 'P1001') {
      console.error('\n💡 Troubleshooting:');
      console.error('1. Check if DATABASE_URL is correct in .env file');
      console.error('2. For Neon PostgreSQL, ensure ?sslmode=require is in the URL');
      console.error('3. Verify database server is running and accessible');
      console.error('4. Check network/firewall settings');
      console.error('\n📚 See DATABASE_SETUP.md for detailed setup instructions');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
