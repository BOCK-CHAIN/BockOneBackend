# BockSheets Backend

A spreadsheet application backend built with Node.js and Express, backed by PostgreSQL.

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express
- **Database:** PostgreSQL (via `pg`)
- **Auth:** JWT + bcrypt
- **Reverse Proxy:** Nginx

## Project Structure

```
.
├── server.js                  # Entry point
├── Dockerfile                 # Docker build
├── nginx.conf                 # Nginx reverse proxy config
├── k8s/                       # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── kustomization.yaml
│   └── namespace.yaml
├── bocksheets_aws_postgres.sql
├── deploy.sh
└── bocksheets-backend.service  # systemd unit
```

## Quick Start

### Local

```bash
npm install
cp .env.example .env   # configure your DB
npm start              # starts on port 3000
```

### Docker

```bash
docker build -t bocksheets-backend .
docker run -p 3000:3000 --env-file .env bocksheets-backend
```

### Kubernetes

```bash
kubectl apply -k k8s/ -n bock
```

## ⚙️ Deployment Configuration

### Dockerfile

Uses `node:20-bookworm-slim` with `NODE_ENV=production`, installs only production deps (`npm ci --omit=dev`), and includes a Docker `HEALTHCHECK` against the `/health` endpoint.

### Kubernetes Manifests

The deployment includes:
- **ConfigMap** — environment variables
- **Secret** — database and API credentials
- **Deployment** — HTTP health probes, resource limits, and strategy
- **Service, HPA, Ingress** — routing, auto-scaling, and external access

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

## API Endpoints

| Method | Path       | Description       |
|--------|------------|-------------------|
| GET    | `/health`  | Health check      |

## Database

The schema is defined in `bocksheets_aws_postgres.sql`. The application uses raw SQL queries via the `pg` client (no ORM).

## License

MIT
