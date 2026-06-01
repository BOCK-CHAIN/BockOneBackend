-- =====================================================
-- BOCKSHEETS DATABASE SCHEMA - AWS POSTGRESQL
-- Simplified version without Supabase RLS
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- For password hashing

-- =====================================================
-- 1. PROFILES TABLE (User accounts)
-- =====================================================
CREATE TABLE public.profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,  -- Store bcrypt hashed passwords
    full_name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. SPREADSHEETS TABLE
-- =====================================================
CREATE TABLE public.spreadsheets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Spreadsheet',
    description TEXT,
    row_count INTEGER DEFAULT 100 CHECK (row_count > 0 AND row_count <= 1000),
    column_count INTEGER DEFAULT 26 CHECK (column_count > 0 AND column_count <= 100),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. CELLS TABLE (stores cell data)
-- =====================================================
CREATE TABLE public.cells (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    spreadsheet_id UUID REFERENCES public.spreadsheets(id) ON DELETE CASCADE NOT NULL,
    row_index INTEGER NOT NULL CHECK (row_index >= 0),
    column_index INTEGER NOT NULL CHECK (column_index >= 0),
    
    -- Cell content
    value TEXT,
    display_value TEXT,
    data_type VARCHAR(20) DEFAULT 'text' CHECK (data_type IN ('text', 'number', 'date', 'formula', 'boolean')),
    
    -- Formula support
    formula TEXT,
    
    -- Formatting
    font_weight VARCHAR(20) DEFAULT 'normal' CHECK (font_weight IN ('normal', 'bold')),
    font_style VARCHAR(20) DEFAULT 'normal' CHECK (font_style IN ('normal', 'italic')),
    text_decoration VARCHAR(20) DEFAULT 'none' CHECK (text_decoration IN ('none', 'underline')),
    text_align VARCHAR(20) DEFAULT 'left' CHECK (text_align IN ('left', 'center', 'right')),
    background_color VARCHAR(7) DEFAULT '#FFFFFF',
    font_color VARCHAR(7) DEFAULT '#000000',
    font_size INTEGER DEFAULT 12 CHECK (font_size >= 8 AND font_size <= 72),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique cell position per spreadsheet
    UNIQUE(spreadsheet_id, row_index, column_index)
);

-- =====================================================
-- 4. COLUMN_SETTINGS TABLE
-- =====================================================
CREATE TABLE public.column_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    spreadsheet_id UUID REFERENCES public.spreadsheets(id) ON DELETE CASCADE NOT NULL,
    column_index INTEGER NOT NULL CHECK (column_index >= 0),
    width INTEGER DEFAULT 100 CHECK (width >= 50 AND width <= 500),
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(spreadsheet_id, column_index)
);

-- =====================================================
-- 5. ROW_SETTINGS TABLE
-- =====================================================
CREATE TABLE public.row_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    spreadsheet_id UUID REFERENCES public.spreadsheets(id) ON DELETE CASCADE NOT NULL,
    row_index INTEGER NOT NULL CHECK (row_index >= 0),
    height INTEGER DEFAULT 25 CHECK (height >= 20 AND height <= 200),
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(spreadsheet_id, row_index)
);

-- =====================================================
-- 6. SHARE_LINKS TABLE
-- =====================================================
CREATE TABLE public.share_links (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    spreadsheet_id UUID REFERENCES public.spreadsheets(id) ON DELETE CASCADE NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    share_token VARCHAR(64) UNIQUE NOT NULL,
    permission_level VARCHAR(20) DEFAULT 'view' CHECK (permission_level IN ('view', 'edit')),
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- 7. COLLABORATORS TABLE
-- =====================================================
CREATE TABLE public.collaborators (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    spreadsheet_id UUID REFERENCES public.spreadsheets(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    permission_level VARCHAR(20) DEFAULT 'view' CHECK (permission_level IN ('view', 'edit', 'admin')),
    invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(spreadsheet_id, user_id)
);

-- =====================================================
-- 8. ACTIVITY_LOG TABLE
-- =====================================================
CREATE TABLE public.activity_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    spreadsheet_id UUID REFERENCES public.spreadsheets(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. AUTO-UPDATE TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spreadsheets_updated_at 
    BEFORE UPDATE ON public.spreadsheets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cells_updated_at 
    BEFORE UPDATE ON public.cells
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_column_settings_updated_at 
    BEFORE UPDATE ON public.column_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_row_settings_updated_at 
    BEFORE UPDATE ON public.row_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.share_token IS NULL THEN
        NEW.share_token = encode(gen_random_bytes(32), 'hex');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_share_token_trigger 
    BEFORE INSERT ON public.share_links
    FOR EACH ROW EXECUTE FUNCTION generate_share_token();

-- =====================================================
-- 10. HELPER VIEW (same as before)
-- =====================================================
CREATE OR REPLACE VIEW spreadsheet_list_view AS
SELECT 
    s.id,
    s.title,
    s.description,
    s.owner_id,
    p.username as owner_username,
    s.created_at,
    s.updated_at,
    s.last_accessed_at,
    (SELECT COUNT(*) FROM public.cells WHERE spreadsheet_id = s.id) as cell_count,
    (SELECT COUNT(*) FROM public.collaborators WHERE spreadsheet_id = s.id) as collaborator_count
FROM public.spreadsheets s
JOIN public.profiles p ON s.owner_id = p.id
WHERE s.is_deleted = FALSE;

-- =====================================================
-- 11. AUTHENTICATION HELPER FUNCTIONS
-- =====================================================

-- Function to create a new user
CREATE OR REPLACE FUNCTION create_user(
    p_username VARCHAR,
    p_email VARCHAR,
    p_password TEXT,
    p_full_name VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_user_id UUID;
    v_password_hash TEXT;
BEGIN
    -- Hash password (Note: In production, hash password in your backend!)
    v_password_hash := crypt(p_password, gen_salt('bf', 10));
    
    -- Insert user
    INSERT INTO public.profiles (username, email, password_hash, full_name)
    VALUES (p_username, p_email, v_password_hash, p_full_name)
    RETURNING id INTO v_user_id;
    
    RETURN v_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to verify user login
CREATE OR REPLACE FUNCTION verify_user_login(
    p_email VARCHAR,
    p_password TEXT
)
RETURNS TABLE(user_id UUID, username VARCHAR, email VARCHAR, full_name VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.username,
        p.email,
        p.full_name
    FROM public.profiles p
    WHERE p.email = p_email
    AND p.password_hash = crypt(p_password, p.password_hash);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 12. SEED DATA (Optional - for testing)
-- =====================================================

-- Create a test user
-- Password: 'test123' (in production, never store plain passwords!)
-- SELECT create_user('testuser', 'test@example.com', 'test123', 'Test User');

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '✅ BockSheets database schema created successfully!';
    RAISE NOTICE '📊 Tables created: profiles, spreadsheets, cells, column_settings, row_settings, share_links, collaborators, activity_log';
    RAISE NOTICE '🔧 All triggers and functions are in place';
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  IMPORTANT: This schema does NOT have Row Level Security (RLS)';
    RAISE NOTICE '🔒 Implement authentication and authorization in your backend API!';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Next steps:';
    RAISE NOTICE '   1. Update your Flutter app to point to your backend API';
    RAISE NOTICE '   2. Implement JWT-based authentication in your API';
    RAISE NOTICE '   3. Add API endpoints for all database operations';
END $$;