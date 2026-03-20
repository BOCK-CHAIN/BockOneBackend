const loadEnv = require('./api/_utils/loadEnv');
loadEnv();

const pool = require('./api/_utils/db');
const { createTablesQuery } = require('./api/_utils/schema');

if (process.env.DATABASE_URL?.toLowerCase().startsWith('pgmem://')) {
  console.log('Embedded local database detected. Schema is created automatically at startup.');
  process.exit(0);
}

async function setup() {
  let client;
  try {
    console.log("Connecting to the database...");
    client = await pool.connect();
    console.log("Successfully connected!");

    console.log("Running setup script to create tables with new schema...");
    await client.query(createTablesQuery);
    console.log("SUCCESS: Database tables created successfully for JWT authentication!");

  } catch (err) {
    console.error("ERROR: Failed to set up the database.", err);
  } finally {
    if (client) {
      client.release();
      console.log("Database connection released.");
    }
    pool.end(); // Close the pool to allow the script to exit
  }
}

// Run the setup function
setup();
