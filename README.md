<h1 align="center">🚀 Bock One Backend – Deployment & Local Setup Guide</h1>

<p align="center">
  Follow this guide to run the Bock One Backend <strong>locally</strong> or to deploy it using
  <strong>AWS S3 + CloudFront</strong>, <strong>RDS PostgreSQL</strong>, and <strong>EC2</strong>.
</p>

<hr>

<h2>💻 Local Development Setup</h2>

<h3>Prerequisites</h3>
<ul>
  <li><a href="https://nodejs.org/">Node.js LTS</a></li>
  <li><a href="https://www.postgresql.org/">PostgreSQL</a> (local instance or a cloud DB)</li>
  <li>AWS credentials (or a local S3-compatible service like <a href="https://min.io/">MinIO</a>)</li>
  <li>Git</li>
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
<p>Copy <code>.env</code> and fill in your values:</p>
<pre>
DATABASE_URL='postgresql://&lt;USERNAME&gt;:&lt;PASSWORD&gt;@localhost:5432/&lt;DBNAME&gt;'

AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

CLOUDFRONT_URL=https://your-distribution.cloudfront.net
</pre>

<h3>4. Create the database table</h3>
<pre>
psql "postgresql://&lt;USERNAME&gt;:&lt;PASSWORD&gt;@localhost:5432/&lt;DBNAME&gt;"
</pre>
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
\q
</pre>

<h3>5. Start the server</h3>
<pre>
node server.js
</pre>
<p>The API will be available at <code>http://localhost:3000</code>.</p>

<hr>

<h2>📥 Downloading Files from Bock Drive to Your Local PC</h2>

<p>
  Bock Drive stores files in AWS S3. Use the <strong>/api/drive</strong> endpoints to list and
  download files directly to your local PC.
</p>

<h3>List files in Bock Drive</h3>
<pre>
GET /api/drive/list
GET /api/drive/list?prefix=profiles/
</pre>
<p>Returns a JSON array of file objects with <code>key</code>, <code>size</code>, and <code>lastModified</code> fields.</p>

<h3>Download a file to your local PC</h3>
<pre>
GET /api/drive/download?key=&lt;s3-object-key&gt;
</pre>
<p>
  The file is streamed directly to the caller as an attachment.<br>
  Example – download using <strong>curl</strong>:
</p>
<pre>
curl -OJ "http://localhost:3000/api/drive/download?key=profiles/1234567890_myfile.vala"
</pre>
<p>
  Example – download using <strong>wget</strong>:
</p>
<pre>
wget -O myfile.vala "http://localhost:3000/api/drive/download?key=profiles/1234567890_myfile.vala"
</pre>
<p>
  You can obtain the <code>key</code> value from the <code>/api/drive/list</code> endpoint or from
  the <code>key</code> field returned when a file was originally uploaded.
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

<p align="center"><strong>Need a frontend deployment guide or docker setup? I can generate that too.</strong></p>
