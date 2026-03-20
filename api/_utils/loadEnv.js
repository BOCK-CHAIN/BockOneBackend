const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

let loaded = false;

function loadEnv() {
  if (loaded) return;

  const rootDir = path.resolve(__dirname, '..', '..');
  const envPath = path.join(rootDir, '.env');
  const fallbackEnvPath = path.join(rootDir, '.env.development');

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else if (fs.existsSync(fallbackEnvPath)) {
    dotenv.config({ path: fallbackEnvPath });
  } else {
    dotenv.config();
  }

  loaded = true;
}

module.exports = loadEnv;
