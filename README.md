# Golligog Search Engine

A modern, privacy-focused search engine built with Flutter frontend and Node.js backend, using SearXNG as the search provider.

## 🌟 Features

### Search Engine
- **Multi-category search**: All, Images, Videos, News, Maps, Books, Scholar
- **SearXNG integration**: Privacy-focused meta-search engine
- **Google-like UI**: Clean, intuitive interface
- **Responsive design**: Works on all screen sizes
- **URL launching**: Open search results in browser

### Authentication System
- **User registration/login**: Secure authentication with JWT
- **Password encryption**: bcrypt with configurable salt rounds
- **Profile management**: User preferences and settings
- **Session management**: Secure cookie-based sessions

### Backend Features
- **RESTful API**: Express.js with comprehensive endpoints
- **Database**: PostgreSQL with Sequelize ORM
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Input validation and sanitization
- **Error handling**: Comprehensive error management

## 🏗️ Architecture

```
golligog/
├── flutter/                    # Flutter mobile app
│   └── search_engine_app/
│       ├── lib/
│       │   ├── main.dart      # App entry point
│       │   ├── auth_wrapper.dart   # Authentication UI
│       │   ├── login_page.dart     # Login form
│       │   ├── signup_page.dart    # Registration form
│       │   ├── search_results_page.dart  # Search results display
│       │   ├── services/
│       │   │   ├── searxng_service.dart  # SearXNG API client
│       │   │   └── auth_service.dart     # Authentication API client
│       │   └── models/
│       │       └── search_models.dart    # Data models
│       └── pubspec.yaml       # Flutter dependencies
├── server/                    # Node.js backend
│   ├── server.js             # Server entry point
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── models/
│   │   └── User.js          # User model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── user.js          # User management routes
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── errorHandler.js  # Error handling middleware
│   ├── package.json         # Node.js dependencies
│   ├── .env.example         # Environment template
│   └── .env                 # Environment variables
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.9+
- Node.js 16+
- PostgreSQL database
- SearXNG instance (optional, uses public instances by default)

### Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Environment variables**:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # Database (AWS RDS PostgreSQL)
   DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
   DB_PORT=5432
   DB_NAME=golligog_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   
   # Security
   BCRYPT_SALT_ROUNDS=12
   ```

5. **Start the server**:
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

### Flutter App Setup

1. **Navigate to Flutter directory**:
   ```bash
   cd flutter/search_engine_app
   ```

2. **Install dependencies**:
   ```bash
   flutter pub get
   ```

3. **Run the app**:
   ```bash
   flutter run
   ```

## 📱 Usage

### Search Features
1. **Homepage**: Google-like search interface
2. **Search categories**: Select from All, Images, Videos, News, Maps, Books, Scholar
3. **Results**: Specialized layouts for different content types
4. **External links**: Tap results to open in browser

### Authentication
1. **Sign up**: Create account with email, username, and password
2. **Sign in**: Login with email and password
3. **Profile**: Manage user preferences and settings

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/preferences` - Update preferences
- `PUT /api/user/password` - Change password
- `DELETE /api/user/account` - Deactivate account
- `GET /api/user/stats` - Get user statistics

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with configurable salt rounds
- **Rate Limiting**: Prevents abuse and DoS attacks
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configurable cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **SQL Injection Protection**: Sequelize ORM with parameterized queries

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  profile_picture VARCHAR(500),
  preferences JSONB DEFAULT '{"searchEngine":"google","resultsPerPage":10,"safeSearch":true,"theme":"light"}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔍 SearXNG Integration

The app integrates with SearXNG for privacy-focused search:

- **Multiple engines**: Aggregates results from various search engines
- **No tracking**: Privacy-focused search without user tracking
- **Categories**: Support for different content types
- **Customizable**: Can use custom SearXNG instances

## 📦 Dependencies

### Flutter
- **http**: ^1.1.0 - HTTP client for API calls
- **url_launcher**: ^6.3.2 - Launch URLs in browser

### Node.js
- **express**: ^4.18.2 - Web framework
- **sequelize**: ^6.33.0 - Database ORM
- **bcryptjs**: ^2.4.3 - Password hashing
- **jsonwebtoken**: ^9.0.2 - JWT tokens
- **cors**: ^2.8.5 - CORS handling
- **helmet**: ^7.0.0 - Security headers
- **express-validator**: ^7.0.1 - Input validation

## 🚢 Deployment

### Backend (AWS/Heroku)
1. Set up PostgreSQL database (AWS RDS)
2. Configure environment variables
3. Deploy to cloud platform
4. Set up domain and SSL

### Frontend (Mobile)
1. Build for production: `flutter build apk`
2. Distribute via app stores or direct download

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **SearXNG**: Privacy-focused meta-search engine
- **Flutter**: Cross-platform mobile framework
- **Express.js**: Fast, unopinionated web framework
- **PostgreSQL**: Advanced open-source database

## 📞 Support

For support, email support@golligog.com or create an issue on GitHub.

---

**Made with ❤️ by the Golligog Team**

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

The Dockerfile uses a `node:20-alpine` base image. It copies `server/package*.json` separately for dependency caching, installs production-only deps (`npm ci --omit=dev`), generates the Prisma client, and sets `NODE_ENV=production`. Port `5000` is exposed.

### Kubernetes Manifests (`k8s/`)

The deployment includes:
- **ConfigMap** — environment configuration
- **Secret** — database and API credentials
- **Deployment** — TCP socket probes, resource limits, and strategy
- **Volume mounts** — AWS RDS CA bundle at `/certs` and a configMap injecting a server fix at `/app/server/server.js`
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

