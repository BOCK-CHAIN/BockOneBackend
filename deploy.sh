#!/bin/bash
set -e

echo "🚀 =================================================="
echo "🚀 BockSheets Backend Deployment Script"
echo "🚀 =================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on Ubuntu/Debian
if ! command -v apt-get &> /dev/null; then
    echo -e "${RED}❌ This script is designed for Ubuntu/Debian systems${NC}"
    exit 1
fi

# Update system packages
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt-get update -qq

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Node.js 18.x...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo -e "${GREEN}✅ Node.js $(node --version) installed${NC}"
else
    echo -e "${GREEN}✅ Node.js $(node --version) already installed${NC}"
fi

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}📦 Installing nginx...${NC}"
    sudo apt-get install -y nginx
    echo -e "${GREEN}✅ Nginx installed${NC}"
else
    echo -e "${GREEN}✅ Nginx already installed${NC}"
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing Node.js dependencies...${NC}"
npm install --production --quiet
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Please create a .env file with your configuration"
    exit 1
fi

# Configure nginx
echo -e "${YELLOW}⚙️  Configuring nginx...${NC}"
sudo cp nginx.conf /etc/nginx/sites-available/bocksheets

# Remove default site if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# Enable bocksheets site
sudo ln -sf /etc/nginx/sites-available/bocksheets /etc/nginx/sites-enabled/

# Test nginx configuration
if sudo nginx -t 2>&1 | grep -q "successful"; then
    echo -e "${GREEN}✅ Nginx configuration valid${NC}"
    sudo systemctl restart nginx
    echo -e "${GREEN}✅ Nginx restarted${NC}"
else
    echo -e "${RED}❌ Nginx configuration test failed${NC}"
    sudo nginx -t
    exit 1
fi

# Setup systemd service
echo -e "${YELLOW}⚙️  Setting up systemd service...${NC}"
sudo cp bocksheets-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable bocksheets-backend
sudo systemctl restart bocksheets-backend
echo -e "${GREEN}✅ Systemd service configured${NC}"

# Wait for service to start
echo -e "${YELLOW}⏳ Waiting for service to start...${NC}"
sleep 3

# Check service status
if sudo systemctl is-active --quiet bocksheets-backend; then
    echo -e "${GREEN}✅ Backend service is running${NC}"
else
    echo -e "${RED}❌ Backend service failed to start${NC}"
    echo "Check logs with: sudo journalctl -u bocksheets-backend -n 50"
    exit 1
fi

# Get public IP
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "YOUR_IP")

echo ""
echo -e "${GREEN}🎉 =================================================="
echo -e "🎉 Deployment Complete!"
echo -e "🎉 ==================================================${NC}"
echo ""
echo "📋 Service Status:"
sudo systemctl status bocksheets-backend --no-pager -l | head -n 10
echo ""
echo "🌐 API Endpoints:"
echo "   Health Check: http://${PUBLIC_IP}/health"
echo "   API Base URL: http://${PUBLIC_IP}/api"
echo ""
echo "📝 Useful Commands:"
echo "   View logs:        sudo journalctl -u bocksheets-backend -f"
echo "   Restart service:  sudo systemctl restart bocksheets-backend"
echo "   Stop service:     sudo systemctl stop bocksheets-backend"
echo "   Service status:   sudo systemctl status bocksheets-backend"
echo "   Nginx status:     sudo systemctl status nginx"
echo "   Test nginx:       sudo nginx -t"
echo ""
echo -e "${YELLOW}🔧 Next Steps:${NC}"
echo "1. Test the health endpoint: curl http://${PUBLIC_IP}/health"
echo "2. Update your Flutter app's api_config.dart to use: http://${PUBLIC_IP}/api"
echo "3. Configure your EC2 Security Group to allow inbound HTTP (port 80)"
echo ""
