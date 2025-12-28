-- Set all club admin passwords to "admin"
-- Run this in your Supabase SQL Editor

-- First, add the column if it doesn't exist
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS admin_password_hash TEXT;

-- Set password hash for "admin" password
-- This hash is for the password: admin
UPDATE clubs 
SET admin_password_hash = '$2b$10$Ogi3eJ6SP/CXnkZLm9SfDuoAa9Nj/ocS4Qm0BFiY95DOLArZMxHLW'
WHERE admin_password_hash IS NULL;

-- Verify
SELECT name, 
       CASE 
         WHEN admin_password_hash IS NOT NULL THEN 'Password set'
         ELSE 'No password'
       END as password_status
FROM clubs;

