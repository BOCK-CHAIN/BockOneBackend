<h1 align="center">🚀 Bock One Backend – Deployment Guide</h1>

<p align="center">
  Follow this guide to deploy the Bock One Backend using 
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
psql "postgresql://<USERNAME>:<PASSWORD>@<RDS-ENDPOINT>:5432/<DBNAME>"
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

<p align="center"><strong>Need a frontend deployment guide or docker setup? I can generate that too.</strong></p>
