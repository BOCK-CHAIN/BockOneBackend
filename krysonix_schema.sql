CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  hex_id TEXT PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS follows (
  follower_hex_id TEXT NOT NULL REFERENCES users(hex_id) ON DELETE CASCADE,
  following_hex_id TEXT NOT NULL REFERENCES users(hex_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (follower_hex_id, following_hex_id)
);

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  categories TEXT[] NOT NULL DEFAULT '{}',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  owner_hex_id TEXT NOT NULL REFERENCES users(hex_id) ON DELETE CASCADE,
  likes INTEGER NOT NULL DEFAULT 0,
  dislikes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS video_likes (
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  user_hex_id TEXT NOT NULL REFERENCES users(hex_id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('like', 'dislike')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (video_id, user_hex_id)
);

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_owner_hex_id ON videos(owner_hex_id);
CREATE INDEX IF NOT EXISTS idx_comments_video_id ON comments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_likes_user_hex_id ON video_likes(user_hex_id);
