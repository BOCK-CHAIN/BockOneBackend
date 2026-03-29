/**
 * Tests for /api/profile routes.
 * The pg Pool and multer-s3 upload are mocked so no real
 * database or AWS credentials are required to run these tests.
 */

// ── Mock pg ──────────────────────────────────────────────────────────────────
const mockQuery = jest.fn();
jest.mock('pg', () => {
  return {
    Pool: jest.fn().mockImplementation(() => ({ query: mockQuery })),
  };
});

// ── Mock multer / multer-s3 so upload.single() is a no-op ────────────────────
jest.mock('../utils/s3', () => {
  const multer = require('multer');
  const upload = multer({ storage: multer.memoryStorage() });
  return {
    upload,
    buildCdnUrl: (key) => `https://cdn.example.com/${key}`,
  };
});

const request = require('supertest');
const express = require('express');
const profileRoutes = require('../routes/profile');

const app = express();
app.use(express.json());
app.use('/api/profile', profileRoutes);

const fakeUser = {
  id: 1,
  username: 'alice',
  password: 'secret',
  first_name: 'Alice',
  last_name: 'Smith',
  dob: '1990-01-01',
  gender: 'female',
  hex_id: 'abc123',
  profile_photo: 'https://cdn.example.com/profiles/photo.jpg',
};

beforeEach(() => {
  mockQuery.mockReset();
});

// ── GET /api/profile/:username ────────────────────────────────────────────────

describe('GET /api/profile/:username', () => {
  test('200 – returns user profile', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [fakeUser] });

    const res = await request(app).get('/api/profile/alice');

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('alice');
  });

  test('404 – user not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/api/profile/nobody');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  test('500 – database error returns server error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB down'));

    const res = await request(app).get('/api/profile/alice');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Server error');
  });
});

// ── GET /api/profile/hex/:hex_id ──────────────────────────────────────────────

describe('GET /api/profile/hex/:hex_id', () => {
  test('200 – returns user by hex id', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [fakeUser] });

    const res = await request(app).get('/api/profile/hex/abc123');

    expect(res.status).toBe(200);
    expect(res.body.hex_id).toBe('abc123');
  });

  test('404 – user not found by hex id', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/api/profile/hex/unknown');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});

// ── PUT /api/profile/:username ────────────────────────────────────────────────

describe('PUT /api/profile/:username', () => {
  test('200 – updates profile fields', async () => {
    const updated = { ...fakeUser, first_name: 'Alicia' };
    mockQuery.mockResolvedValueOnce({ rows: [updated] });

    const res = await request(app)
      .put('/api/profile/alice')
      .send({ firstName: 'Alicia' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Profile updated');
    expect(res.body.user.first_name).toBe('Alicia');
  });

  test('400 – no fields provided', async () => {
    const res = await request(app).put('/api/profile/alice').send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No valid fields provided');
  });

  test('404 – user not found on update', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .put('/api/profile/nobody')
      .send({ firstName: 'Ghost' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  test('500 – database error returns server error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB down'));

    const res = await request(app)
      .put('/api/profile/alice')
      .send({ firstName: 'Alice' });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Server error');
  });
});
