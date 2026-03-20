# BockDocs Backend 

## Overview

The **BockDocs Backend** is a RESTful API built with **Node.js and Express** that powers authentication, document management, sharing, and email workflows for the BockDocs application.

It serves web, mobile, and desktop clients built with Flutter.

* * *

## Architecture

```
┌─────────────────┐
│   Flutter App   │  (Frontend - Web, iOS, Android, Desktop)
│   (Dart)        │
└────────┬────────┘
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Node.js/Express│  (Backend Server)
│   (JavaScript)  │
└────────┬────────┘
         │
┌────────▼────────┐
│  PostgreSQL     │  (Database - Neon)
│   (via Prisma)  │
└─────────────────┘
```

* * *

## Tech Stack

*   **Runtime**: Node.js 18+
    
*   **Framework**: Express.js 5.1.0
    
*   **Database**: PostgreSQL (Neon)
    
*   **ORM**: Prisma 6.16.3
    
*   **Authentication**:
    
    *   JWT (jsonwebtoken 9.0.2)
        
    *   Google OAuth (google-auth-library 10.5.0)
        
*   **Password Hashing**: bcryptjs 3.0.2
    
*   **Email**: nodemailer 7.0.10
    
*   **CORS**: cors 2.8.5
    

* * *

## Project Structure

```
BockDocs/
├── backend/                    # Node.js backend server
│   ├── controllers/            # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   └── documentController.js # Document CRUD operations
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js   # JWT authentication
│   │   └── optionalAuthMiddleware.js # Optional auth for shared docs
│   ├── routes/                # API route definitions
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── documentRoutes.js   # Document endpoints
│   ├── utils/                 # Utility functions
│   │   └── emailService.js    # Email sending service
│   ├── prisma/                # Database schema and migrations
│   │   ├── schema.prisma      # Prisma schema
│   │   └── migrations/        # Database migrations
│   ├── generated/             # Prisma generated client
│   ├── prismaClient.js        # Prisma client instance
│   ├── index.js               # Server entry point
│   └── package.json           # Backend dependencies
│
├──
```
* * *

## Getting Started

### Prerequisites

*   Node.js 18+
    
*   npm
    
*   PostgreSQL database (Neon recommended)
    

* * *

### Installation

`cd backend npm install`

* * *

### Environment Configuration

Create a `.env` file inside `backend/`:

```env
   # Database
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   
   # JWT Secret
   JWT_SECRET=your_secure_jwt_secret_key_here
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   
   # Email Configuration (optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@bockdocs.com
   
   # Frontend URL (for email links)
   FRONTEND_BASE_URL=http://localhost:8080
   FRONTEND_URL=http://localhost:5000
   
   # Server Configuration
   PORT=5050
   HOST=0.0.0.0
   NODE_ENV=development
   ```

4. **Set up Prisma:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Start the server:**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

   The server will start on `http://localhost:5050` (or the port specified in `.env`).

* * *

### Prisma Setup

`npx prisma generate npx prisma migrate deploy`

* * *

### Start Server

`npm start`

or (development):

`npm run dev`

Server runs at:

`http://localhost:5050`

Health check:

`GET /health`

* * *

## Authentication

### Supported Methods

*   Email & Password
    
*   Google OAuth (ID Token or Access Token)
    

### JWT Token

*   Expiry: **7 days**
    
*   Payload:
    

`{ "id": userId, "email": userEmail }`

*   Header format:
    

`Authorization: Bearer <token>`

* * *

## API Routes

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /signup | Register user |
| POST | /signin | Login |
| POST | /google | Google OAuth (ID token) |
| POST | /google-access | Google OAuth (access token) |
| POST | /forgot-password | Request reset |
| POST | /reset-password | Reset password |
| GET | /me | Current user |
| PUT | /profile | Update profile |
| PUT | /password | Change password |
| DELETE | /account | Delete account |
| POST | /logout | Logout |

* * *

### Document Routes (`/api/documents`)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /create | Create document |
| GET | / | Get user documents |
| GET | /:id | Get document |
| PUT | /save/:id | Save document |
| DELETE | /delete/:id | Delete document |
| POST | /share/:docId | Create share link |
| GET | /share/:token | Access shared doc |
| POST | /share/:docId/email | Share via email |

* * *

## Database Schema

### User Model

```prisma
model User {
  id                Int        @id @default(autoincrement())
  email             String     @unique
  password          String?
  uid               String?    @unique  // Google user ID
  name              String?
  resetToken        String?
  resetTokenExpires DateTime?
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
  documents         Document[]
}
```

### Document Model

```prisma
model Document {
  id           Int         @id @default(autoincrement())
  userId       Int
  title        String
  content      String?
  createdAt    DateTime    @default(now())
  lastModified DateTime    @updatedAt
  user         User        @relation(fields: [userId], references: [id])
  ShareLink    ShareLink[]
}
```

### ShareLink Model

```prisma
model ShareLink {
  id         Int       @id @default(autoincrement())
  token      String    @unique
  permission String    // "view" or "edit"
  expiresAt  DateTime?
  documentId Int
  document   Document  @relation(fields: [documentId], references: [id])
}
```
* * *

## Email Support

Supports:

*   Gmail SMTP
    
*   Custom SMTP
    
*   Development fallback (logs to console)
    

Used for:

*   Password reset
    
*   Document sharing
    

* * *

## Troubleshooting

**Port in use**

`lsof -i :5050 kill -9 <PID>`

**Database errors**

*   Verify `DATABASE_URL`
    
*   Run `npx prisma generate`
    

**JWT errors**

*   Check `JWT_SECRET`
    
*   Ensure `Bearer` header format
    

* * *

## License

MIT License
