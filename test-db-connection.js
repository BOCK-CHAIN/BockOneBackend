// Test database connection script for Krysonics
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "true" || process.env.DATABASE_URL?.includes("sslmode=require") 
    ? { rejectUnauthorized: false } 
    : false
});

async function testConnection() {
  console.log('🔍 Testing database connection for Krysonics...');
  console.log(`📡 DATABASE_URL: ${process.env.DATABASE_URL ? 'Set (hidden)' : 'NOT SET'}`);
  console.log('');

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Successfully connected to database!');
    
    // Test a simple query
    const result = await client.query('SELECT NOW()');
    console.log(`📊 Database time: ${result.rows[0].now}`);
    
    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      LIMIT 10
    `);
    console.log(`📊 Tables in database: ${tablesResult.rows.length}`);
    if (tablesResult.rows.length > 0) {
      console.log('Tables:', tablesResult.rows.map(r => r.table_name).join(', '));
    }
    
    client.release();
    
    console.log('\n✅ Database connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed!');
    console.error('Error:', error.message);
    
    console.error('\n💡 Troubleshooting:');
    console.error('1. Check if DATABASE_URL is correct in .env file');
    console.error('2. Ensure database server is running and accessible');
    console.error('3. Check network/firewall settings');
    console.error('4. Verify SSL settings if using RDS');
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
