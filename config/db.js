import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const shouldUseSsl = (() => {
  const raw = process.env.PGSSL ?? process.env.DATABASE_SSL;
  if (raw != null) {
    return raw === "true" || raw === "1";
  }

  const cs = process.env.DATABASE_URL ?? "";
  return cs.includes("neon.tech") || cs.includes("sslmode=require");
})();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Neon PostgreSQL URL
  ...(shouldUseSsl ? { ssl: { rejectUnauthorized: false } } : {})
});

export default pool;
