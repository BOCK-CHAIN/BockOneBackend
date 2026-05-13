#!/bin/bash

# EC2 Deployment Script for Eira Backend
# Run this script on your EC2 instance to deploy the Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Eira Backend Deployment...${NC}"

# Configuration
DOCKER_USERNAME=${DOCKER_USERNAME:-"your-docker-username"}
IMAGE_NAME="eira-backend"
CONTAINER_NAME="eira-backend"
PORT=${PORT:-8080}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Installing Docker...${NC}"
    
    # Install Docker on Ubuntu/Amazon Linux
    sudo apt-get update || sudo yum update -y
    
    if command -v apt-get &> /dev/null; then
        # Ubuntu/Debian
        sudo apt-get install -y docker.io
        sudo systemctl start docker
        sudo systemctl enable docker
    else
        # Amazon Linux
        sudo yum install -y docker
        sudo service docker start
        sudo chkconfig docker on
    fi
    
    # Add current user to docker group
    sudo usermod -a -G docker $USER
    
    echo -e "${YELLOW}⚠️ Please logout and login again to use Docker without sudo${NC}"
    echo -e "${YELLOW}   Or run: newgrp docker${NC}"
fi

# Function to stop and remove existing container
cleanup_container() {
    echo -e "${YELLOW}🧹 Cleaning up existing container...${NC}"
    
    if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
        echo "Stopping existing container..."
        docker stop $CONTAINER_NAME
    fi
    
    if docker ps -aq -f name=$CONTAINER_NAME | grep -q .; then
        echo "Removing existing container..."
        docker rm $CONTAINER_NAME
    fi
    
    echo "✅ Container cleanup complete"
}

# Function to pull latest image
pull_image() {
    echo -e "${YELLOW}📥 Pulling latest Docker image...${NC}"
    
    # Remove old image if exists
    docker rmi ${DOCKER_USERNAME}/${IMAGE_NAME}:latest 2>/dev/null || true
    
    # Pull latest image
    docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    
    echo "✅ Image pulled successfully"
}

# Function to run container
run_container() {
    echo -e "${YELLOW}🏃 Starting new container...${NC}"
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo -e "${RED}⚠️ .env file not found. Creating template...${NC}"
        cat > .env << EOF
DATABASE_URL=postgresql://postgres:your_db_password_here@your-db-host:5432/eiradb
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your-bucket-name
JWT_SECRET=your_jwt_secret_here
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
PORT=8080
EOF
        echo -e "${YELLOW}📝 Default .env file created with your configuration${NC}"
    fi
    
    # Run container with environment variables
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:$PORT \
        --restart unless-stopped \
        --env-file .env \
        ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    
    echo "✅ Container started successfully"
}

# Function to check container health
check_health() {
    echo -e "${YELLOW}🏥 Checking container health...${NC}"
    
    # Wait for container to start
    sleep 10
    
    # Check if container is running
    if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
        echo "✅ Container is running"
        
        # Check logs
        echo "📋 Recent logs:"
        docker logs --tail 20 $CONTAINER_NAME
        
        # Try to make a health check request
        if curl -f http://localhost:$PORT/health 2>/dev/null; then
            echo -e "${GREEN}✅ Health check passed!${NC}"
        else
            echo -e "${YELLOW}⚠️ Health check failed, but container is running${NC}"
        fi
    else
        echo -e "${RED}❌ Container failed to start${NC}"
        echo "📋 Container logs:"
        docker logs $CONTAINER_NAME
        exit 1
    fi
}

# Function to show status
show_status() {
    echo -e "${GREEN}📊 Deployment Status:${NC}"
    echo "🐳 Running Containers:"
    docker ps --filter name=$CONTAINER_NAME
    echo ""
    echo "🌐 Application should be available at:"
    echo "   http://localhost:$PORT"
    echo "   http://$(curl -s ifconfig.me):$PORT"
}

# Main deployment flow
main() {
    echo "Starting deployment with the following configuration:"
    echo "  Docker Username: $DOCKER_USERNAME"
    echo "  Image: $IMAGE_NAME"
    echo "  Container: $CONTAINER_NAME"
    echo "  Port: $PORT"
    echo ""
    
    cleanup_container
    pull_image
    run_container
    check_health
    show_status
    
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
}

# Run main function
main "$@"
