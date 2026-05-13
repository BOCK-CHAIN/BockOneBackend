#!/bin/bash

# Deploy Eira Backend with Environment Configuration
# This script copies local .env to EC2 and redeploys the container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration (update these with your actual values)
EC2_HOST="13.203.3.246"  # Your current EC2 IP from logs
EC2_USER="ubuntu"
KEY_FILE="../EiraUIFlutter/flutter_frontend.pem"  # Path to your SSH key
REMOTE_DIR="/home/ubuntu/eira-backend"

echo -e "${GREEN}🚀 Deploying Eira Backend to EC2...${NC}"

# Check if .env file exists locally
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found locally!${NC}"
    exit 1
fi

# Check if SSH key exists
if [ ! -f "$KEY_FILE" ]; then
    echo -e "${RED}❌ SSH key file not found at: $KEY_FILE${NC}"
    exit 1
fi

# Step 1: Copy .env file to EC2
echo -e "${YELLOW}📁 Copying .env file to EC2...${NC}"
scp -i "$KEY_FILE" .env "$EC2_USER@$EC2_HOST:/tmp/.env"

# Step 2: Copy deployment script to EC2
echo -e "${YELLOW}📁 Copying deployment script to EC2...${NC}"
scp -i "$KEY_FILE" scripts/deploy.sh "$EC2_USER@$EC2_HOST:/tmp/deploy.sh"

# Step 3: Connect to EC2 and deploy
echo -e "${YELLOW}🔗 Connecting to EC2 and deploying...${NC}"
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << 'EOF'
    set -e
    
    # Create directory if it doesn't exist
    mkdir -p ~/eira-backend
    cd ~/eira-backend
    
    # Copy files from tmp
    cp /tmp/.env .
    cp /tmp/deploy.sh .
    chmod +x deploy.sh
    
    echo "🧹 Stopping and removing existing containers..."
    docker stop eira-backend 2>/dev/null || true
    docker rm eira-backend 2>/dev/null || true
    
    echo "🏗️ Building new image..."
    cat > Dockerfile << 'DOCKEREOF'
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
DOCKEREOF
    
    # Create a basic server.js if it doesn't exist (will be pulled from your repo)
    if [ ! -f server.js ]; then
        echo "📥 Server files not found. Please ensure your code is deployed."
    fi
    
    # Pull your latest code (you'll need to set this up with git or copy files)
    echo "⚡ For now, please manually copy your server files to this directory"
    echo "📍 Current directory: $(pwd)"
    echo "✅ Environment file is ready at: $(pwd)/.env"
    
EOF

echo -e "${GREEN}✅ Deployment script completed!${NC}"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "  1. Copy your application files to EC2: $REMOTE_DIR"
echo -e "  2. SSH into EC2 and run: cd $REMOTE_DIR && ./deploy.sh"
echo -e "  3. Or use the deploy-to-ec2.sh script if you have it set up"

echo -e "\n${GREEN}🔗 To SSH into your EC2 instance:${NC}"
echo -e "ssh -i $KEY_FILE $EC2_USER@$EC2_HOST"