<h1>🚀 Krysonix Backend Deployment Guide</h1>

<p>Follow the steps below to deploy the Krysonix backend successfully.</p>

<hr>

<h2>📌 Step 1: Clone the Repository</h2>
<pre>
git clone &lt;repo&gt;
</pre>

<hr>

<h2>📌 Step 2: Install Node Modules</h2>
<pre>
npm install
</pre>

<hr>

<h2>📌 Step 3: Add <code>.env</code> File</h2>

<p>Create a <code>.env</code> file in the root directory and add the following:</p>

<pre>
DATABASE_URL=' '

PORT=5000

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

CLOUDFRONT_URL=
</pre>

<hr>

<h2>📌 Step 4: Set Up S3 Bucket & CloudFront</h2>
<ul>
  <li>Create an AWS S3 bucket.</li>
  <li>Enable public access OR set correct bucket policies.</li>
  <li>Integrate the bucket with AWS CloudFront for CDN delivery.</li>
  <li>Update the CloudFront URL in <code>.env</code>.</li>
</ul>

<hr>

<h2>📌 Step 5: Create Neon PostgreSQL Database</h2>

<p>Use <strong>Neon PostgreSQL</strong> to create a new database. Copy the connection string into <code>DATABASE_URL</code> inside <code>.env</code>.</p>

<hr>

<h2>📌 Step 6: Create the Required Tables</h2>

<p>Run the following SQL commands to create the schema:</p>

<pre>
-- ===============================
-- TABLE: videos
-- ===============================

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    categories TEXT[],
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    owner_hex_id VARCHAR(100),
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- TABLE: comments
-- ===============================

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL,
    username VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comments_video
        FOREIGN KEY (video_id)
        REFERENCES videos(id)
        ON DELETE CASCADE
);

-- ===============================
-- TABLE: video_likes
-- (Tracks who liked/disliked each video)
-- ===============================

CREATE TABLE video_likes (
    id SERIAL PRIMARY KEY,
    user_hex_id VARCHAR(100) NOT NULL,
    video_id INTEGER NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('like', 'dislike')),

    CONSTRAINT fk_likes_video
        FOREIGN KEY (video_id)
        REFERENCES videos(id)
        ON DELETE CASCADE
);

-- ===============================
-- TABLE: follows
-- (Users can follow other channels)
-- ===============================

CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    follower_hex_id VARCHAR(100) NOT NULL,
    following_hex_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_follow UNIQUE (follower_hex_id, following_hex_id)
);
</pre>

<hr>

<h2>📌 Step 7: Update <code>.env</code> with All Correct Values</h2>

<p>Make sure your database URL, AWS keys, bucket name, region, and CloudFront URL are correctly filled.</p>

<hr>

<h2>📌 Step 8: Start the Server</h2>
<pre>
node server.js
</pre>

<p>🎉 Your Krysonix backend is now running!</p>

<hr>

<h3>👨‍💻 Need help?</h3>
<p>Feel free to reach out anytime for deployment or debugging support.</p>

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

The Dockerfile uses a `node:20-alpine` base image. It copies `package*.json` and runs `npm ci --omit=dev` for a lean production build, then copies the application source. Port `5000` is exposed and `NODE_ENV=production` is set.

### Kubernetes Manifests (`k8s/`)

Each deployment includes:
- **ConfigMap** — environment variables
- **Secret** — database and S3 credentials
- **Deployment** — TCP socket probes, resource limits, and strategy
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

