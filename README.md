<h1>🚀 Krysonix Backend Deployment Guide</h1>

<p>Follow the steps below to deploy the Krysonix backend successfully.</p>

<hr>

<h2>📌 Step 1: Clone the Repository</h2>
<pre>
git clone &lt;repo&gt;
</pre>

<hr>

<h2>📌 Step 2: Install Node Modules</h2>
<pre>
npm install
</pre>

<hr>

<h2>📌 Step 3: Add <code>.env</code> File</h2>

<p>Create a <code>.env</code> file in the root directory and add the following:</p>

<pre>
DATABASE_URL=' '

PORT=5000

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

CLOUDFRONT_URL=
</pre>

<hr>

<h2>📌 Step 4: Set Up S3 Bucket & CloudFront</h2>
<ul>
  <li>Create an AWS S3 bucket.</li>
  <li>Enable public access OR set correct bucket policies.</li>
  <li>Integrate the bucket with AWS CloudFront for CDN delivery.</li>
  <li>Update the CloudFront URL in <code>.env</code>.</li>
</ul>

<hr>

<h2>📌 Step 5: Create Neon PostgreSQL Database</h2>

<p>Use <strong>Neon PostgreSQL</strong> to create a new database. Copy the connection string into <code>DATABASE_URL</code> inside <code>.env</code>.</p>

<hr>

<h2>📌 Step 6: Create the Required Tables</h2>

<p>Run the following SQL commands to create the schema:</p>

<pre>
-- ===============================
-- TABLE: videos
-- ===============================

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    categories TEXT[],
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    owner_hex_id VARCHAR(100),
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- TABLE: comments
-- ===============================

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL,
    username VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comments_video
        FOREIGN KEY (video_id)
        REFERENCES videos(id)
        ON DELETE CASCADE
);

-- ===============================
-- TABLE: video_likes
-- (Tracks who liked/disliked each video)
-- ===============================

CREATE TABLE video_likes (
    id SERIAL PRIMARY KEY,
    user_hex_id VARCHAR(100) NOT NULL,
    video_id INTEGER NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('like', 'dislike')),

    CONSTRAINT fk_likes_video
        FOREIGN KEY (video_id)
        REFERENCES videos(id)
        ON DELETE CASCADE
);

-- ===============================
-- TABLE: follows
-- (Users can follow other channels)
-- ===============================

CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    follower_hex_id VARCHAR(100) NOT NULL,
    following_hex_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_follow UNIQUE (follower_hex_id, following_hex_id)
);
</pre>

<hr>

<h2>📌 Step 7: Update <code>.env</code> with All Correct Values</h2>

<p>Make sure your database URL, AWS keys, bucket name, region, and CloudFront URL are correctly filled.</p>

<hr>

<h2>📌 Step 8: Start the Server</h2>
<pre>
node server.js
</pre>

<p>🎉 Your Krysonix backend is now running!</p>

<hr>

<h3>👨‍💻 Need help?</h3>
<p>Feel free to reach out anytime for deployment or debugging support.</p>
