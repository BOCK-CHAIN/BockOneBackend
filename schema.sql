-- ================================================================
-- Ruviel Backend — Supabase Schema
-- Run this in Supabase SQL Editor:
--   https://supabase.com/dashboard/project/brlfbxmuxlmrogkziuqw/sql
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ────────────────────────────────────────────────────────────────
-- USERS  (custom auth table, NOT supabase.auth.users)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- PROFILES
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  email               TEXT,
  username            TEXT UNIQUE,
  full_name           TEXT,
  bio                 TEXT,
  profile_image_url   TEXT,
  followers_count     INTEGER DEFAULT 0,
  following_count     INTEGER DEFAULT 0,
  posts_count         INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- POSTS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  caption         TEXT,
  image_url       TEXT,
  video_url       TEXT,
  post_type       TEXT DEFAULT 'instagram', -- 'instagram' | 'twitter'
  likes_count     INTEGER DEFAULT 0,
  comments_count  INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- LIKES
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.likes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, post_id)
);

-- ────────────────────────────────────────────────────────────────
-- COMMENTS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- FOLLOWS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.follows (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id   UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  following_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (follower_id, following_id)
);

-- ────────────────────────────────────────────────────────────────
-- MESSAGES
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message      TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  read_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- STORIES
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.stories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  image_url   TEXT,
  video_url   TEXT,
  expires_at  TIMESTAMPTZ DEFAULT (now() + INTERVAL '24 hours'),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- REELS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reels (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  video_url      TEXT NOT NULL,
  caption        TEXT,
  likes_count    INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.reel_likes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reel_id    UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, reel_id)
);

CREATE TABLE IF NOT EXISTS public.reel_comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reel_id    UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- BOOKMARKS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, post_id)
);

-- ────────────────────────────────────────────────────────────────
-- ACTIVITIES  (notifications/feed)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activities (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  actor_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,   -- 'like' | 'comment' | 'follow' | 'mention'
  post_id       UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  message       TEXT,
  is_read       BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────
-- Disable RLS so the service-role key works without policies
-- ────────────────────────────────────────────────────────────────
ALTER TABLE public.users       DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles    DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts       DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes       DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments    DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows     DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages    DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories     DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels       DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reel_likes  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reel_comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks   DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities  DISABLE ROW LEVEL SECURITY;
