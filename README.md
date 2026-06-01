# Node.js Backend with Neon PostgreSQL, Prisma ORM, and Socket.IO

This project is a Node.js backend Prisma ORM, and Neon PostgreSQL. It supports real-time ride sharing features with Socket.IO, user authentication with JWT, and RESTful APIs for users and rides.

## Setup

1. Set your Neon PostgreSQL connection string in the `.env` file as `DATABASE_URL`.
2. Run `npx prisma migrate dev --name init` to create the initial tables.
3. Run `npx prisma migrate dev --name <migration_name>` after any schema changes.
4. Start the server with `node index.js` or `npm start`.
5. (Optional) Use `socketTest.js` to test Socket.IO connections.

## Features
- User authentication (JWT-based)
- User model (role, phone, timestamps, ride relations)
- Ride model (vehicle, pickup/drop, fare, status, OTP, relations)
- REST API for users and rides
- Real-time ride updates and rider/customer location with Socket.IO
- Error handling and not-found middleware

## Project Structure
- `index.js` - Main entry point, server, and Socket.IO setup    
- `controllers/` - Business logic for users, rides, and sockets
- `routes/` - Express route definitions for auth and rides
- `middleware/` - Authentication, error handler, and not-found middleware
- `prisma/schema.prisma` - Prisma schema for PostgreSQL
- `generated/prisma/` - Generated Prisma client
- `utils/mapUtils.js` - Utility functions for distance, fare, OTP
- `socketTest.js` - Node.js script to test Socket.IO connection

## API Usage

### Authentication
- `POST /auth/signin` - Sign in or register, returns JWT access and refresh tokens
- Use the returned access token as `Authorization: Bearer <token>` in all protected requests

### Rides
- `POST /rides/create` - Create a new ride (requires authentication)
- `PATCH /rides/accept/:rideId` - Accept a ride as a rider
- `PATCH /rides/update/:rideId` - Update ride status
- `GET /rides/rides` - Get all rides for the authenticated user

### Socket.IO
- Connect to `ws://localhost:3000` with a valid JWT in the `access_token` header (see `socketTest.js`)
- Emit events like `goOnDuty`, `subscribeToZone`, `searchrider`, etc.

## Environment Variables
- `DATABASE_URL` - Neon PostgreSQL connection string
- `ACCESS_TOKEN_SECRET` - JWT secret for access tokens
- `ACCESS_TOKEN_EXPIRY` - Access token expiry (e.g., `4d`)
- `REFRESH_TOKEN_SECRET` - JWT secret for refresh tokens
- `REFRESH_TOKEN_EXPIRY` - Refresh token expiry (e.g., `30d`)

---

Replace the Neon connection string and secrets in `.env` with your own credentials. See code comments and each file for more details on usage and customization.

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

