# BockDrive Backend Documentation

## Overview

BockDrive Backend is a Node.js/Express.js RESTful API server that provides authentication, file management, and storage capabilities for the BockDrive application. It uses PostgreSQL as the database (via Prisma ORM), implements JWT-based authentication, and stores files locally on the server filesystem.

## Table of Contents

1. [Architecture](#architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Authentication](#authentication)
7. [File Management](#file-management)
8. [Folder Management](#folder-management)
9. [Security](#security)
10. [Configuration](#configuration)
11. [Development Guide](#development-guide)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## Architecture

The backend follows a **layered architecture** pattern:

```
┌─────────────────────────────────────┐
│      API Routes Layer                │
│  (authRoutes, fileRoutes, etc.)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Business Logic Layer            │
│  (Route handlers, validation)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Data Access Layer               │
│  (Prisma ORM, Database queries)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Storage Layer                   │
│  (Local filesystem, PostgreSQL)      │
└─────────────────────────────────────┘
```

### Key Design Patterns

- **RESTful API**: Standard HTTP methods and status codes
- **Middleware Pattern**: Authentication, error handling, CORS
- **Repository Pattern**: Prisma acts as data access abstraction
- **Separation of Concerns**: Routes, business logic, and data access separated

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | v16+ | Runtime environment |
| Express.js | ^4.21.2 | Web framework |
| PostgreSQL | Latest | Relational database |
| Prisma | ^6.9.0 | ORM and database toolkit |

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.21.2 | Web server framework |
| `@prisma/client` | ^6.9.0 | Prisma database client |
| `prisma` | ^6.9.0 | Prisma CLI and tools |
| `bcryptjs` | ^3.0.2 | Password hashing |
| `jsonwebtoken` | ^9.0.2 | JWT token generation/verification |
| `multer` | ^1.4.5-lts.1 | File upload handling |
| `cors` | ^2.8.5 | Cross-Origin Resource Sharing |
| `dotenv` | ^16.5.0 | Environment variable management |
| `uuid` | ^9.0.1 | Unique identifier generation |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `nodemon` | ^3.1.10 | Auto-restart on file changes |

---

## Project Structure

```
BockDriveBackend/
├── index.js                    # Main application entry point
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (not in git)
├── .env.example                # Example environment file
├── check-config.js             # Configuration validation script
│
├── routes/                     # API route definitions
│   ├── authRoutes.js          # Authentication endpoints
│   ├── fileRoutes.js          # File management endpoints
│   ├── folderRoutes.js        # Folder operations
│   └── uploadRoutes.js        # File upload handling
│
├── lib/                        # Utility libraries
│   └── prismaClient.js        # Prisma client singleton
│
├── prisma/                     # Database schema and migrations
│   ├── schema.prisma          # Database models definition
│   └── migrations/            # Database migration history
│
├── generated/                  # Auto-generated Prisma client
│   └── prisma/                # Prisma client code
│
└── uploads/                    # Local file storage
    └── [userId]/               # User-specific directories
        └── [uuid].ext          # Stored files
```

---

## Database Schema

### Prisma Schema Overview

The database uses PostgreSQL with the following models:

#### User Model

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  name            String?
  password        String?
  profilePicture  String?
  isEmailVerified Boolean  @default(false)
  storageQuota    BigInt   @default(5368709120) // 5GB
  refreshToken    String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  lastLoginAt     DateTime?
  
  folders         Folder[]
  files           File[]
  uploadSessions  UploadSession[]
}
```

**Key Fields:**
- `id`: Unique CUID identifier
- `email`: Unique email address (used for login)
- `password`: Bcrypt-hashed password
- `storageQuota`: User's storage limit in bytes (default: 5GB)

#### Folder Model

```prisma
model Folder {
  id          String   @id @default(cuid())
  name        String
  parentId    String?
  userId      String
  color       String?
  description String?
  isStarred   Boolean  @default(false)
  isInTrash   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  trashedAt   DateTime?
  
  user        User     @relation(...)
  parent      Folder?  @relation("FolderHierarchy", ...)
  children    Folder[] @relation("FolderHierarchy")
  files       File[]
}
```

**Key Features:**
- Hierarchical structure via `parentId`
- Soft delete with `isInTrash` flag
- Starred/favorite functionality
- Cascade delete on user deletion

#### File Model

```prisma
model File {
  id            String   @id @default(cuid())
  name          String
  originalName  String
  mimeType      String
  size          BigInt
  filePath      String   @unique
  folderId      String?
  userId        String
  checksum      String?
  thumbnail     String?
  isStarred     Boolean  @default(false)
  isInTrash     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  trashedAt     DateTime?
  lastAccessedAt DateTime?
  
  user          User     @relation(...)
  folder        Folder?  @relation(...)
}
```

**Key Features:**
- Stores both internal name (UUID) and original filename
- Local filesystem path in `filePath`
- MIME type for content-type detection
- File size as BigInt (supports large files)
- Soft delete with trash functionality
- Last accessed timestamp for analytics

#### UploadSession Model

```prisma
model UploadSession {
  id          String       @id @default(cuid())
  userId      String
  fileName    String
  fileSize    BigInt?
  mimeType    String?
  folderId    String?
  filePath    String?
  status      UploadStatus @default(PENDING)
  progress    Float        @default(0)
  errorMessage String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  completedAt DateTime?
  
  user        User     @relation(...)
}
```

**Purpose:** Tracks file upload progress and status (for future chunked uploads).

### Enums

```prisma
enum FileType {
  FILE
  FOLDER
}

enum UploadStatus {
  PENDING
  UPLOADING
  COMPLETED
  FAILED
}
```

### Database Indexes

Optimized indexes for performance:

- `User.email`: Unique index
- `Folder.userId`, `Folder.parentId`: Composite indexes
- `File.userId`, `File.folderId`: Composite indexes
- `File.filePath`: Unique index for fast lookups
- `File.isInTrash`: Index for trash queries

---

## API Endpoints

### Base URL

All endpoints are prefixed with `/api`:
- Development: `http://localhost:3001/api`
- Production: `https://yourdomain.com/api`

### Authentication Endpoints

#### POST `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe" // optional
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "cuid...",
    "email": "user@example.com",
    "name": "John Doe",
    "isEmailVerified": false
  }
}
```

**Error Responses:**
- `400`: Email/password missing or user already exists
- `500`: Server error

#### POST `/api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "cuid...",
    "email": "user@example.com",
    "name": "John Doe",
    "isEmailVerified": false
  }
}
```

**Error Responses:**
- `400`: Email/password missing
- `401`: Invalid credentials
- `500`: Server error

#### GET `/api/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "cuid...",
    "email": "user@example.com",
    "name": "John Doe",
    "isEmailVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: No token or invalid token
- `404`: User not found

#### POST `/api/auth/logout`

Logout user (client-side token removal).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

#### POST `/api/auth/refresh`

Refresh JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Token refreshed successfully",
  "token": "new_jwt_token_here"
}
```

---

### File Management Endpoints

#### GET `/api/files`

Get files and folders in a specific folder (or root).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `folderId` (optional): ID of folder to list contents

**Response (200 OK):**
```json
{
  "files": [
    {
      "id": "cuid...",
      "name": "My Folder",
      "type": "FOLDER",
      "isStarred": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "folderId": null
    },
    {
      "id": "cuid...",
      "name": "document.pdf",
      "originalName": "document.pdf",
      "type": "FILE",
      "mimeType": "application/pdf",
      "size": "1024000",
      "filePath": "/uploads/userId/uuid.pdf",
      "isStarred": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "folderId": "cuid..."
    }
  ],
  "currentFolder": "cuid..." // or null for root
}
```

#### GET `/api/files/starred`

Get all starred files.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "files": [
    {
      "id": "cuid...",
      "name": "important.pdf",
      "originalName": "important.pdf",
      "mimeType": "application/pdf",
      "size": "2048000",
      "isStarred": true,
      ...
    }
  ]
}
```

#### GET `/api/files/search`

Search files by name.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `q` (required): Search query

**Response (200 OK):**
```json
{
  "files": [
    {
      "id": "cuid...",
      "name": "searched_file.pdf",
      "originalName": "searched_file.pdf",
      ...
    }
  ]
}
```

#### GET `/api/files/trash`

Get all trashed files.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "files": [
    {
      "id": "cuid...",
      "name": "deleted_file.pdf",
      "originalName": "deleted_file.pdf",
      "isInTrash": true,
      "trashedAt": "2024-01-01T00:00:00.000Z",
      ...
    }
  ]
}
```

#### GET `/api/files/:id`

Get specific file metadata.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "file": {
    "id": "cuid...",
    "name": "document.pdf",
    "originalName": "document.pdf",
    "mimeType": "application/pdf",
    "size": "1024000",
    "filePath": "/uploads/userId/uuid.pdf",
    ...
  }
}
```

#### GET `/api/files/proxy/:fileId`

Stream file for preview (inline display).

**Headers or Query:**
```
Authorization: Bearer <jwt_token>
// OR
?token=<jwt_token>
```

**Response:**
- `200 OK`: File stream with appropriate `Content-Type`
- `404`: File not found
- `401`: Unauthorized

**Headers Set:**
```
Content-Type: <mimeType>
Content-Disposition: inline; filename="originalName"
Cache-Control: public, max-age=3600
```

#### GET `/api/files/download/:fileId`

Download file (forces download).

**Headers or Query:**
```
Authorization: Bearer <jwt_token>
// OR
?token=<jwt_token>
```

**Response:**
- `200 OK`: File stream with download headers
- `404`: File not found
- `401`: Unauthorized

**Headers Set:**
```
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="originalName"
Cache-Control: no-cache
```

#### PATCH `/api/files/:id/star`

Toggle star status of a file.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "file": {
    "id": "cuid...",
    "isStarred": true,
    ...
  },
  "starred": true
}
```

#### PATCH `/api/files/:id/trash`

Move file to trash (soft delete).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "File moved to trash",
  "file": {
    "id": "cuid...",
    "isInTrash": true,
    "trashedAt": "2024-01-01T00:00:00.000Z",
    ...
  }
}
```

#### PATCH `/api/files/:id/restore`

Restore file from trash.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "File restored",
  "file": {
    "id": "cuid...",
    "isInTrash": false,
    "trashedAt": null,
    ...
  }
}
```

#### DELETE `/api/files/:id`

Permanently delete a file.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "File deleted successfully"
}
```

**Note:** This permanently deletes the file record. The physical file should also be deleted from the filesystem (currently not implemented).

#### DELETE `/api/files/trash`

Empty trash (permanently delete all trashed files).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "5 files permanently deleted",
  "deletedCount": 5
}
```

---

### Folder Management Endpoints

#### POST `/api/folders`

Create a new folder.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "New Folder",
  "parentId": "cuid..." // optional, null for root
}
```

**Response (201 Created):**
```json
{
  "message": "Folder created successfully",
  "folder": {
    "id": "cuid...",
    "name": "New Folder",
    "parentId": null,
    "userId": "cuid...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    ...
  }
}
```

**Error Responses:**
- `400`: Folder name missing or duplicate name in same parent
- `401`: Unauthorized

#### GET `/api/folders`

Get folders in a specific parent (or root).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `parentId` (optional): ID of parent folder

**Response (200 OK):**
```json
{
  "folders": [
    {
      "id": "cuid...",
      "name": "My Folder",
      "parentId": null,
      "userId": "cuid...",
      "isStarred": false,
      "isInTrash": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      ...
    }
  ]
}
```

#### GET `/api/folders/:id`

Get specific folder metadata.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "folder": {
    "id": "cuid...",
    "name": "My Folder",
    "parentId": null,
    ...
  }
}
```

#### GET `/api/folders/:id/path`

Get folder breadcrumb path (for navigation).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "path": [
    {
      "id": "cuid...",
      "name": "Root"
    },
    {
      "id": "cuid...",
      "name": "Parent Folder"
    },
    {
      "id": "cuid...",
      "name": "Current Folder"
    }
  ]
}
```

#### PATCH `/api/folders/:id`

Rename a folder.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Renamed Folder"
}
```

**Response (200 OK):**
```json
{
  "message": "Folder updated successfully",
  "folder": {
    "id": "cuid...",
    "name": "Renamed Folder",
    ...
  }
}
```

**Error Responses:**
- `400`: Name missing or duplicate name
- `404`: Folder not found

#### DELETE `/api/folders/:id`

Delete a folder (only if empty).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Folder deleted successfully"
}
```

**Error Responses:**
- `400`: Folder contains files or subfolders
- `404`: Folder not found

---

### File Upload Endpoints

#### POST `/api/upload`

Upload a single file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `file`: File to upload
- `folderId` (optional): Target folder ID

**Response (200 OK):**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "id": "cuid...",
    "name": "document.pdf",
    "mimeType": "application/pdf",
    "size": "1024000",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "folderId": null
  }
}
```

**File Storage:**
- Files stored in `uploads/[userId]/[uuid].[ext]`
- Original filename preserved in database
- Internal filename is UUID for uniqueness

**Error Responses:**
- `400`: No file uploaded
- `401`: Unauthorized
- `413`: File too large (max 100MB)
- `500`: Upload failed

#### POST `/api/upload/multiple`

Upload multiple files (up to 10).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `files`: Array of files
- `folderId` (optional): Target folder ID

**Response (200 OK):**
```json
{
  "message": "3 file(s) uploaded successfully",
  "files": [
    {
      "id": "cuid...",
      "name": "file1.pdf",
      ...
    },
    ...
  ]
}
```

---

### Health Check

#### GET `/health`

Check server status (no authentication required).

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

---

## Authentication

### JWT Token Structure

Tokens are signed with `JWT_SECRET` and contain:

```json
{
  "userId": "cuid...",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Token Expiration:** 7 days (configurable)

### Authentication Middleware

Most routes use the `authenticateToken` middleware:

```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Contains userId and email
    next();
  });
};
```

### Password Security

- Passwords hashed with **bcrypt** (10 rounds)
- Never stored in plain text
- Password comparison uses `bcrypt.compare()`

---

## File Management

### File Storage

**Local Storage Structure:**
```
uploads/
├── [userId1]/
│   ├── uuid1.pdf
│   ├── uuid2.jpg
│   └── uuid3.docx
├── [userId2]/
│   └── uuid4.pdf
└── ...
```

**File Naming:**
- Internal name: `{uuid}.{extension}` (prevents conflicts)
- Original name: Stored in database `originalName` field
- Path: `uploads/{userId}/{uuid}.{ext}`

### File Upload Process

1. **Receive Request**: Multer middleware handles multipart/form-data
2. **Authenticate**: Verify JWT token
3. **Validate**: Check file size (max 100MB)
4. **Generate UUID**: Create unique filename
5. **Store File**: Save to `uploads/{userId}/` directory
6. **Create Record**: Insert file metadata into database
7. **Return Response**: Send file info to client

### File Serving

**Preview (Inline):**
- Endpoint: `/api/files/proxy/:fileId`
- Sets `Content-Disposition: inline`
- Appropriate `Content-Type` header
- Updates `lastAccessedAt` timestamp

**Download:**
- Endpoint: `/api/files/download/:fileId`
- Sets `Content-Disposition: attachment`
- Forces browser download

### File Deletion

**Soft Delete (Trash):**
- Sets `isInTrash = true`
- Sets `trashedAt` timestamp
- File remains on disk

**Permanent Delete:**
- Removes database record
- **Note:** Physical file deletion not yet implemented

---

## Folder Management

### Folder Hierarchy

Folders support nested structure:
- Root folders: `parentId = null`
- Nested folders: `parentId = parent_folder_id`
- Cascade delete: Deleting parent deletes children (via Prisma)

### Folder Operations

**Create:**
- Validates name uniqueness in same parent
- Creates folder record
- Returns folder metadata

**Navigate:**
- Breadcrumb path built recursively
- Path endpoint: `/api/folders/:id/path`

**Delete:**
- Only empty folders can be deleted
- Checks for child folders and files
- Permanent delete (no trash for folders)

---

## Security

### Security Features

1. **JWT Authentication**
   - Secure token-based auth
   - Token expiration (7 days)
   - Token refresh endpoint

2. **Password Hashing**
   - bcrypt with 10 salt rounds
   - Never expose passwords in responses

3. **CORS Protection**
   - Configurable allowed origins
   - Development: All origins allowed
   - Production: Specific domains

4. **File Validation**
   - File size limits (100MB)
   - MIME type detection
   - User-specific storage isolation

5. **Input Validation**
   - Email format validation
   - Required field checks
   - SQL injection prevention (via Prisma)

6. **Error Handling**
   - Generic error messages in production
   - Detailed errors in development
   - No sensitive data in error responses

### Security Best Practices

- **Environment Variables**: Sensitive data in `.env`
- **HTTPS**: Use in production
- **Rate Limiting**: Consider adding (not yet implemented)
- **File Scanning**: Consider virus scanning (not yet implemented)
- **Access Control**: User can only access their own files

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# JWT
JWT_SECRET="your-secret-key-here-min-32-chars"

# Server
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# CORS (optional)
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Generating JWT Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Database Setup

1. **Create PostgreSQL Database:**
   ```sql
   CREATE DATABASE bockdrive;
   ```

2. **Run Prisma Migrations:**
   ```bash
   npx prisma migrate dev
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Verify Connection:**
   ```bash
   node check-config.js
   ```

### File Storage Configuration

**Local Storage:**
- Default: `uploads/` directory in project root
- User directories: `uploads/{userId}/`
- Ensure write permissions

**Future: AWS S3 Integration**
- Currently commented out
- Requires AWS SDK installation
- Configure AWS credentials in `.env`

---

## Development Guide

### Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Setup Database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   # or
   node index.js
   ```

### Available Scripts

```json
{
  "start": "node index.js",
  "dev": "nodemon index.js",
  "db:migrate": "prisma migrate dev",
  "db:migrate:deploy": "prisma migrate deploy",
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:studio": "prisma studio",
  "db:seed": "node prisma/seed.js",
  "db:reset": "prisma migrate reset"
}
```

### Database Operations

**View Database:**
```bash
npx prisma studio
# Opens Prisma Studio at http://localhost:5555
```

**Create Migration:**
```bash
npx prisma migrate dev --name migration_name
```

**Reset Database:**
```bash
npx prisma migrate reset
# WARNING: Deletes all data
```

**Generate Client:**
```bash
npx prisma generate
# Run after schema changes
```

### Adding New Endpoints

1. **Create Route File** (if new feature):
   ```javascript
   // routes/newFeatureRoutes.js
   const express = require('express');
   const router = express.Router();
   const authenticateToken = require('../middleware/auth');
   
   router.get('/', authenticateToken, async (req, res) => {
     // Handler logic
   });
   
   module.exports = router;
   ```

2. **Register in index.js:**
   ```javascript
   const newFeatureRoutes = require('./routes/newFeatureRoutes');
   app.use('/api/newfeature', newFeatureRoutes);
   ```

3. **Add Business Logic:**
   - Use Prisma for database operations
   - Handle errors appropriately
   - Return consistent response format

### Code Style

- Use async/await (not callbacks)
- Consistent error handling
- Descriptive variable names
- Comment complex logic
- Follow Express.js best practices

---

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use secure JWT secret (32+ characters)
- [ ] Enable HTTPS
- [ ] Configure CORS for specific origins
- [ ] Set up production database
- [ ] Configure file storage (sufficient space)
- [ ] Set up logging/monitoring
- [ ] Configure reverse proxy (nginx)
- [ ] Set up process manager (PM2)
- [ ] Enable rate limiting
- [ ] Set up backups

### Deployment Options

**1. Traditional VPS/Server:**
```bash
# Install Node.js and PostgreSQL
# Clone repository
# Configure .env
# Run migrations
# Start with PM2
pm2 start index.js --name bockdrive-backend
```

**2. Docker:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3001
CMD ["node", "index.js"]
```

**3. Cloud Platforms:**
- **Heroku**: Use Procfile and Heroku Postgres
- **Railway**: Automatic deployment
- **Render**: Simple deployment
- **AWS EC2/ECS**: Full control

### Environment-Specific Configuration

**Development:**
- Detailed error messages
- CORS: All origins
- Logging: Verbose

**Production:**
- Generic error messages
- CORS: Specific origins
- Logging: Errors only
- HTTPS required

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Symptoms:**
- Error: "Can't reach database server"
- Prisma connection errors

**Solutions:**
- Verify `DATABASE_URL` format
- Check database is running
- Verify network connectivity
- Check SSL mode if using cloud database

#### 2. JWT Token Errors

**Symptoms:**
- "Invalid token" errors
- 401 Unauthorized responses

**Solutions:**
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure token format: `Bearer <token>`
- Regenerate secret if compromised

#### 3. File Upload Fails

**Symptoms:**
- Upload errors
- Files not saving

**Solutions:**
- Check `uploads/` directory permissions
- Verify disk space
- Check file size limits (100MB)
- Ensure user directory creation works

#### 4. Port Already in Use

**Symptoms:**
- "EADDRINUSE" error

**Solutions:**
```bash
# Find process using port
lsof -i :3001
# Kill process
kill -9 <PID>
# Or change PORT in .env
```

#### 5. Prisma Client Not Generated

**Symptoms:**
- "PrismaClient is not defined"
- Import errors

**Solutions:**
```bash
npx prisma generate
# Verify generated/prisma exists
```

### Debugging Tips

1. **Enable Verbose Logging:**
   ```javascript
   // In prismaClient.js
   log: ['query', 'info', 'warn', 'error']
   ```

2. **Check Environment Variables:**
   ```bash
   node check-config.js
   ```

3. **Test Database Connection:**
   ```bash
   npx prisma db pull
   ```

4. **View Request Logs:**
   - Add middleware logging
   - Use Postman/Insomnia for testing
   - Check browser DevTools Network tab

---

## API Response Format

### Success Response

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### Status Codes

- `200 OK`: Successful GET, PATCH, DELETE
- `201 Created`: Successful POST (create)
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing/invalid token
- `403 Forbidden`: Valid token but insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Performance Optimization

### Database Optimization

- Use indexes (already defined in schema)
- Limit query results (pagination)
- Use `select` to fetch only needed fields
- Optimize N+1 queries with `include`

### File Serving

- Consider CDN for file delivery
- Implement file caching headers
- Use streaming for large files
- Compress responses (gzip)

### Caching

- Consider Redis for session storage
- Cache frequently accessed data
- Implement ETags for file responses

---

## Future Enhancements

### Planned Features

- [ ] File versioning
- [ ] File sharing between users
- [ ] Real-time collaboration
- [ ] Chunked file uploads (large files)
- [ ] File preview generation (thumbnails)
- [ ] Advanced search (full-text)
- [ ] Activity logging
- [ ] Webhook support
- [ ] Rate limiting
- [ ] File virus scanning
- [ ] AWS S3 integration
- [ ] File compression
- [ ] Background job processing

### Technical Improvements

- [ ] Add comprehensive tests
- [ ] Implement request validation middleware
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement caching layer
- [ ] Add monitoring and analytics
- [ ] Set up CI/CD pipeline
- [ ] Add database backup automation
- [ ] Implement graceful shutdown

---

## License

This project is part of the BockDrive application suite.

---

## Support

For issues and questions:
- Check this documentation
- Review error logs
- Verify environment configuration
- Check database connectivity
- Review API endpoint documentation



---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t backend:latest .
```

### Run with Docker Compose

```bash
# Copy environment template
cp .env.example .env

# Update .env with your configuration
nano .env

# Start services
docker-compose up -d
```

The backend will be available at `http://localhost:3000` (or configured PORT)

### Run as Docker Container

```bash
docker run -d \
  --name backend \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  backend:latest
```

### View Docker Logs

```bash
docker logs -f backend
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

* Kubernetes cluster (EKS, GKE, or local)
* `kubectl` CLI configured
* Docker image pushed to registry

### Configuration Files

Kubernetes manifests are in the `k8s/` directory:

```
k8s/
├── namespace.yml        # Create namespace
├── secret.yml           # Store credentials
├── configmap.yml        # Application configuration
├── deployment.yml       # Pod deployment
├── service.yml          # Service exposure
├── ingress.yml          # HTTP routing
├── hpa.yml              # Horizontal Pod Autoscaler
└── rbac.yml             # Role-based access control
```

### Deploy to Kubernetes

**Option 1: Using kubectl**

```bash
# Create namespace
kubectl apply -f k8s/namespace.yml

# Update secrets with your credentials
kubectl apply -f k8s/secret.yml

# Deploy application
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/ingress.yml
kubectl apply -f k8s/hpa.yml
```

**Option 2: Using Kustomize**

```bash
kubectl apply -k k8s/
```

### Verify Deployment

```bash
# Check pods
kubectl get pods -n bock

# Check services
kubectl get svc -n bock

# Check ingress
kubectl get ingress -n bock

# View logs
kubectl logs -n bock -l app=backend -f

# Port forward for testing
kubectl port-forward -n bock svc/backend 3000:3000
```

### Update Secrets

```bash
# Edit secret
kubectl edit secret backend-secrets -n bock

# Or apply new secret
kubectl apply -f k8s/secret.yml
```

### Scale Replicas

```bash
kubectl scale deployment backend -n bock --replicas=3
```

---

## 🔐 Environment Variables

### Required Variables

```bash
# Copy template
cp .env.example .env

# Edit with your values
nano .env
```

### Environment File Format

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `AWS_ACCESS_KEY_ID` | AWS access key | `your-aws-key` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `your-aws-secret` |
| `AWS_REGION` | AWS region | `ap-south-1` |
| `AWS_S3_BUCKET` | S3 bucket name | `your-bucket` |
| `JWT_SECRET` | JWT signing secret | `your-jwt-secret` |

### Development vs Production

**Development (.env.example)**
```
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/dbname
NODE_ENV=development
PORT=3000
```

**Production (via Kubernetes secret)**
```
kubectl apply -f k8s/secret.yml
```

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Docker Build Fails

```bash
# Clear cache and rebuild
docker build --no-cache -t backend:latest .
```

### Database Connection Error

```bash
# Verify connection string format
# postgresql://user:password@host:port/database

# Test with psql
psql $DATABASE_URL -c "SELECT 1"
```

### Kubernetes Pod Won't Start

```bash
# Check pod events
kubectl describe pod <pod-name> -n bock

# Check logs
kubectl logs <pod-name> -n bock

# Check resource limits
kubectl top pods -n bock
```

### Permission Denied Errors

```bash
# Fix file permissions
chmod +x scripts/*.sh

# For Kubernetes, check RBAC
kubectl get rolebindings -n bock
```

---

## 📋 Production Checklist

- [ ] Environment variables configured securely
- [ ] Database backups enabled
- [ ] AWS credentials rotated
- [ ] SSL/TLS certificate configured
- [ ] Ingress rules properly configured
- [ ] Health checks passing
- [ ] Auto-scaling policies set
- [ ] Monitoring and logging enabled
- [ ] Backup and disaster recovery tested

---

## ⚙️ Deployment Configuration

### Dockerfile

The Dockerfile uses a `node:20-alpine` base image. It copies `prisma/` before `npm ci` for proper postinstall hooks, then generates the Prisma client. Port `3001` is exposed and the container starts with `npm start`.

### Kubernetes Manifests (`k8s/`)

Each deployment includes:
- **Secret** — database and S3 credentials
- **Deployment** — container spec with probes (startup, readiness, liveness) and resource limits
- **Service, HPA, Ingress** — internal routing, auto-scaling, and external access

### ⚠️ Deployment Strategy: Recreate

Currently all deployments use `strategy.type: Recreate`, which **terminates all existing pods before creating new ones**. This causes downtime during updates and is only suitable for **testing/development**.

**For production deployments, change to `RollingUpdate`:**

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1
```

This ensures **zero-downtime deployments** by gradually replacing pods while keeping the service available.

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html)

