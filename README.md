# 🍽️ BockFoods Backend

Node.js/Express backend for the BockFoods application - handling restaurant and food management APIs.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT
- **Containerization**: Docker & Kubernetes

## Project Structure

```
BockOneBackend-bockfoods-backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
├── prisma/
│   └── schema.prisma
├── k8s/
│   ├── deployment.yml
│   ├── service.yml
│   └── secret.yml
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Setup database
npm run db:setup

# Start development server
npm run dev
```

### Environment Variables

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/bockfoods"
JWT_SECRET="your-jwt-secret"
NODE_ENV="development"
PORT=3000
```

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t bockfoods-backend:latest .
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

The backend will be available at `http://localhost:3000`

### Run as Docker Container

```bash
docker run -d \
  --name bockfoods-backend \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  bockfoods-backend:latest
```

### View Docker Logs

```bash
docker logs -f bockfoods-backend
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
kubectl logs -n bock -l app=bockfoods-backend -f

# Port forward for testing
kubectl port-forward -n bock svc/bockfoods-backend 3000:3000
```

### Update Secrets

```bash
# Edit secret
kubectl edit secret bockfoods-backend-secrets -n bock

# Or apply new secret
kubectl apply -f k8s/secret.yml
```

### Scale Replicas

```bash
kubectl scale deployment bockfoods-backend -n bock --replicas=3
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
| `JWT_SECRET` | JWT signing secret | `your-jwt-secret` |

### Development vs Production

**Development (.env.example)**
```
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/bockfoods
NODE_ENV=development
PORT=3000
JWT_SECRET=your-jwt-secret
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
docker build --no-cache -t bockfoods-backend:latest .
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

---

## 📋 Production Checklist

- [ ] Environment variables configured securely
- [ ] Database backups enabled
- [ ] SSL/TLS certificate configured
- [ ] Ingress rules properly configured
- [ ] Health checks passing
- [ ] Auto-scaling policies set
- [ ] Monitoring and logging enabled
- [ ] Backup and disaster recovery tested

---

## ⚙️ Deployment Configuration

### Dockerfile

The Dockerfile uses a `node:20-bookworm-slim` base image. It installs `openssl` for Prisma via apt, copies dependencies and runs `npm ci`, then generates the Prisma client. Port `3000` is exposed and the container starts with `node src/index.js`.

### Kubernetes Manifests (`k8s/`)

Each deployment includes:
- **ConfigMap** — non-sensitive environment variables
- **Secret** — database credentials and API keys
- **Deployment** — TCP socket probes, resource limits, and strategy
- **Service, HPA, Ingress** — routing, scaling, and external access

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
