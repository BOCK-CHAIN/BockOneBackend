# Decentralized Voting DApp on Custom Blockchain

This project implements a decentralized voting application (DApp) built on a custom blockchain. It provides a secure, transparent, and tamper-proof platform for conducting elections.

## Project Structure

The project consists of two main components:

1. **Custom Blockchain** - A validator-based Proof of Authority (PoA) blockchain with voting-specific functionality
2. **Frontend Application** - A Next.js/React application for interacting with the blockchain

## Custom Blockchain Features

- **Consensus**: Validator-based Proof of Authority (PoA)
- **Transaction Types**: Native token transfers and custom transaction formats for voting operations
- **VM**: Basic virtual machine for executing simple smart contracts
- **API Layer**: JSON RPC endpoints for interaction
- **Key Management**: ECDSA (P-256) for digital signatures

## Voting DApp Features

- **User Roles**:
  - **Voters**: Register, get approved, cast votes
  - **Candidates**: Register, get approved, receive votes
  - **Election Admin**: Approve/reject participants, set voting period, view results

- **Core Functionality**:
  - Secure voter/candidate registration
  - Tamper-proof vote casting
  - Real-time results tracking
  - IPFS for document storage (e.g., voter IDs, candidate profiles)

## Technical Stack

- **Backend**: Go-based custom blockchain
- **Frontend**: Next.js/React with TypeScript and Tailwind CSS
- **Storage**: IPFS via Pinata
- **Cryptography**: ECDSA (P-256) for digital signatures

## Getting Started

### Prerequisites

- Go 1.16+
- Node.js 16+
- npm or yarn

### Running the Blockchain

1. Start the blockchain nodes:
   ```
   cd projectx
   go run main.go
   ```

2. This will start a local blockchain network with multiple nodes.

### Running the Frontend

1. Navigate to the frontend directory:
   ```
   cd projectx/frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

The blockchain exposes the following API endpoints for the voting DApp:

- **Voter Registration**: `/voting/register/voter`
- **Candidate Registration**: `/voting/register/candidate`
- **Election Creation**: `/voting/election/create`
- **Vote Casting**: `/voting/vote`
- **Election Details**: `/voting/election/:id`
- **Election Results**: `/voting/election/:id/results`
- **Voter Details**: `/voting/voter/:id`
- **Candidate Details**: `/voting/candidate/:electionId/:id`
- **Voter Approval**: `/voting/approve/voter`
- **Candidate Approval**: `/voting/approve/candidate`

## Security Measures

- **Double Voting Prevention**: The blockchain state tracks votes to prevent double voting
- **Replay Attack Prevention**: Transactions include timestamps and nonces
- **Tamper-Proof Records**: All votes are stored on the immutable blockchain
- **Secure Identity Management**: ECDSA key pairs for voter and candidate identification
- **Document Verification**: IPFS for secure storage of verification documents

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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

The backend uses a **multi-stage Go build** — stage 1 compiles the binary with `golang:1.22-alpine`, stage 2 runs it in a minimal `alpine:3.20` image. The frontend uses a standard Next.js Docker build with Node.js.

### Kubernetes Manifests (`k8s/`)

Two separate deployments:
- **Backend** — Go binary on port 9000 with HTTP health probes, resource limits
- **Frontend** — Next.js app on port 3000 with 2 replicas, larger resource allocation
- Each includes ConfigMaps, Secrets, Services, HPAs, and Ingress

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

