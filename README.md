# Instagram Clone Backend

Node.js + Express middleware layer for the Instagram Clone Flutter app.

## Architecture

- **Authentication**: Supabase JWT verification
- **Database**: Supabase PostgreSQL with RLS
- **Storage**: Supabase Storage
- **API**: RESTful endpoints with Express.js

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env` file and update with your Supabase credentials:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication
- `GET /api/auth/me` - Get current user profile (requires auth)
- `GET /api/auth/profile/:id` - Get public profile (no auth required)

### Posts
- `GET /api/posts` - Get feed posts (optional auth)
- `GET /api/posts/user/:id` - Get user posts (no auth required)
- `POST /api/posts` - Create new post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth, owner only)

### Likes
- `POST /api/likes/posts/:id/like` - Toggle like on post (requires auth)
- `GET /api/likes/posts/:id/likes` - Get post likes (optional auth)

### Comments
- `POST /api/comments/posts/:id/comment` - Add comment to post (requires auth)
- `GET /api/comments/posts/:id/comments` - Get post comments (optional auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth, owner only)

### Messages (DMs)
- `GET /api/messages?otherUserId=xxx` - Get conversation (requires auth)
- `POST /api/messages` - Send message (requires auth)
- `GET /api/messages/conversations` - Get conversations list (requires auth)
- `PUT /api/messages/:id/read` - Mark message as read (requires auth)

## Authentication Flow

1. **Flutter**: Sign in directly with Supabase Auth
2. **Flutter**: Get Supabase access token
3. **Flutter**: Send `Authorization: Bearer <token>` header to backend
4. **Backend**: Verify JWT token using Supabase Service Role Key
5. **Backend**: Return user data or perform protected operations

## Security Features

- ✅ JWT token verification for all protected endpoints
- ✅ RLS (Row Level Security) respected through Supabase Service Role
- ✅ CORS enabled for frontend domain
- ✅ Input validation and sanitization
- ✅ UUID validation for all ID parameters
- ✅ Rate limiting ready (can be added)
- ✅ Error handling without exposing sensitive data

## Database Operations

All database operations use Supabase Service Role Key, which:
- Bypasses RLS for backend operations
- Allows full CRUD operations
- Maintains data integrity
- Respects existing database constraints

## Migration Strategy

### Phase 1: Read-Only APIs ✅
- Health check
- Auth profile endpoints
- Posts feed endpoints

### Phase 2: Write Operations ✅
- Post creation/deletion
- Like/unlike functionality
- Comments

### Phase 3: DMs ✅
- Message sending/receiving
- Conversations

### Phase 4: Flutter Migration
- Update Flutter services to use HTTP calls
- Remove direct Supabase client usage
- Test all functionality

## Error Handling

Standardized error responses:

```json
{
  "error": "Error type",
  "message": "Human readable message"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (permission denied)
- `404` - Not Found
- `500` - Internal Server Error

## Development Notes

- Uses ES6 modules (`import`/`export`)
- Environment variables with `dotenv`
- Structured with separate route files
- Comprehensive logging with emojis for visibility
- Ready for production deployment

## Testing

```bash
# Health check
curl http://localhost:3001/api/health

# Auth test (requires valid token)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3001/api/auth/me
```

## Next Steps

1. Update Flutter services to call backend APIs
2. Remove direct Supabase client usage from Flutter
3. Add rate limiting
4. Add request logging
5. Deploy to production (Vercel, Railway, etc.)
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

