const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const isLocal = connectionString && /@(?:localhost|127\.0\.0\.1)(:|\/)/.test(connectionString);

const pool = new Pool({
  connectionString,
  // Local Postgres typically doesn't use SSL; remote/RDS usually does.
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

module.exports = pool;
