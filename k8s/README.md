# =============================================================================
# ORVENTUS BACKEND KUBERNETES CONFIGURATION
# =============================================================================
# This directory contains k8s manifests for deploying the orventus backend.
#
# QUICK SWITCH GUIDE:
# ===================
#
# OPTION A: Use k8s Postgres (CURRENT DEFAULT)
# ------------------------------------------
# 1. Ensure all postgres-*.yaml files are present
# 2. Run: kubectl apply -k .
#
# OPTION B: Switch to AWS RDS / EKS
# ------------------------------------------
# 1. Edit overlays/rds/secret.yaml with your RDS endpoint
# 2. Run: kubectl apply -k overlays/rds
#
# FILES:
# ------
# deployment.yaml    - Main backend deployment
# service.yaml       - Backend service (NodePort)
# ingress.yaml       - Ingress configuration
# hpa.yaml           - Horizontal Pod Autoscaler
# configmap.yaml     - Environment config (NODE_ENV, PORT, CORS)
# secret.yaml        - Secrets (DATABASE_URL, JWT, AWS keys)
#
# Postgres files (delete when using RDS):
#   postgres-deployment.yaml
#   postgres-service.yaml
#   postgres-configmap.yaml
#   postgres-secret.yaml
#   postgres-pv.yaml
#
# KUSTOMIZE OVERLAYS:
# -------------------
# overlays/rds/       - AWS RDS/EKS configuration overlay
#
# IMAGE TAGS:
# -----------
# v2 = Latest with resend-otp feature
# local = Local build for testing
# =============================================================================
