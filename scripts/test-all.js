#!/usr/bin/env node
/**
 * BockDrive API - Comprehensive Test Suite
 * Run: node scripts/test-all.js
 * 
 * Tests all major API endpoints end-to-end against the running server.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001';
const TEST_EMAIL = `test_${Date.now()}@bockdrive.test`;
const TEST_PASSWORD = 'TestPassword123!';

let authToken = null;
let testUserId = null;
let testFileId = null;
let testFolderId = null;
let testShareId = null;
let testShareToken = null;

// ─── HTTP helpers ─────────────────────────────────────────────────────────────
const request = (method, urlPath, body = null, token = null, extraHeaders = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + urlPath);
    const lib = url.protocol === 'https:' ? https : http;
    const bodyStr = body ? JSON.stringify(body) : null;

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(bodyStr && { 'Content-Length': Buffer.byteLength(bodyStr) }),
        ...extraHeaders,
      },
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
};

// ─── Test runner ──────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;
const results = [];

const test = async (name, fn) => {
  try {
    await fn();
    passed++;
    results.push({ name, status: '✅ PASS' });
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    results.push({ name, status: '❌ FAIL', error: err.message });
    console.log(`  ❌ ${name}: ${err.message}`);
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message || 'Assertion failed');
};

const assertEqual = (actual, expected, label) => {
  if (actual !== expected) throw new Error(`${label}: expected ${expected}, got ${actual}`);
};

// ─── Test Suites ──────────────────────────────────────────────────────────────

const runHealthTests = async () => {
  console.log('\n📋 Health & API Info');

  await test('GET /health returns OK', async () => {
    const res = await request('GET', '/health');
    assertEqual(res.status, 200, 'status');
    assert(res.body.status === 'OK', 'status should be OK');
  });

  await test('GET /api returns API info', async () => {
    const res = await request('GET', '/api');
    assertEqual(res.status, 200, 'status');
    assert(res.body.name, 'should have name');
    assert(res.body.endpoints, 'should have endpoints');
  });
};

const runAuthTests = async () => {
  console.log('\n🔐 Authentication');

  await test('POST /api/v1/auth/register – create new user', async () => {
    let res = await request('POST', '/api/v1/auth/register', {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: 'Test User',
    });
    // Retry once on 500 (RDS cold-start connection pool)
    if (res.status === 500) {
      await new Promise(r => setTimeout(r, 2000));
      res = await request('POST', '/api/v1/auth/register', {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        name: 'Test User',
      });
      // If retry also got 400 (user already created on first attempt despite 500), login instead
      if (res.status === 400) {
        const loginRes = await request('POST', '/api/v1/auth/login', { email: TEST_EMAIL, password: TEST_PASSWORD });
        assert(loginRes.status === 200, `login fallback failed: ${JSON.stringify(loginRes.body)}`);
        authToken = loginRes.body.token;
        testUserId = loginRes.body.user.id;
        return;
      }
    }
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.token, 'should return token');
    assert(res.body.user?.id, 'should return user id');
    authToken = res.body.token;
    testUserId = res.body.user.id;
  });

  await test('POST /api/v1/auth/register – duplicate email rejected', async () => {
    const res = await request('POST', '/api/v1/auth/register', { email: TEST_EMAIL, password: TEST_PASSWORD });
    assert(res.status === 400, `expected 400, got ${res.status}: ${JSON.stringify(res.body)}`);
  });

  await test('POST /api/v1/auth/register – validation error for short password', async () => {
    const res = await request('POST', '/api/v1/auth/register', { email: 'x@x.com', password: '123' });
    assert(res.status === 400, `expected 400, got ${res.status}`);
    assert(res.body.errors, 'should return validation errors');
  });

  await test('POST /api/v1/auth/login – valid credentials', async () => {
    const res = await request('POST', '/api/v1/auth/login', { email: TEST_EMAIL, password: TEST_PASSWORD });
    assertEqual(res.status, 200, 'status');
    assert(res.body.token, 'should return token');
    authToken = res.body.token;
  });

  await test('POST /api/v1/auth/login – wrong password rejected', async () => {
    const res = await request('POST', '/api/v1/auth/login', { email: TEST_EMAIL, password: 'wrongpass' });
    assertEqual(res.status, 401, 'status');
  });

  await test('GET /api/v1/auth/me – returns current user', async () => {
    const res = await request('GET', '/api/v1/auth/me', null, authToken);
    assertEqual(res.status, 200, 'status');
    assertEqual(res.body.user.email, TEST_EMAIL, 'email should match');
  });

  await test('GET /api/v1/auth/me – no token rejected', async () => {
    const res = await request('GET', '/api/v1/auth/me');
    assertEqual(res.status, 401, 'status');
  });

  await test('POST /api/v1/auth/forgot-password – returns 200 always', async () => {
    const res = await request('POST', '/api/v1/auth/forgot-password', { email: TEST_EMAIL });
    assertEqual(res.status, 200, 'status');
    assert(res.body.message, 'should have message');
  });

  await test('POST /api/v1/auth/refresh – missing body returns 401', async () => {
    const res = await request('POST', '/api/v1/auth/refresh', {});
    assert([400, 401].includes(res.status), `expected 400/401, got ${res.status}`);
  });
};

const runProfileTests = async () => {
  console.log('\n👤 Profile');

  await test('GET /api/v1/profile – get own profile', async () => {
    const res = await request('GET', '/api/v1/profile', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(res.body.user.email === TEST_EMAIL, 'should return email');
    assert(res.body.user.storageQuota, 'should have storageQuota');
  });

  await test('PUT /api/v1/profile – update name', async () => {
    const res = await request('PUT', '/api/v1/profile', { name: 'Updated Name' }, authToken);
    assertEqual(res.status, 200, 'status');
    assert(res.body.user.name === 'Updated Name', 'name should be updated');
  });
};

const runFolderTests = async () => {
  console.log('\n📁 Folders');

  await test('POST /api/v1/folders – create root folder', async () => {
    const res = await request('POST', '/api/v1/folders', { name: 'Test Folder' }, authToken);
    assert([200, 201].includes(res.status), `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.folder?.id, 'should return folder id');
    testFolderId = res.body.folder.id;
  });

  await test('POST /api/v1/folders – duplicate name rejected', async () => {
    const res = await request('POST', '/api/v1/folders', { name: 'Test Folder' }, authToken);
    assertEqual(res.status, 400, 'status');
  });

  await test('GET /api/v1/folders – list root folders', async () => {
    const res = await request('GET', '/api/v1/folders', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.folders), 'should return array');
    assert(res.body.folders.length > 0, 'should have at least one folder');
  });

  await test('GET /api/v1/folders/:id – get folder', async () => {
    const res = await request('GET', `/api/v1/folders/${testFolderId}`, null, authToken);
    assertEqual(res.status, 200, 'status');
    assertEqual(res.body.folder.id, testFolderId, 'folder id');
  });

  await test('PATCH /api/v1/folders/:id – rename folder', async () => {
    const res = await request('PATCH', `/api/v1/folders/${testFolderId}`, { name: 'Renamed Folder' }, authToken);
    assertEqual(res.status, 200, 'status');
    assert(res.body.folder.name === 'Renamed Folder', 'name should be updated');
  });

  await test('PATCH /api/v1/folders/:id/star – star folder', async () => {
    const res = await request('PATCH', `/api/v1/folders/${testFolderId}/star`, null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(res.body.starred === true, 'should be starred');
  });

  await test('GET /api/v1/folders/:id/path – breadcrumb', async () => {
    const res = await request('GET', `/api/v1/folders/${testFolderId}/path`, null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.path), 'should return path array');
  });
};

const runStorageTests = async () => {
  console.log('\n💾 Storage');

  await test('GET /api/v1/storage/quota – returns quota info', async () => {
    const res = await request('GET', '/api/v1/storage/quota', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(res.body.used !== undefined, 'should have used');
    assert(res.body.limit !== undefined, 'should have limit');
    assert(res.body.planType, 'should have planType');
    assert(res.body.humanReadable, 'should have humanReadable');
  });

  await test('GET /api/v1/storage/plans – list plans', async () => {
    const res = await request('GET', '/api/v1/storage/plans');
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.plans), 'should return array');
    assert(res.body.plans.length === 3, 'should have 3 plans');
  });

  await test('POST /api/v1/storage/upgrade – upgrade to pro', async () => {
    const res = await request('POST', '/api/v1/storage/upgrade', { planType: 'pro' }, authToken);
    assertEqual(res.status, 200, 'status');
    assert(res.body.plan === 'pro', 'plan should be pro');
  });

  await test('POST /api/v1/storage/upgrade – invalid plan rejected', async () => {
    const res = await request('POST', '/api/v1/storage/upgrade', { planType: 'mega' }, authToken);
    assertEqual(res.status, 400, 'status');
  });
};

const runShareTests = async () => {
  console.log('\n🔗 Shares');

  if (!testFolderId) {
    console.log('  ⚠️  Skipping share tests (no test folder)');
    return;
  }

  await test('POST /api/v1/shares – create public folder share', async () => {
    const res = await request('POST', '/api/v1/shares', {
      folderId: testFolderId,
      permissionLevel: 'view',
    }, authToken);
    assertEqual(res.status, 201, `status: ${JSON.stringify(res.body)}`);
    assert(res.body.share?.shareToken, 'should have shareToken');
    testShareId = res.body.share.id;
    testShareToken = res.body.share.shareToken;
  });

  await test('GET /api/v1/shares – list my shares', async () => {
    const res = await request('GET', '/api/v1/shares', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.shares), 'should return array');
  });

  await test('GET /api/v1/shares/with-me – items shared with me', async () => {
    const res = await request('GET', '/api/v1/shares/with-me', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.shares), 'should return array');
  });

  await test('GET /api/v1/shares/access/:token – public access', async () => {
    if (!testShareToken) return;
    const res = await request('GET', `/api/v1/shares/access/${testShareToken}`);
    assertEqual(res.status, 200, `status: ${JSON.stringify(res.body)}`);
    assert(res.body.share, 'should have share info');
  });

  await test('PUT /api/v1/shares/:id – update permission', async () => {
    if (!testShareId) return;
    const res = await request('PUT', `/api/v1/shares/${testShareId}`, { permissionLevel: 'edit' }, authToken);
    assertEqual(res.status, 200, 'status');
  });

  await test('DELETE /api/v1/shares/:id – revoke share', async () => {
    if (!testShareId) return;
    const res = await request('DELETE', `/api/v1/shares/${testShareId}`, null, authToken);
    assertEqual(res.status, 200, 'status');
  });
};

const runFileTests = async () => {
  console.log('\n📄 File Operations (DB-level, no actual upload)');

  await test('GET /api/v1/files – list files in root', async () => {
    const res = await request('GET', '/api/v1/files', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.files), 'should return array');
  });

  await test('GET /api/v1/files/starred – starred files', async () => {
    const res = await request('GET', '/api/v1/files/starred', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.files), 'should return files array');
  });

  await test('GET /api/v1/files/recent – recent files', async () => {
    const res = await request('GET', '/api/v1/files/recent', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.files), 'should return files array');
  });

  await test('GET /api/v1/files/search?q=test – search files', async () => {
    const res = await request('GET', '/api/v1/files/search?q=test', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.files), 'should return files');
  });

  await test('GET /api/v1/files/trash – list trashed files', async () => {
    const res = await request('GET', '/api/v1/files/trash', null, authToken);
    assertEqual(res.status, 200, 'status');
    assert(Array.isArray(res.body.files), 'should return array');
  });

  await test('GET /api/v1/files/nonexistent – 404 for missing file', async () => {
    const res = await request('GET', '/api/v1/files/nonexistent-id-123', null, authToken);
    assertEqual(res.status, 404, 'status');
  });
};

const runTrashTests = async () => {
  console.log('\n🗑️  Trash Operations');

  await test('PATCH /api/v1/folders/:id/trash – move folder to trash', async () => {
    if (!testFolderId) return;
    const res = await request('PATCH', `/api/v1/folders/${testFolderId}/trash`, null, authToken);
    assertEqual(res.status, 200, `status: ${JSON.stringify(res.body)}`);
  });

  await test('PATCH /api/v1/folders/:id/restore – restore folder', async () => {
    if (!testFolderId) return;
    const res = await request('PATCH', `/api/v1/folders/${testFolderId}/restore`, null, authToken);
    assertEqual(res.status, 200, 'status');
  });
};

const runAdminTests = async () => {
  console.log('\n🛡️  Admin (Expected 403 – test user is not admin)');

  await test('GET /api/v1/admin/users – non-admin gets 403', async () => {
    const res = await request('GET', '/api/v1/admin/users', null, authToken);
    assertEqual(res.status, 403, `status (expected 403 for non-admin): ${JSON.stringify(res.body)}`);
  });

  await test('GET /api/v1/admin/stats – non-admin gets 403', async () => {
    const res = await request('GET', '/api/v1/admin/stats', null, authToken);
    assertEqual(res.status, 403, 'status');
  });
};

const runLegacyRouteTests = async () => {
  console.log('\n🔄 Backward-Compatible Legacy Routes');

  await test('POST /api/auth/login – legacy route still works', async () => {
    const res = await request('POST', '/api/auth/login', { email: TEST_EMAIL, password: TEST_PASSWORD });
    assertEqual(res.status, 200, `status: ${JSON.stringify(res.body)}`);
    assert(res.body.token, 'should return token');
  });

  await test('GET /api/files – legacy files route still works', async () => {
    const res = await request('GET', '/api/files', null, authToken);
    assertEqual(res.status, 200, 'status');
  });

  await test('GET /api/folders – legacy folders route still works', async () => {
    const res = await request('GET', '/api/folders', null, authToken);
    assertEqual(res.status, 200, 'status');
  });
};

const runLogoutTest = async () => {
  console.log('\n🚪 Logout');

  await test('POST /api/v1/auth/logout – successful logout', async () => {
    const res = await request('POST', '/api/v1/auth/logout', null, authToken);
    assertEqual(res.status, 200, 'status');
  });
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const main = async () => {
  console.log('═══════════════════════════════════════════════════');
  console.log('        BockDrive API - Full Test Suite');
  console.log(`        Target: ${BASE_URL}`);
  console.log('═══════════════════════════════════════════════════');

  // Check server is running
  try {
    await request('GET', '/health');
  } catch (err) {
    console.error(`\n❌ Server not reachable at ${BASE_URL}`);
    console.error('   Make sure the server is running: npm run dev\n');
    process.exit(1);
  }

  await runHealthTests();
  await runAuthTests();
  await runProfileTests();
  await runFolderTests();
  await runStorageTests();
  await runShareTests();
  await runFileTests();
  await runTrashTests();
  await runAdminTests();
  await runLegacyRouteTests();
  await runLogoutTest();

  // ─── Summary ────────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`         Results: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════════════');

  if (failed > 0) {
    console.log('\n❌ Failed tests:');
    results.filter((r) => r.status.includes('FAIL')).forEach((r) => {
      console.log(`   • ${r.name}: ${r.error}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed!\n');
  }
};

main().catch((err) => {
  console.error('Test suite crashed:', err);
  process.exit(1);
});
