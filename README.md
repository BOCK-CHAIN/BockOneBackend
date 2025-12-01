Bock One Backend – Deployment Guide

This README explains the full steps required to deploy the Bock One Backend using AWS S3 + CloudFront, RDS PostgreSQL, and EC2.

🚀 Prerequisites

Before you begin, ensure you have:

An AWS account

Basic knowledge of EC2, RDS, and S3

SSH key pair for EC2

PostgreSQL credentials

📌 Step 1: Create S3 Bucket With CloudFront

Go to AWS → S3

Create a new S3 bucket

Upload your web assets if required

Open CloudFront

Create a new distribution and attach it to your S3 bucket

Copy the CloudFront URL for frontend access

📌 Step 2: Create RDS PostgreSQL Instance

Go to AWS → RDS

Launch a new PostgreSQL instance

Configure:

Free tier / t3.micro

PostgreSQL version compatible with pg

Note the following:

RDS Endpoint

Database name

Master username & password

📌 Step 3: Create EC2 Instance and Connect

Launch an Ubuntu EC2 instance (22.04 recommended)

Add inbound rules:

SSH (22)

HTTP (80)

SSH into your EC2 instance:

ssh -i "yourKey.pem" ubuntu@your-ec2-public-ip

📌 Step 4: Install Dependencies in EC2

Run the following commands inside your EC2 instance:

sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y
git --version

# Clone backend repository
git clone https://github.com/BOCK-CHAIN/BockOneBackend.git

# Install Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Check versions
node -v
npm -v

# Install PostgreSQL client
sudo apt install postgresql-client -y
psql --version

📌 Step 5: Connect to Your RDS Database

Replace <USERNAME>, <PASSWORD>, <RDS-ENDPOINT>, <DBNAME>:

psql "postgresql://<USERNAME>:<PASSWORD>@<RDS-ENDPOINT>:5432/<DBNAME>"

Create the users table:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  dob DATE,
  gender VARCHAR(20),
  hex_id VARCHAR(100),
  profile_photo TEXT,
  created_at TIMESTAMP DEFAULT now()
);

Verify Tables
\dt
\d users
\q

📌 Step 6: Install Backend Dependencies
cd BockOneBackend
npm install

📌 Step 7: Start the Backend Server
node server.js


If everything is configured correctly, you will see:

Server running on port 3000

✅ Deployment Complete

Your backend is now up and running on EC2, connected to RDS, and ready to serve requests.

If you want, I can also prepare:
