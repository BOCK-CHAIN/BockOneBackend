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

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html)

