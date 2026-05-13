# Eira Backend – AWS Deployment Guide 

## **Overview**

This guide explains how to deploy **Eira Backend** on AWS EC2 securely  including:

* Launching EC2
* Installing dependencies
* Securing AWS credentials
* Running the backend with PM2
* Recovering from leaked AWS keys

---

## **1. Prerequisites**

* AWS account with EC2 and IAM permissions
* Backend source code in GitHub
* Node.js and PM2 knowledge

---

## **2. Launch EC2 Instance**

1. **Instance** → Ubuntu LTS AMI
2. **Type** → t2.micro (test) or larger
3. **Key pair** → Create or use existing
4. **Security Group inbound rules**:

   * **22** (SSH) → Your IP
   * **8080** (Backend port) → Anywhere (or your client IP only)
5. Launch instance.

---

## **3. Connect to EC2**

```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

---

## **4. Install Dependencies**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm git -y
sudo npm install pm2 -g
```

---

## **5. Clone & Configure App**

```bash
git clone https://github.com/your-username/EiraFlutterBackend.git
cd EiraFlutterBackend
```

**Never commit `.env` to GitHub**
Add to `.gitignore`:

```
.env
.env.*
```

---

## **6. Set Environment Variables Securely**

```bash
nano ~/.bashrc
```

Add:

```bash
export AWS_ACCESS_KEY_ID=new_access_key
export AWS_SECRET_ACCESS_KEY=new_secret_key
export OTHER_ENV_VARIABLE=value
```

Reload:

```bash
source ~/.bashrc
```

---

## **7. Handling Compromised AWS Keys**

If AWS applies **`AWSCompromisedKeyQuarantineV3`**:

1. Create a new key in **IAM → Users → eira-backend-user → Security Credentials**
2. Update EC2 with the new key (`~/.bashrc`)
3. Deactivate the old key (don’t delete yet)
4. Test backend
5. Delete old key
6. Remove quarantine policy in **IAM → Permissions → Remove**

**Clean Git history:**

```bash
git filter-repo --path .env.development --invert-paths
git push --force
```

---

## **8. Start Backend with PM2**

```bash
npm install
pm2 start server.js --name eira-backend
pm2 startup
pm2 save
```

---

## **9. Access the Backend**

The backend will be available at:

```
http://<EC2_PUBLIC_IP>:8080
```

(Replace `8080` with your app’s configured port.)

---

## **10. Security Best Practices**

* Never push `.env` to GitHub
* Rotate AWS keys regularly
* Restrict Security Group inbound rules to trusted IPs
* Use HTTPS if exposing to public clients (via ALB or CloudFront)

---

## **11. Docker Deployment**

### **Build Docker Image**

```bash
docker build -t eira-backend:latest .
```

### **Run with Docker Compose**

```bash
# Copy environment template
cp .env.example .env

# Update .env with your configuration
nano .env

# Start services
docker-compose up -d
```

The backend will be available at `http://localhost:8080`

### **Run as Docker Container**

```bash
docker run -d \
  --name eira-backend \
  -p 8080:8080 \
  --env-file .env \
  --restart unless-stopped \
  eira-backend:latest
```

### **Docker Health Check**

The container includes a health check endpoint:

```bash
curl http://localhost:8080/health
```

---

## **12. Kubernetes Deployment**

### **Prerequisites**

* Kubernetes cluster (EKS, GKE, or local)
* `kubectl` CLI configured
* Docker image pushed to registry

### **Configuration Files**

All K8s manifests are provided in the `k8s/` directory:

```
k8s/
├── namespace.yaml          # Create 'bock' namespace
├── secret.yaml             # Store credentials
├── configmap.yaml          # Application configuration
├── deployment.yaml         # Pod deployment
├── service.yaml            # Service exposure
├── ingress.yaml            # HTTP routing
├── hpa.yaml                # Horizontal Pod Autoscaler
└── kustomization.yaml      # Kustomize configuration
```

### **Deploy to Kubernetes**

**Option 1: Using kubectl**

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Update secrets with your credentials
kubectl apply -f k8s/secret.yaml

# Deploy application
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml
```

**Option 2: Using Kustomize**

```bash
kubectl apply -k k8s/
```

### **Verify Deployment**

```bash
# Check pods
kubectl get pods -n bock

# Check services
kubectl get svc -n bock

# Check ingress
kubectl get ingress -n bock

# View logs
kubectl logs -n bock -l app=eira-backend -f
```

### **Update Secrets**

```bash
# Edit secret
kubectl edit secret eira-backend-secrets -n bock

# Or apply new secret
kubectl apply -f k8s/secret.yaml
```

### **Scale Replicas**

```bash
kubectl scale deployment eira-backend -n bock --replicas=3
```

### **Port Forwarding (for local testing)**

```bash
kubectl port-forward -n bock svc/eira-backend 8080:8080
```

---

## **13. Automated Deployment Scripts**

### **EC2 Automated Deployment**

Use the provided deployment script:

```bash
chmod +x deploy-backend-to-ec2.sh
./deploy-backend-to-ec2.sh
```

The script handles:
* Dependency installation
* Environment setup
* Docker image building
* Container startup
* Health checks

### **Local Development Deployment**

For development with environment variables:

```bash
chmod +x deploy-with-env.sh
./deploy-with-env.sh
```

---

## **14. Environment Variables**

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
nano .env
```

**Required Variables:**

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `AWS_REGION` | AWS region (e.g., ap-south-1) |
| `S3_BUCKET_NAME` | S3 bucket for file uploads |
| `JWT_SECRET` | JWT signing secret |
| `PORT` | Server port (default: 8080) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase private key |

---

## **15. Troubleshooting**

### **Port Already in Use**

```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=8081
```

### **Database Connection Error**

```bash
# Verify DATABASE_URL format
# postgresql://user:password@host:port/database

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### **Container Won't Start**

```bash
# Check logs
docker logs eira-backend

# Or for Kubernetes
kubectl logs -n bock -l app=eira-backend
```

### **Health Check Failed**

```bash
# Check if container is running
docker ps | grep eira-backend

# Test health endpoint
curl -v http://localhost:8080/health
```

---

## **16. Production Checklist**

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

