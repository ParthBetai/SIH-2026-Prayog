-- ==============================================================================
-- PRAYOG: Government Innovation-Procurement Platform
-- Database Schema for User Signup and Signin Data (Supabase PostgreSQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM (
            'startup',
            'department_officer',
            'department_admin',
            'procurement_officer',
            'evaluator',
            'validator',
            'pmu',
            'public'
        );
    END IF;
END $$;

-- 3. USERS TABLE (Signup and Signin Profile Store)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    initials TEXT NOT NULL DEFAULT 'PR',
    role user_role NOT NULL DEFAULT 'startup',
    designation TEXT,
    department_id TEXT,
    department_name TEXT,
    startup_id TEXT,
    legal_name TEXT,
    trade_name TEXT,
    cin TEXT,
    state TEXT,
    dpiit_number TEXT,
    affiliation TEXT,
    expertise TEXT[] DEFAULT '{}'::TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    last_active_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_verified ON public.users(is_verified);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow public read of user profiles for directory & collaboration
CREATE POLICY "Allow read of user profiles"
    ON public.users FOR SELECT
    USING (true);

-- Allow authenticated users to update their own profile
CREATE POLICY "Allow individual user profile updates"
    ON public.users FOR UPDATE
    USING (auth.uid()::text = id OR auth.jwt() ->> 'sub' = id);

-- Allow insert during registration
CREATE POLICY "Allow insert during auth registration"
    ON public.users FOR INSERT
    WITH CHECK (true);
