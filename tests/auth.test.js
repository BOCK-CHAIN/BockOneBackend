/**
 * Tests for /api/auth routes.
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
const authRoutes = require('../routes/auth');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeEach(() => {
  mockQuery.mockReset();
});

// ── POST /api/auth/signup ─────────────────────────────────────────────────────

describe('POST /api/auth/signup', () => {
  const validBody = {
    username: 'alice',
    password: 'secret',
    firstName: 'Alice',
    lastName: 'Smith',
    dob: '1990-01-01',
    gender: 'female',
    hexId: 'abc123',
    profilePhoto: 'https://cdn.example.com/profiles/photo.jpg',
  };

  test('201 – registers a new user', async () => {
    // First query: no existing user; second query: insert
    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });

    const res = await request(app).post('/api/auth/signup').send(validBody);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('409 – username already taken', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ username: 'alice' }] });

    const res = await request(app).post('/api/auth/signup').send(validBody);

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Username already exists');
  });

  test('500 – database error returns server error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB down'));

    const res = await request(app).post('/api/auth/signup').send(validBody);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Server error');
  });
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────

describe('POST /api/auth/login', () => {
  test('200 – valid credentials', async () => {
    const fakeUser = { username: 'alice', password: 'secret' };
    mockQuery.mockResolvedValueOnce({ rows: [fakeUser] });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'secret' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body.user).toEqual(fakeUser);
  });

  test('401 – user not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'secret' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  test('401 – wrong password', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ username: 'alice', password: 'correct' }] });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  test('500 – database error returns server error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB down'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'secret' });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Server error');
  });
});

// ── POST /api/auth/krysonixLogin ──────────────────────────────────────────────

describe('POST /api/auth/krysonixLogin', () => {
  test('200 – valid hex credentials', async () => {
    const fakeUser = { hex_id: 'abc123', password: 'secret' };
    mockQuery.mockResolvedValueOnce({ rows: [fakeUser] });

    const res = await request(app)
      .post('/api/auth/krysonixLogin')
      .send({ hexId: 'abc123', password: 'secret' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  test('401 – invalid hex credentials', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post('/api/auth/krysonixLogin')
      .send({ hexId: 'bad', password: 'secret' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
