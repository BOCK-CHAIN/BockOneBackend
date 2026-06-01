K8S DEPLOYMENT NOTES FOR krysonix-backend
=============================

1) Build and push image:
   docker build -t <registry>/krysonix-backend:latest .
   docker push <registry>/krysonix-backend:latest

2) Update deployment image in deployment.yaml.

3) Update secrets in secret.yaml before applying.

4) Apply manifests:
   kubectl apply -k k8s/

5) Check rollout:
   kubectl -n krysonix-backend get pods,svc,ingress
