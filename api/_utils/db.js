const { Pool } = require('pg');
const loadEnv = require('./loadEnv');
const { createTablesQuery } = require('./schema');

loadEnv();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set. Create EiraFlutterBackend/.env or .env.development with DATABASE_URL.'
  );
}

function isEmbeddedConnection(databaseUrl) {
  return databaseUrl.toLowerCase().startsWith('pgmem://');
}

function shouldUseSsl(databaseUrl) {
  if (process.env.PGSSLMODE?.toLowerCase() === 'disable') return false;
  if (process.env.PGSSLMODE?.toLowerCase() === 'require') return true;

  try {
    const parsed = new URL(databaseUrl);
    const host = parsed.hostname.toLowerCase();
    return host !== 'localhost' && host !== '127.0.0.1';
  } catch (_) {
    return true;
  }
}

let pool;

if (isEmbeddedConnection(connectionString)) {
  const { newDb } = require('pg-mem');
  const db = newDb({ autoCreateForeignKeyIndices: true });
  db.public.none(createTablesQuery);

  const pgMem = db.adapters.createPg();
  pool = new pgMem.Pool();
} else {
  const poolConfig = { connectionString };

  if (shouldUseSsl(connectionString)) {
    poolConfig.ssl = { rejectUnauthorized: false };
  }

  pool = new Pool(poolConfig);
}

module.exports = pool;
