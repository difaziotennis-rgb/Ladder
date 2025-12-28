-- Create site_admin table for site-wide admin authentication
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL, -- Store bcrypt hash
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_admin ENABLE ROW LEVEL SECURITY;

-- Allow all operations (we'll handle auth in the app)
CREATE POLICY "Allow all operations on site_admin" ON site_admin
  FOR ALL USING (true) WITH CHECK (true);

-- Create a default admin (password: admin123 - CHANGE THIS!)
-- You can generate a proper hash later, but for now we'll use a simple approach
-- In production, use bcrypt to hash passwords

