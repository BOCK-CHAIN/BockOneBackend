// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('./config/db.js');
const authRoutes = require('./api/auth.js');
const listRoutes = require('./api/list.js')
const placeContribute = require('./api/contribute.js');
const storedAddresses = require('./api/storedAddress.js')

const app = express();
const port = process.env.PORT || 3001;

// Internal OSRM service (K8s cluster DNS)
const OSRM_HOST = process.env.OSRM_HOST || 'osrm-service';
const OSRM_PORT = parseInt(process.env.OSRM_PORT) || 5000;
const OSRM_TIMEOUT = parseInt(process.env.OSRM_TIMEOUT) || 20000;
const OSRM_RETRIES = parseInt(process.env.OSRM_RETRIES) || 3;

const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectToDatabase();

// Mount routes
app.use('/api/maps', authRoutes);
app.use('/api/maps/api', authRoutes);
app.use('/api/maps/list', listRoutes);
app.use('/api/maps/storedAddress', storedAddresses);
app.use('/api/maps/contribute', placeContribute);

// ─── Helpers ────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Proxy an HTTP GET to the internal OSRM service.
 * The OSRM response is passed through as-is (native OSRM format).
 */
function osrmRequest(osrmPath, req, res) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: OSRM_HOST,
      port: OSRM_PORT,
      path: osrmPath,
      method: 'GET',
      timeout: OSRM_TIMEOUT,
      headers: { 'User-Agent': 'BockMaps/1.0' },
    };

    const proxyReq = http.request(options, (proxyRes) => {
      let body = '';
      proxyRes.on('data', chunk => body += chunk);
      proxyRes.on('end', () => {
        if (proxyRes.statusCode < 200 || proxyRes.statusCode >= 300) {
          return reject(new Error(`OSRM HTTP ${proxyRes.statusCode}: ${body.slice(0, 200)}`));
        }
        try {
          const data = JSON.parse(body);
          resolve(data);
        } catch (e) {
          reject(new Error('OSRM JSON error: ' + e.message));
        }
      });
    });

    proxyReq.on('error', (err) => reject(err));
    proxyReq.on('timeout', () => { proxyReq.destroy(); reject(new Error('OSRM timeout')); });
    proxyReq.end();
  });
}

async function osrmRequestWithRetry(osrmPath, retries = OSRM_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await osrmRequest(osrmPath);
      return result;
    } catch (err) {
      console.error(`OSRM attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) await sleep(1000 * Math.pow(2, attempt - 1));
      else throw err;
    }
  }
}

// ─── Routes ──────────────────────────────────────────────────────────────

/**
 * Routing proxy: /api/maps/routing/{profile}/{lon},{lat};{lon},{lat}
 * Proxies to internal OSRM service at /route/v1/{profile}/{lon},{lat};{lon},{lat}
 */
app.use('/api/maps/routing/', async (req, res) => {
  const startTime = Date.now();
  try {
    const proxyPath = req.originalUrl.split('/api/maps/routing/')[1] || '';
    const osrmPath = `/route/v1/${proxyPath}?alternatives=false&steps=true&geometries=polyline`;
    console.log(`OSRM proxy: ${osrmPath}`);

    const result = await osrmRequestWithRetry(osrmPath);

    const elapsed = Date.now() - startTime;
    const dist = result.routes && result.routes[0] ? result.routes[0].distance : 0;
    const dur = result.routes && result.routes[0] ? result.routes[0].duration : 0;
    console.log(`OSRM OK: ${(dist / 1000).toFixed(1)}km ${(dur / 60).toFixed(0)}min in ${elapsed}ms`);

    res.json(result);
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error(`OSRM error after ${elapsed}ms:`, err.message);
    res.status(502).json({
      code: 'NoRoute',
      message: 'Route could not be computed. The coordinates may be outside the covered area.',
      error: err.message,
    });
  }
});

/**
 * Health check — tests OSRM service reachability
 */
app.get('/api/maps/health', async (req, res) => {
  let osrmStatus = 'unknown';
  let osrmVersion = null;
  try {
    const result = await osrmRequest('/health');
    osrmStatus = 'healthy';
    osrmVersion = result.version || null;
  } catch (err) {
    osrmStatus = 'unreachable';
  }

  res.json({
    status: 'ok',
    service: 'bockmaps-backend',
    provider: {
      name: 'osrm',
      host: OSRM_HOST,
      port: OSRM_PORT,
      status: osrmStatus,
      version: osrmVersion,
    },
  });
});

// Root health for K8s probes
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'bockmaps-backend' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server listening at http://0.0.0.0:${port}`);
  console.log(`OSRM upstream: http://${OSRM_HOST}:${OSRM_PORT}`);
  console.log(`OSRM timeout: ${OSRM_TIMEOUT}ms, retries: ${OSRM_RETRIES}`);
});
