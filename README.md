<h1 align="center">🚀 Bock One Backend</h1>

<p align="center">
  Node.js / Express backend with PostgreSQL and AWS S3 + CloudFront for profile photos.
</p>

<hr>

<h2>💻 Local Development Setup</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js LTS (≥ 18)</li>
  <li>npm</li>
  <li>PostgreSQL running locally (or any accessible PostgreSQL instance)</li>
</ul>

<h3>1. Clone the repository</h3>
<pre>
git clone https://github.com/BOCK-CHAIN/BockOneBackend.git
cd BockOneBackend
</pre>

<h3>2. Install dependencies</h3>
<pre>
npm install
</pre>

<h3>3. Configure environment variables</h3>
<p>Copy the example file and fill in your values:</p>
<pre>
cp .env.example .env
</pre>

<p>Open <code>.env</code> and set at minimum:</p>
<pre>
# Local PostgreSQL connection string
DATABASE_URL='postgresql://postgres:yourpassword@localhost:5432/bockone'

# AWS credentials – only needed for profile photo upload
# Leave blank to skip S3 integration during local development
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
CLOUDFRONT_URL=
</pre>

<h3>4. Create the local database</h3>
<pre>
# Connect to your local PostgreSQL
psql -U postgres

# Inside psql:
CREATE DATABASE bockone;
\c bockone

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
\q
</pre>

<h3>5. Start the server</h3>
<pre>
# Standard start
npm start

# Development mode with auto-restart on file changes (Node.js ≥ 18)
npm run dev
</pre>

<p>You should see:</p>
<pre>
Server running on port 3000
</pre>

<h3>6. Test the API locally</h3>
<p>With the server running, use <code>curl</code> or any REST client (Postman, Insomnia):</p>
<pre>
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret","firstName":"Alice","lastName":"Smith","dob":"1990-01-01","gender":"female","hexId":"abc123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret"}'

# Get profile
curl http://localhost:3000/api/profile/alice
</pre>

<h3>7. Run automated tests</h3>
<p>Tests use Jest + Supertest with mocked database and S3 – <strong>no real database or AWS credentials required</strong>.</p>
<pre>
npm test
</pre>
<p>Expected output:</p>
<pre>
Test Suites: 2 passed, 2 total
Tests:       18 passed, 18 total
</pre>

<hr>

<h2>📦 Production Deployment Prerequisites</h2>
<ul>
  <li>AWS Account</li>
  <li>Basic knowledge of EC2, RDS, S3</li>
  <li>SSH Key Pair for EC2</li>
  <li>PostgreSQL Credentials</li>
</ul>

<hr>

<h2>☁️ AWS Deployment Guide</h2>

<p align="center">
  Follow this guide to deploy using
  <strong>AWS S3 + CloudFront</strong>, <strong>RDS PostgreSQL</strong>, and <strong>EC2</strong>.
</p>

<hr>

<h2>📦 Prerequisites</h2>
<ul>
  <li>AWS Account</li>
  <li>Basic knowledge of EC2, RDS, S3</li>
  <li>SSH Key Pair for EC2</li>
  <li>PostgreSQL Credentials</li>
</ul>

<hr>

<h2>📌 Step 1: Create S3 Bucket with CloudFront</h2>
<ol>
  <li>Open <strong>AWS → S3</strong></li>
  <li>Create a new S3 bucket</li>
  <li>Upload your web assets (if needed)</li>
  <li>Open <strong>CloudFront</strong></li>
  <li>Create a new distribution and attach it to your S3 bucket</li>
  <li>Copy the CloudFront Distribution URL (used for frontend)</li>
</ol>

<hr>

<h2>📌 Step 2: Create RDS PostgreSQL Instance</h2>
<ol>
  <li>Go to <strong>AWS → RDS</strong></li>
  <li>Create a new PostgreSQL instance</li>
  <li>Recommended:
      <ul>
        <li>Free Tier / t3.micro</li>
        <li>Latest supported PostgreSQL version</li>
      </ul>
  </li>
  <li>Save the following:
    <ul>
      <li><strong>RDS Endpoint</strong></li>
      <li><strong>Database Name</strong></li>
      <li><strong>Master Username</strong></li>
      <li><strong>Password</strong></li>
    </ul>
  </li>
</ol>

<hr>

<h2>📌 Step 3: Launch EC2 Instance & Connect</h2>
<ol>
  <li>Create an <strong>Ubuntu 22.04</strong> EC2 instance</li>
  <li>Add inbound rules:
    <ul>
      <li>SSH (22)</li>
      <li>HTTP (80)</li>
    </ul>
  </li>
  <li>SSH into your EC2 instance:</li>
</ol>

<pre>
ssh -i "yourKey.pem" ubuntu@your-ec2-public-ip
</pre>

<hr>

<h2>📌 Step 4: Install Dependencies on EC2</h2>

<pre>
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y
git --version

# Clone repository
git clone https://github.com/BOCK-CHAIN/BockOneBackend.git

# Install Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Check versions
node -v
npm -v

# Install PostgreSQL client
sudo apt install postgresql-client -y
psql --version
</pre>

<hr>

<h2>📌 Step 5: Connect to RDS Database</h2>

<p>Replace &lt;USERNAME&gt;, &lt;PASSWORD&gt;, &lt;RDS-ENDPOINT&gt;, &lt;DBNAME&gt;:</p>

<pre>
psql "postgresql://&lt;USERNAME&gt;:&lt;PASSWORD&gt;@&lt;RDS-ENDPOINT&gt;:5432/&lt;DBNAME&gt;"
</pre>

<h3>Create Users Table:</h3>

<pre>
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
</pre>

<h3>Verify Tables:</h3>
<pre>
\dt
\d users
\q
</pre>

<hr>

<h2>📌 Step 6: Install Backend Dependencies</h2>

<pre>
cd BockOneBackend
npm install
</pre>

<hr>

<h2>📌 Step 7: Start Backend Server</h2>

<pre>
node server.js
</pre>

<p>If everything is correct, you should see:</p>

<pre>
Server running on port 3000
</pre>

<hr>

<h2>🎉 Deployment Complete</h2>
<p>Your backend is now running on EC2, connected to RDS, and ready for production use.</p>

<hr>

<h2>📡 API Reference</h2>

<table>
  <thead>
    <tr><th>Method</th><th>Path</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>POST</td><td>/api/auth/signup</td><td>Register a new user</td></tr>
    <tr><td>POST</td><td>/api/auth/login</td><td>Login with username + password</td></tr>
    <tr><td>POST</td><td>/api/auth/krysonixLogin</td><td>Login with hex ID + password</td></tr>
    <tr><td>POST</td><td>/api/auth/upload-photo</td><td>Upload profile photo to S3</td></tr>
    <tr><td>GET</td><td>/api/profile/:username</td><td>Get user profile by username</td></tr>
    <tr><td>GET</td><td>/api/profile/hex/:hex_id</td><td>Get user profile by hex ID</td></tr>
    <tr><td>PUT</td><td>/api/profile/:username</td><td>Update user profile (+ optional photo)</td></tr>
  </tbody>
</table>
