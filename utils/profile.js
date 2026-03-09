import supabase from './auth.js';

const PROFILE_COLUMNS =
  'id, email, username, full_name, bio, profile_image_url, followers_count, following_count, posts_count, created_at, updated_at';

function sanitizeUsername(value) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function defaultUsername(email, userId) {
  const localPart = (email || 'user').split('@')[0];
  const base = sanitizeUsername(localPart) || 'user';
  const suffix = (userId || '')
    .toString()
    .replace(/-/g, '')
    .slice(0, 8);
  return `${base.slice(0, 20)}_${suffix || 'user'}`;
}

export async function ensureProfileExists({
  userId,
  email,
  fullName = null,
}) {
  const { data: existing, error: fetchError } = await supabase
    .from('profiles')
    .select(PROFILE_COLUMNS)
    .eq('id', userId)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  if (existing) {
    return existing;
  }

  const profilePayload = {
    id: userId,
    email: email || `${userId}@local.invalid`,
    username: defaultUsername(email, userId),
    full_name: fullName,
    bio: null,
    followers_count: 0,
    following_count: 0,
    posts_count: 0,
    updated_at: new Date().toISOString(),
  };

  const { data: created, error: createError } = await supabase
    .from('profiles')
    .insert(profilePayload)
    .select(PROFILE_COLUMNS)
    .single();

  if (createError) {
    // Handle concurrent first-login/profile requests racing to create profile.
    if (createError.code === '23505') {
      const { data: racedProfile, error: raceFetchError } = await supabase
        .from('profiles')
        .select(PROFILE_COLUMNS)
        .eq('id', userId)
        .maybeSingle();
      if (!raceFetchError && racedProfile) {
        return racedProfile;
      }
    }
    throw createError;
  }

  return created;
}
