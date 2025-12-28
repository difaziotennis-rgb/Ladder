-- Add club admin password to clubs table
-- Run this in your Supabase SQL Editor

ALTER TABLE clubs ADD COLUMN IF NOT EXISTS admin_password_hash TEXT;

-- Set a default password for existing clubs (password: admin)
-- You can change this later via the admin panel
UPDATE clubs 
SET admin_password_hash = '$2b$10$Ec0USp6oZbd/jHk5OhrjVOOuqcaEzJLR6H0l83Y2Diwj.hqxl9BZO'
WHERE admin_password_hash IS NULL;

