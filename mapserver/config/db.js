const { Pool } = require('pg');
const fs = require('fs');

const sslRootCert = process.env.PGSSLROOTCERT || '/certs/global-bundle.pem';
const ssl = fs.existsSync(sslRootCert)
  ? {
      ca: fs.readFileSync(sslRootCert, 'utf8'),
      rejectUnauthorized: true,
    }
  : { rejectUnauthorized: false };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl,
});

const connectToDatabase = () => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Successfully connected to GCP PostgreSQL database!');
    release();
  });
};

module.exports = {
  pool,
  connectToDatabase
};
