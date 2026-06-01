import express from 'express';
import crypto from 'crypto';
import { requireAuth, optionalJWT } from '../middleware/auth.js';
import supabase from '../utils/auth.js';
import { ensureProfileExists, getProfilesByIds } from '../utils/profile.js';

const router = express.Router();

const postsBucket = 'posts';

function decodeBase64(data) {
  // Supports both raw base64 and data URLs: data:image/jpeg;base64,XXXX
  const parts = data.split(',');
  const base64 = parts.length > 1 ? parts[1] : parts[0];
  return Buffer.from(base64, 'base64');
}

function mapPost(post, profile, isLiked = false) {
  // Support both new (media_url/media_type) and legacy (image_url/video_url) column names
  const isVideo = (post.media_type || (post.video_url ? 'video' : null)) === 'video';
  const imageUrl = post.image_url || (isVideo ? null : (post.media_url || null));
  const videoUrl = post.video_url || (isVideo ? (post.media_url || null) : null);

  return {
    id: post.id,
    user_id: post.user_id,
    username: profile?.username || 'Unknown',
    profile_image_url: profile?.profile_image_url || null,
    caption: post.caption,
    image_url: imageUrl,
    video_url: videoUrl,
    post_type: post.post_type || 'instagram',
    likes_count: post.likes_count || 0,
    comments_count: post.comments_count || 0,
    is_liked: isLiked,
    created_at: post.created_at,
    updated_at: post.updated_at,
  };
}

/**
 * GET /api/posts
 * Fetch posts for feed (paginated)
 * Supports optional authentication for personalized data
 * Query params: limit, offset, post_type
 */
router.get('/', optionalJWT, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50); // Max 50 posts
    const offset = parseInt(req.query.offset) || 0;
    const postType = req.query.post_type; // 'instagram', 'twitter', or undefined for all
    const userId = req.userId;

    // Build query
    let query = supabase.from('posts').select('*');

    // Filter by post type if specified
    if (postType && ['instagram', 'twitter'].includes(postType)) {
      query = query.eq('post_type', postType);
    }

    // Execute query with pagination
    const { data: posts, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Posts fetch error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to fetch posts'
      });
    }

    // Process posts to add like status and counts
    const profiles = await getProfilesByIds((posts || []).map((post) => post.user_id));
    const processedPosts = (posts || []).map((post) =>
      mapPost(post, profiles.get(post.user_id), false),
    );

    res.json({
      posts: processedPosts,
      pagination: {
        limit,
        offset,
        has_more: processedPosts.length === limit
      }
    });
  } catch (error) {
    console.error('❌ Posts endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch posts'
    });
  }
});

/**
 * GET /api/posts/user/:id
 * Fetch posts for a specific user
 * Query params: limit, offset, post_type
 */
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = parseInt(req.query.offset) || 0;
    const postType = req.query.post_type;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        error: 'Invalid user ID',
        message: 'User ID must be a valid UUID'
      });
    }

    // Build query
    let query = supabase.from('posts').select('*').eq('user_id', id);

    // Filter by post type if specified
    if (postType && ['instagram', 'twitter'].includes(postType)) {
      query = query.eq('post_type', postType);
    }

    const { data: posts, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ User posts fetch error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to fetch user posts'
      });
    }

    // Process posts (similar to feed endpoint)
    const profiles = await getProfilesByIds((posts || []).map((post) => post.user_id));
    const processedPosts = (posts || []).map((post) =>
      mapPost(post, profiles.get(post.user_id), false),
    );

    res.json({
      posts: processedPosts,
      pagination: {
        limit,
        offset,
        has_more: processedPosts.length === limit
      }
    });
  } catch (error) {
    console.error('❌ User posts endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user posts'
    });
  }
});

/**
 * POST /api/posts
 * Create a new post
 * Requires authentication
 */
router.post('/', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const {
      caption,
      post_type = 'instagram',
      imageBase64,
      videoBase64,
    } = req.body;

    // Validate required fields
    if (!caption && !imageBase64 && !videoBase64) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Post must have at least caption, image, or video'
      });
    }

    // Validate post type
    if (!['instagram', 'twitter'].includes(post_type)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'post_type must be either "instagram" or "twitter"'
      });
    }

    const profile = await ensureProfileExists({
      userId,
      email: req.user?.email,
    });

    let finalMediaUrl = null;
    let finalMediaType = null;

    // Upload media if base64 provided
    if (typeof imageBase64 === 'string' && imageBase64.trim().length > 0) {
      const bytes = decodeBase64(imageBase64.trim());
      const fileName = `post_${Date.now()}_${userId}.jpg`;
      const storagePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(postsBucket)
        .upload(storagePath, bytes, {
          upsert: true,
          contentType: 'image/jpeg'
        });

      if (uploadError) {
        console.error('❌ Post image upload error:', uploadError);
        return res.status(500).json({
          error: 'Storage error',
          message: 'Failed to upload post image'
        });
      }

      finalMediaUrl = supabase.storage.from(postsBucket).getPublicUrl(storagePath).data.publicUrl;
      finalMediaType = 'image';
    }

    if (typeof videoBase64 === 'string' && videoBase64.trim().length > 0) {
      const bytes = decodeBase64(videoBase64.trim());
      const fileName = `post_${Date.now()}_${userId}.mp4`;
      const storagePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(postsBucket)
        .upload(storagePath, bytes, {
          upsert: true,
          contentType: 'video/mp4'
        });

      if (uploadError) {
        console.error('❌ Post video upload error:', uploadError);
        return res.status(500).json({
          error: 'Storage error',
          message: 'Failed to upload post video'
        });
      }

      finalMediaUrl = supabase.storage.from(postsBucket).getPublicUrl(storagePath).data.publicUrl;
      finalMediaType = 'video';
    }

    // Generate post ID
    const postId = crypto.randomUUID();

    // Create post — write to both column sets for schema compatibility
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        id: postId,
        user_id: userId,
        caption: caption || null,
        image_url: finalMediaType === 'image' ? finalMediaUrl : null,
        video_url: finalMediaType === 'video' ? finalMediaUrl : null,
        media_url: finalMediaUrl,
        media_type: finalMediaType,
        post_type: post_type,
        likes_count: 0,
        comments_count: 0,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Post creation error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to create post'
      });
    }

    res.status(201).json({
      message: 'Post created successfully',
      post: mapPost(post, profile, false),
    });
  } catch (error) {
    console.error('❌ Post creation endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create post'
    });
  }
});

/**
 * DELETE /api/posts/:id
 * Delete a post (only by owner)
 * Requires authentication
 */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // First verify ownership
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id, media_url')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post does not exist'
      });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete your own posts'
      });
    }

    // Delete post (cascading will handle likes and comments)
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Post deletion error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to delete post'
      });
    }

    // TODO: Delete media from storage if media_url exists
    // This would require extracting the storage path from the URL

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('❌ Post deletion endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete post'
    });
  }
});

export default router;
