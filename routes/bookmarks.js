import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import supabase from '../utils/auth.js';
import { pool } from '../utils/db.js';

const router = express.Router();

/**
 * POST /api/bookmarks/:postId
 * Toggle bookmark on a post
 * Requires authentication
 */
router.post('/:postId', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    if (!postId || typeof postId !== 'string') {
      return res.status(400).json({
        error: 'Invalid post ID',
        message: 'Post ID is required'
      });
    }

    // Check if post exists
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post does not exist'
      });
    }

    // Check if already bookmarked
    const { data: existingBookmark, error: bookmarkError } = await supabase
      .from('bookmarks')
      .select()
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (bookmarkError) {
      console.error('❌ Bookmark check error:', bookmarkError);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to check bookmark status'
      });
    }

    let isBookmarked;

    if (existingBookmark) {
      // Remove bookmark
      const { error: deleteError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (deleteError) {
        console.error('❌ Remove bookmark error:', deleteError);
        return res.status(500).json({
          error: 'Database error',
          message: 'Failed to remove bookmark'
        });
      }

      isBookmarked = false;
    } else {
      // Add bookmark
      const { error: insertError } = await supabase
        .from('bookmarks')
        .insert({
          post_id: postId,
          user_id: userId,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('❌ Add bookmark error:', insertError);
        return res.status(500).json({
          error: 'Database error',
          message: 'Failed to add bookmark'
        });
      }

      isBookmarked = true;
    }

    res.json({
      message: isBookmarked ? 'Post bookmarked successfully' : 'Bookmark removed successfully',
      is_bookmarked: isBookmarked
    });
  } catch (error) {
    console.error('❌ Bookmark toggle endpoint error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to toggle bookmark'
    });
  }
});

/**
 * GET /api/bookmarks/instagram
 * Get user's Instagram bookmarks
 * Requires authentication
 */
router.get('/instagram', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = parseInt(req.query.offset) || 0;

    const { rows } = await pool.query(`
      SELECT p.id, p.user_id, p.caption, p.media_url, p.media_type,
             p.image_url, p.video_url, p.post_type, p.likes_count,
             p.comments_count, p.created_at,
             pr.username, pr.profile_image_url
      FROM bookmarks b
      JOIN posts p ON p.id = b.post_id AND p.post_type = 'instagram'
      LEFT JOIN profiles pr ON pr.id = p.user_id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

    const posts = rows.map(r => ({
      id: r.id,
      user_id: r.user_id || '',
      username: r.username || 'Unknown',
      profile_image_url: r.profile_image_url || null,
      caption: r.caption || '',
      image_url: r.media_type === 'video' ? null : (r.media_url || r.image_url || null),
      video_url: r.media_type === 'video' ? r.media_url : (r.video_url || null),
      post_type: 'instagram',
      likes_count: r.likes_count || 0,
      comments_count: r.comments_count || 0,
      is_liked: false,
      is_bookmarked: true,
      created_at: r.created_at,
      updated_at: r.created_at
    }));

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*) FROM bookmarks b JOIN posts p ON p.id = b.post_id AND p.post_type = 'instagram' WHERE b.user_id = $1`,
      [userId]
    );

    res.json({
      posts,
      pagination: { limit, offset, total_count: parseInt(countRows[0].count), has_more: posts.length === limit }
    });
  } catch (error) {
    console.error('❌ Instagram bookmarks endpoint error:', error);
    res.status(500).json({ error: 'Internal server error', message: 'Failed to fetch Instagram bookmarks' });
  }
});

/**
 * GET /api/bookmarks/twitter
 * Get user's Twitter bookmarks
 * Requires authentication
 */
router.get('/twitter', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = parseInt(req.query.offset) || 0;

    const { rows } = await pool.query(`
      SELECT p.id, p.user_id, p.caption, p.media_url, p.media_type,
             p.image_url, p.video_url, p.post_type, p.likes_count,
             p.comments_count, p.created_at,
             pr.username, pr.profile_image_url
      FROM bookmarks b
      JOIN posts p ON p.id = b.post_id AND p.post_type = 'twitter'
      LEFT JOIN profiles pr ON pr.id = p.user_id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

    const posts = rows.map(r => ({
      id: r.id,
      user_id: r.user_id || '',
      username: r.username || 'Unknown',
      profile_image_url: r.profile_image_url || null,
      caption: r.caption || '',
      image_url: r.media_type === 'video' ? null : (r.media_url || r.image_url || null),
      video_url: r.media_type === 'video' ? r.media_url : (r.video_url || null),
      post_type: 'twitter',
      likes_count: r.likes_count || 0,
      comments_count: r.comments_count || 0,
      is_liked: false,
      is_bookmarked: true,
      created_at: r.created_at,
      updated_at: r.created_at
    }));

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*) FROM bookmarks b JOIN posts p ON p.id = b.post_id AND p.post_type = 'twitter' WHERE b.user_id = $1`,
      [userId]
    );

    res.json({
      posts,
      pagination: { limit, offset, total_count: parseInt(countRows[0].count), has_more: posts.length === limit }
    });
  } catch (error) {
    console.error('❌ Twitter bookmarks endpoint error:', error);
    res.status(500).json({ error: 'Internal server error', message: 'Failed to fetch Twitter bookmarks' });
  }
});

export default router;