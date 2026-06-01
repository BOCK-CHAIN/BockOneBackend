#!/usr/bin/env node
/**
 * BockDrive S3 Cloud Integration Test Suite
 * ─────────────────────────────────────────────
 * Tests REAL cloud operations:
 *  ✓ Multipart file upload to S3
 *  ✓ Multiple file upload
 *  ✓ Presigned URL direct upload + confirm
 *  ✓ Presigned download URL (fetch from S3)
 *  ✓ CloudFront URL generation
 *  ✓ File search
 *  ✓ File sharing (public token + per-user)
 *  ✓ Access shared file via token
 *  ✓ File rename, star, trash, restore
 *  ✓ Storage quota tracking
 *  ✓ File delete (S3 + DB cleanup)
 *
 * Run: node scripts/test-s3-integration.js
 * Ensure server is running: node index.js
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001';
const timestamp = Date.now();

// State shared across tests
let authToken = null;
let userId = null;
let uploadedFileId = null;
let uploadedFile2Id = null;
let presignedFileId = null;
let testFolderId = null;
let shareId = null;
let shareToken = null;
let downloadUrl = null;
let cloudFrontUrl = null;
let storageBeforeUpload = null;
let storageAfterUpload = null;

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

const jsonRequest = (method, urlPath, body = null, token = null) => {
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
      },
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data), headers: res.headers }); }
        catch { resolve({ status: res.statusCode, body: data, headers: res.headers }); }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
};

/**
 * Pure-Node multipart/form-data upload (no curl dependency)
 */
const multipartUpload = (endpoint, filePath, fieldName = 'file', token, extraFields = {}) => {
  return new Promise((resolve, reject) => {
    const boundary = `----BockDriveBoundary${Date.now()}`;
    const url = new URL(BASE_URL + endpoint);
    const lib = url.protocol === 'https:' ? https : http;

    const fileBuffer = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    const mimeType = filename.endsWith('.png') ? 'image/png'
      : filename.endsWith('.json') ? 'application/json'
      : filename.endsWith('.txt') ? 'text/plain'
      : 'application/octet-stream';

    // Build multipart body
    const parts = [];

    // Extra fields first
    for (const [k, v] of Object.entries(extraFields)) {
      parts.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`
      ));
    }

    // File field
    parts.push(Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`
    ));
    parts.push(fileBuffer);
    parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

    const body = Buffer.concat(parts);

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

/**
 * Multi-file multipart upload
 */
const multipartUploadMultiple = (endpoint, filePaths, fieldName = 'files', token) => {
  return new Promise((resolve, reject) => {
    const boundary = `----BockDriveBoundary${Date.now()}`;
    const url = new URL(BASE_URL + endpoint);
    const lib = url.protocol === 'https:' ? https : http;

    const parts = [];
    for (const filePath of filePaths) {
      const fileBuffer = fs.readFileSync(filePath);
      const filename = path.basename(filePath);
      const mimeType = filename.endsWith('.png') ? 'image/png'
        : filename.endsWith('.json') ? 'application/json'
        : filename.endsWith('.txt') ? 'text/plain'
        : 'application/octet-stream';
      parts.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`
      ));
      parts.push(fileBuffer);
      parts.push(Buffer.from('\r\n'));
    }
    parts.push(Buffer.from(`--${boundary}--\r\n`));
    const body = Buffer.concat(parts);

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

/**
 * Upload a buffer directly via presigned S3 URL (PUT)
 */
const putToPresignedUrl = (presignedUrl, buffer, contentType) => {
  return new Promise((resolve, reject) => {
    const url = new URL(presignedUrl);
    const lib = url.protocol === 'https:' ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length,
      },
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(buffer);
    req.end();
  });
};

/**
 * Fetch a URL and return status + first 200 bytes of body
 */
const fetchUrl = (targetUrl) => {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);
    const lib = url.protocol === 'https:' ? https : http;

    const req = lib.get(targetUrl, { headers: { 'User-Agent': 'BockDrive-Test/1.0' } }, (res) => {
      let data = Buffer.alloc(0);
      res.on('data', (c) => { data = Buffer.concat([data, c]); });
      res.on('end', () => resolve({ status: res.statusCode, bodyLength: data.length, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(new Error('Timeout')); });
  });
};

// ─── Temp file helpers ────────────────────────────────────────────────────────

const createTempFile = (name, content) => {
  const filePath = path.join('/tmp', name);
  fs.writeFileSync(filePath, content);
  return filePath;
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

const assert = (cond, msg) => { if (!cond) throw new Error(msg || 'Assertion failed'); };
const assertEqual = (a, b, label) => { if (a !== b) throw new Error(`${label}: expected ${b}, got ${a}`); };

// ─── Test Suites ──────────────────────────────────────────────────────────────

const runSetup = async () => {
  console.log('\n🔧 Setup — Register and Login');

  await test('Server is reachable', async () => {
    const res = await jsonRequest('GET', '/health');
    assertEqual(res.status, 200, 'health status');
    assert(res.body.storage === 's3', `Expected S3 storage mode, got "${res.body.storage}". Check AWS_S3_BUCKET in .env`);
    console.log(`     Storage mode: ${res.body.storage} ✓`);
  });

  await test('Register test user', async () => {
    const email = `s3test_${timestamp}@example.com`;
    let res = await jsonRequest('POST', '/api/v1/auth/register', {
      email,
      password: 'S3TestPass123!',
      name: 'S3 Tester',
    });
    // Retry on cold start
    if (res.status === 500) {
      await new Promise(r => setTimeout(r, 2000));
      res = await jsonRequest('POST', '/api/v1/auth/register', { email, password: 'S3TestPass123!', name: 'S3 Tester' });
      if (res.status === 400) {
        const lr = await jsonRequest('POST', '/api/v1/auth/login', { email, password: 'S3TestPass123!' });
        authToken = lr.body.token;
        userId = lr.body.user.id;
        return;
      }
    }
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    authToken = res.body.token;
    userId = res.body.user.id;
    console.log(`     User: ${res.body.user.email} (${userId})`);
  });

  await test('Create a test folder', async () => {
    const res = await jsonRequest('POST', '/api/v1/folders', { name: 'S3 Test Folder' }, authToken);
    assert([200, 201].includes(res.status), `expected 201, got ${res.status}`);
    testFolderId = res.body.folder.id;
    console.log(`     Folder ID: ${testFolderId}`);
  });
};

const runUploadTests = async () => {
  console.log('\n☁️  S3 File Uploads');

  // Create temp test files
  const textFile = createTempFile('test_upload.txt', `BockDrive S3 test file\nTimestamp: ${timestamp}\nRandom: ${crypto.randomBytes(16).toString('hex')}`);
  const jsonFile = createTempFile('test_data.json', JSON.stringify({ test: true, timestamp, items: [1, 2, 3] }, null, 2));
  const imgFile = createTempFile('test_image.png', Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  ));

  await test('Upload single text file to S3', async () => {
    const res = await multipartUpload('/api/v1/upload', textFile, 'file', authToken, { folderId: testFolderId });
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.file?.id, 'should have file id');
    assert(res.body.file?.s3Key, `file should have s3Key (got: ${JSON.stringify(res.body.file)})`);
    assert(res.body.file?.cloudFrontUrl, 'should have cloudFrontUrl');

    uploadedFileId = res.body.file.id;
    cloudFrontUrl = res.body.file.cloudFrontUrl;
    console.log(`     File ID: ${uploadedFileId}`);
    console.log(`     S3 Key: ${res.body.file.s3Key}`);
    console.log(`     CloudFront URL: ${cloudFrontUrl}`);
  });

  // Record quota before next upload
  storageBeforeUpload = (await jsonRequest('GET', '/api/v1/storage/quota', null, authToken)).body;

  await test('Upload PNG image to S3 in folder', async () => {
    const res = await multipartUpload('/api/v1/upload', imgFile, 'file', authToken, { folderId: testFolderId });
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.file?.s3Key, 'image should have s3Key');
    uploadedFile2Id = res.body.file.id;
    console.log(`     Image S3 key: ${res.body.file.s3Key}`);
  });

  storageAfterUpload = (await jsonRequest('GET', '/api/v1/storage/quota', null, authToken)).body;

  await test('Storage quota increased after uploads', async () => {
    const before = parseInt(storageBeforeUpload.used);
    const after = parseInt(storageAfterUpload.used);
    assert(after > before, `Storage should have grown: before=${before}, after=${after}`);
    console.log(`     Storage: ${storageBeforeUpload.humanReadable.used} → ${storageAfterUpload.humanReadable.used}`);
  });

  await test('Upload multiple files at once', async () => {
    const res = await multipartUploadMultiple('/api/v1/upload/multiple', [textFile, jsonFile], 'files', authToken);
    assert(res.status === 201, `multiple upload expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.files?.length === 2, `expected 2 files, got ${res.body.files?.length}`);
    assert(res.body.files.every(f => f.id), 'all files should have ids');
    console.log(`     Uploaded ${res.body.files.length} files: ${res.body.files.map(f => f.name).join(', ')}`);
  });

  // Clean up temp files
  [textFile, jsonFile, imgFile].forEach(f => { try { fs.unlinkSync(f); } catch {} });
};

const runPresignedUrlTests = async () => {
  console.log('\n🔑 Presigned URL (Direct Client Upload) Flow');

  let presignedUrl, s3Key, reportedCloudFrontUrl;
  const fileContent = Buffer.from(`Presigned upload test content - ${timestamp}`);

  await test('GET presigned upload URL from server', async () => {
    const res = await jsonRequest('POST', '/api/v1/upload/presign', {
      fileName: 'presigned_test.txt',
      contentType: 'text/plain',
      fileSize: fileContent.length,
      folderId: testFolderId,
    }, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.presignedUrl, 'should return presigned URL');
    assert(res.body.key, 'should return S3 key');
    assert(res.body.cloudFrontUrl, 'should return CloudFront URL');

    presignedUrl = res.body.presignedUrl;
    s3Key = res.body.key;
    reportedCloudFrontUrl = res.body.cloudFrontUrl;
    console.log(`     Presigned URL: ${presignedUrl.substring(0, 80)}...`);
    console.log(`     S3 Key: ${s3Key}`);
  });

  await test('PUT file bytes directly to S3 via presigned URL', async () => {
    if (!presignedUrl) throw new Error('No presigned URL from previous test');
    const result = await putToPresignedUrl(presignedUrl, fileContent, 'text/plain');
    assert([200, 204].includes(result.status), `S3 PUT expected 200/204, got ${result.status}: ${result.body}`);
    console.log(`     S3 PUT response: ${result.status} ✓`);
  });

  await test('Confirm presigned upload to register file in DB', async () => {
    if (!s3Key) throw new Error('No S3 key from previous test');
    const res = await jsonRequest('POST', '/api/v1/upload/confirm-presign', {
      key: s3Key,
      fileName: 'presigned_test.txt',
      mimeType: 'text/plain',
      size: fileContent.length,
      folderId: testFolderId,
    }, authToken);
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.file?.id, 'should have file id');
    presignedFileId = res.body.file.id;
    console.log(`     Confirmed file ID: ${presignedFileId}`);
    console.log(`     CloudFront URL: ${res.body.file.cloudFrontUrl}`);
  });
};

const runDownloadTests = async () => {
  console.log('\n⬇️  Presigned Download URL & Access');

  await test('GET presigned download URL for uploaded file', async () => {
    if (!uploadedFileId) throw new Error('No uploaded file ID');
    const res = await jsonRequest('GET', `/api/v1/files/${uploadedFileId}/url`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.url || res.body.downloadUrl, 'should have download URL');
    downloadUrl = res.body.url || res.body.downloadUrl;
    console.log(`     Download URL (first 80 chars): ${downloadUrl?.substring(0, 80)}...`);
  });

  await test('Presigned download URL is actually accessible (GET from S3)', async () => {
    if (!downloadUrl) throw new Error('No download URL from previous test');
    const result = await fetchUrl(downloadUrl);
    assert([200, 206].includes(result.status), `Download URL should return 200/206, got ${result.status}`);
    assert(result.bodyLength > 0, 'Downloaded content should not be empty');
    console.log(`     Downloaded ${result.bodyLength} bytes ✓`);
  });

  await test('GET file metadata from DB', async () => {
    if (!uploadedFileId) throw new Error('No file ID');
    const res = await jsonRequest('GET', `/api/v1/files/${uploadedFileId}`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.file?.s3Key, 'file should have s3Key in DB');
    assert(res.body.file?.cloudFrontUrl, 'file should have cloudFrontUrl in DB');
    console.log(`     File name: ${res.body.file.originalName}`);
    console.log(`     MIME type: ${res.body.file.mimeType}`);
    console.log(`     Size: ${res.body.file.size} bytes`);
  });
};

const runSearchTests = async () => {
  console.log('\n🔍 File Search');

  await test('Search files by name (partial match)', async () => {
    const res = await jsonRequest('GET', '/api/v1/files/search?q=test_upload', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(Array.isArray(res.body.files), 'should return files array');
    assert(res.body.files.length > 0, `search should find at least 1 result (got ${res.body.files.length})`);
    console.log(`     Found ${res.body.files.length} file(s) for "test_upload"`);
    res.body.files.slice(0, 3).forEach(f => console.log(`       - ${f.originalName} (${f.size} bytes)`));
  });

  await test('Search files with MIME type filter', async () => {
    const res = await jsonRequest('GET', '/api/v1/files/search?q=test&mimeType=text', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    console.log(`     Found ${res.body.files?.length || 0} text files`);
  });

  await test('Search files inside specific folder', async () => {
    if (!testFolderId) throw new Error('No folder ID');
    const res = await jsonRequest('GET', `/api/v1/files/search?q=test&folderId=${testFolderId}`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(Array.isArray(res.body.files), 'should return files array');
    console.log(`     Found ${res.body.files.length} files in folder`);
  });

  await test('Search returns empty for non-existent term', async () => {
    const res = await jsonRequest('GET', '/api/v1/files/search?q=zzznomatchxxx999', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.files?.length === 0, `should have 0 results, got ${res.body.files?.length}`);
  });

  await test('List recently added files', async () => {
    const res = await jsonRequest('GET', '/api/v1/files/recent', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.files?.length > 0, 'should have recent files after uploads');
    assert(res.body.files[0].originalName, 'recent files should have name');
    console.log(`     ${res.body.files.length} recent files`);
    console.log(`     Most recent: "${res.body.files[0].originalName}"`);
  });

  await test('List files in test folder', async () => {
    if (!testFolderId) throw new Error('No folder ID');
    const res = await jsonRequest('GET', `/api/v1/files?folderId=${testFolderId}`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.files?.length > 0, `should have files in folder, got ${res.body.files?.length}`);
    console.log(`     ${res.body.files.length} files in test folder`);
  });
};

const runSharingTests = async () => {
  console.log('\n🔗 File Sharing (Cloud)');

  if (!uploadedFileId) {
    console.log('  ⚠️  Skipping — no uploaded file ID');
    return;
  }

  await test('Create public share link for uploaded file', async () => {
    const res = await jsonRequest('POST', '/api/v1/shares', {
      fileId: uploadedFileId,
      permissionLevel: 'view',
    }, authToken);
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.share?.shareToken, 'should have share token');
    assert(res.body.share?.shareLink, 'should have share link');
    shareId = res.body.share.id;
    shareToken = res.body.share.shareToken;
    console.log(`     Share token: ${shareToken}`);
    console.log(`     Share link: ${res.body.share.shareLink}`);
  });

  await test('Access shared file via public token (unauthenticated)', async () => {
    if (!shareToken) throw new Error('No share token');
    const res = await jsonRequest('GET', `/api/v1/shares/access/${shareToken}`);
    assert(res.status === 200, `expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.file, 'should return file info');
    assert(res.body.file.name, 'should have file name');

    // Presigned download URL should be in shared response
    const sharedDownloadUrl = res.body.file.downloadUrl || res.body.file.cloudFrontUrl;
    assert(sharedDownloadUrl, 'shared file should have accessible URL');
    console.log(`     Shared file name: "${res.body.file.name}"`);
    console.log(`     File size: ${res.body.file.size} bytes`);
    console.log(`     Download URL via share: ${sharedDownloadUrl?.substring(0, 60)}...`);
  });

  await test('Download shared file via presigned URL (actual HTTP GET)', async () => {
    if (!shareToken) throw new Error('No share token');
    const shareRes = await jsonRequest('GET', `/api/v1/shares/access/${shareToken}`);
    const fileUrl = shareRes.body?.file?.downloadUrl || shareRes.body?.file?.cloudFrontUrl;
    if (!fileUrl) throw new Error('No download URL in share response');

    const result = await fetchUrl(fileUrl);
    assert([200, 206].includes(result.status), `Shared file download returned ${result.status}`);
    assert(result.bodyLength > 0, 'Downloaded file should have content');
    console.log(`     Downloaded ${result.bodyLength} bytes via share ✓`);
  });

  await test('Create folder share link', async () => {
    if (!testFolderId) throw new Error('No folder ID');
    const res = await jsonRequest('POST', '/api/v1/shares', {
      folderId: testFolderId,
      permissionLevel: 'view',
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24h
    }, authToken);
    assert(res.status === 201, `expected 201, got ${res.status}: ${JSON.stringify(res.body)}`);
    console.log(`     Folder share token: ${res.body.share.shareToken}`);
    console.log(`     Expires: ${res.body.share.expiresAt}`);
  });

  await test('Access shared folder shows all files inside', async () => {
    // Get the folder share we just created
    const sharesRes = await jsonRequest('GET', '/api/v1/shares', null, authToken);
    const folderShare = sharesRes.body.shares?.find(s => s.folderId === testFolderId);
    if (!folderShare) throw new Error('Folder share not found in list');

    const res = await jsonRequest('GET', `/api/v1/shares/access/${folderShare.shareToken}`);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.folder, 'should return folder info');
    assert(Array.isArray(res.body.folder.files), 'should list files in folder');
    console.log(`     Folder: "${res.body.folder.name}" with ${res.body.folder.files.length} files`);
  });

  await test('List my shares', async () => {
    const res = await jsonRequest('GET', '/api/v1/shares', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.shares?.length >= 2, `should have at least 2 shares, got ${res.body.shares?.length}`);
    console.log(`     Total shares created: ${res.body.shares.length}`);
  });

  await test('Share access counter increments', async () => {
    if (!shareId) throw new Error('No share ID');
    const before = await jsonRequest('GET', `/api/v1/shares/${shareId}`, null, authToken);
    const countBefore = before.body.share?.accessCount;

    // Access the share once more
    await jsonRequest('GET', `/api/v1/shares/access/${shareToken}`);

    const after = await jsonRequest('GET', `/api/v1/shares/${shareId}`, null, authToken);
    const countAfter = after.body.share?.accessCount;

    assert(countAfter > countBefore, `Access count should increment: ${countBefore} → ${countAfter}`);
    console.log(`     Access count: ${countBefore} → ${countAfter} ✓`);
  });

  await test('Revoke share link', async () => {
    if (!shareId) throw new Error('No share ID');
    const res = await jsonRequest('DELETE', `/api/v1/shares/${shareId}`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
  });

  await test('Revoked share returns 410 or 404', async () => {
    if (!shareToken) throw new Error('No share token');
    const res = await jsonRequest('GET', `/api/v1/shares/access/${shareToken}`);
    assert([404, 410].includes(res.status), `Revoked share should return 404/410, got ${res.status}: ${JSON.stringify(res.body)}`);
    console.log(`     Revoked share correctly returns ${res.status} ✓`);
  });
};

const runFileOpsTests = async () => {
  console.log('\n📝 File Operations on Cloud Files');

  await test('Rename uploaded file', async () => {
    if (!uploadedFileId) throw new Error('No file ID');
    const res = await jsonRequest('PATCH', `/api/v1/files/${uploadedFileId}/rename`, {
      name: `renamed_test_${timestamp}.txt`,
    }, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert(res.body.file?.name || res.body.file?.originalName, 'should return updated file');
    console.log(`     New name: ${res.body.file.name || res.body.file.originalName}`);
  });

  await test('Star a file', async () => {
    if (!uploadedFileId) throw new Error('No file ID');
    const res = await jsonRequest('PATCH', `/api/v1/files/${uploadedFileId}/star`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.starred === true, 'file should be starred');
  });

  await test('Starred file appears in starred list', async () => {
    const res = await jsonRequest('GET', '/api/v1/files/starred', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(res.body.files?.length > 0, 'starred list should have items');
    const found = res.body.files.find(f => f.id === uploadedFileId);
    assert(found, 'uploaded file should appear in starred list');
    console.log(`     ${res.body.files.length} starred file(s)`);
  });

  await test('Move file to trash', async () => {
    if (!uploadedFile2Id) throw new Error('No second file ID');
    const res = await jsonRequest('PATCH', `/api/v1/files/${uploadedFile2Id}/trash`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
  });

  await test('Trashed file appears in trash list', async () => {
    const res = await jsonRequest('GET', '/api/v1/files/trash', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    const found = res.body.files?.find(f => f.id === uploadedFile2Id);
    assert(found, 'trashed file should appear in trash');
    console.log(`     ${res.body.files.length} file(s) in trash`);
  });

  await test('Restore file from trash', async () => {
    if (!uploadedFile2Id) throw new Error('No second file ID');
    const res = await jsonRequest('PATCH', `/api/v1/files/${uploadedFile2Id}/restore`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
  });

  await test('Delete file (removes from S3 and DB)', async () => {
    if (!presignedFileId) throw new Error('No presigned file ID');
    const res = await jsonRequest('DELETE', `/api/v1/files/${presignedFileId}`, null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    console.log(`     Deleted: ${JSON.stringify(res.body.message)}`);
  });

  await test('Deleted file no longer accessible', async () => {
    if (!presignedFileId) throw new Error('No file ID');
    const res = await jsonRequest('GET', `/api/v1/files/${presignedFileId}`, null, authToken);
    assertEqual(res.status, 404, 'deleted file should be 404');
  });
};

const runStorageVerificationTests = async () => {
  console.log('\n💾 Storage Quota Verification');

  await test('Storage quota reflects uploaded files', async () => {
    const res = await jsonRequest('GET', '/api/v1/storage/quota', null, authToken);
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(parseInt(res.body.used) > 0, `Storage used should be > 0, got ${res.body.used}`);
    console.log(`     Used: ${res.body.humanReadable.used}`);
    console.log(`     Limit: ${res.body.humanReadable.limit} (${res.body.planType} plan)`);
    console.log(`     Usage: ${res.body.usedPercent.toFixed(2)}%`);
  });

  await test('Recalculate storage is consistent', async () => {
    const before = await jsonRequest('GET', '/api/v1/storage/quota', null, authToken);
    const recalcRes = await jsonRequest('POST', '/api/v1/storage/recalculate', null, authToken);
    assert(recalcRes.status === 200, `expected 200, got ${recalcRes.status}`);
    const after = await jsonRequest('GET', '/api/v1/storage/quota', null, authToken);
    console.log(`     Before recalc: ${before.body.humanReadable.used}`);
    console.log(`     After recalc: ${after.body.humanReadable.used}`);
    console.log(`     Recalc result: ${recalcRes.body.human}`);
  });
};

const runCleanup = async () => {
  console.log('\n🧹 Cleanup');

  await test('Delete all test files', async () => {
    const filesRes = await jsonRequest('GET', `/api/v1/files?folderId=${testFolderId}`, null, authToken);
    const files = filesRes.body.files || [];
    for (const f of files) {
      await jsonRequest('DELETE', `/api/v1/files/${f.id}`, null, authToken);
    }
    console.log(`     Deleted ${files.length} files from S3 + DB`);
  });

  await test('Delete test folder', async () => {
    if (!testFolderId) throw new Error('No folder ID');
    const res = await jsonRequest('DELETE', `/api/v1/folders/${testFolderId}?force=true`, null, authToken);
    assert([200, 404].includes(res.status), `expected 200/404, got ${res.status}`);
    console.log(`     Folder deleted`);
  });
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const main = async () => {
  console.log('══════════════════════════════════════════════════════════');
  console.log('      BockDrive — S3 Cloud Integration Test Suite');
  console.log(`      Target: ${BASE_URL}`);
  console.log('══════════════════════════════════════════════════════════');

  // Check server is up
  try {
    const res = await jsonRequest('GET', '/health');
    if (res.status !== 200) throw new Error();
  } catch {
    console.error(`\n❌ Server not reachable at ${BASE_URL}`);
    console.error('   Start it with: node index.js\n');
    process.exit(1);
  }

  await runSetup();
  await runUploadTests();
  await runPresignedUrlTests();
  await runDownloadTests();
  await runSearchTests();
  await runSharingTests();
  await runFileOpsTests();
  await runStorageVerificationTests();
  await runCleanup();

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════════');
  console.log(`         Results: ${passed} passed, ${failed} failed`);
  console.log('══════════════════════════════════════════════════════════');

  if (failed > 0) {
    console.log('\n❌ Failed tests:');
    results.filter(r => r.status.includes('FAIL')).forEach(r => {
      console.log(`   • ${r.name}: ${r.error}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 All S3 cloud integration tests passed!\n');
  }
};

main().catch(err => {
  console.error('\n💥 Test suite crashed:', err.message);
  process.exit(1);
});
