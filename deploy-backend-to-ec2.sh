#!/bin/bash

# Eira Health Backend - Local Build & EC2 Deployment
# Builds Docker image locally, then deploys to EC2

set -e

echo "🚀 Eira Health Backend - Local Build & Deploy"
echo "=============================================="
echo ""

# Configuration
EC2_IP="3.7.36.214"
EC2_USER="ubuntu"
PEM_FILE="flutter_frontend.pem"
IMAGE_NAME="eira-backend"
IMAGE_TAG="latest"
IMAGE_FILE="eira-backend.tar"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if PEM file exists
if [ ! -f "$PEM_FILE" ]; then
    echo -e "${RED}❌ Error: PEM file '$PEM_FILE' not found!${NC}"
    exit 1
fi

chmod 400 "$PEM_FILE"

echo -e "${BLUE}Step 1: Building Docker image locally...${NC}"

# Build Docker image
echo "Building image: $IMAGE_NAME:$IMAGE_TAG"
docker build -t "$IMAGE_NAME:$IMAGE_TAG" .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker image built successfully${NC}"
echo ""

echo -e "${BLUE}Step 2: Saving Docker image to tar file...${NC}"

# Save Docker image
docker save -o "$IMAGE_FILE" "$IMAGE_NAME:$IMAGE_TAG"

echo -e "${GREEN}✓ Image saved to $IMAGE_FILE${NC}"
echo "  Size: $(du -h $IMAGE_FILE | cut -f1)"
echo ""

echo -e "${BLUE}Step 3: Cleaning up old deployments on EC2...${NC}"

ssh -i "$PEM_FILE" "$EC2_USER@$EC2_IP" << 'ENDSSH'
    # Stop and remove old containers
    sudo docker stop eira-backend 2>/dev/null || true
    sudo docker rm eira-backend 2>/dev/null || true
    
    # Remove old images
    sudo docker rmi eira-backend:latest 2>/dev/null || true
    
    # Clean up old files
    rm -rf ~/eira-health-backend
    mkdir -p ~/eira-health-backend
    
    echo "✓ Cleanup completed"
ENDSSH

echo -e "${GREEN}✓ EC2 cleaned up${NC}"
echo ""

echo -e "${BLUE}Step 4: Transferring image to EC2...${NC}"

# Transfer image file
scp -i "$PEM_FILE" "$IMAGE_FILE" "$EC2_USER@$EC2_IP:~/eira-health-backend/"

# Transfer .env file
scp -i "$PEM_FILE" .env "$EC2_USER@$EC2_IP:~/eira-health-backend/"

echo -e "${GREEN}✓ Files transferred${NC}"
echo ""

echo -e "${BLUE}Step 5: Loading and running Docker image on EC2...${NC}"

ssh -i "$PEM_FILE" "$EC2_USER@$EC2_IP" << 'ENDSSH'
    cd ~/eira-health-backend
    
    # Load Docker image
    echo "Loading Docker image..."
    sudo docker load -i eira-backend.tar
    
    # Run container
    echo "Starting container..."
    sudo docker run -d \
        --name eira-backend \
        -p 8080:8080 \
        --env-file .env \
        --restart unless-stopped \
        eira-backend:latest
    
    # Wait for container to start
    sleep 3
    
    # Check container status
    echo ""
    echo "Container status:"
    sudo docker ps | grep eira-backend || echo "Container not running!"
    
    # Test health endpoint
    echo ""
    echo "Testing health endpoint..."
    sleep 2
    curl -s http://localhost:8080/health || echo "Health check failed"
ENDSSH

echo -e "${GREEN}✓ Container deployed and running${NC}"
echo ""

echo -e "${BLUE}Step 6: Running database setup...${NC}"

ssh -i "$PEM_FILE" "$EC2_USER@$EC2_IP" << 'ENDSSH'
    echo "Setting up database tables..."
    sudo docker exec eira-backend node setupDatabase.js
ENDSSH

echo -e "${GREEN}✓ Database setup completed${NC}"
echo ""

# Cleanup local tar file
rm -f "$IMAGE_FILE"

echo "=============================================="
echo -e "${GREEN}🎉 Backend Deployment Successful!${NC}"
echo "=============================================="
echo ""
echo "Backend API: http://$EC2_IP:8080"
echo ""
echo "Test it:"
echo "  curl http://$EC2_IP:8080/health"
echo ""
echo "View logs:"
echo "  ssh -i $PEM_FILE $EC2_USER@$EC2_IP"
echo "  sudo docker logs -f eira-backend"
echo ""
