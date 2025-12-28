-- Migration script to make email column optional in players table
-- Run this in your Supabase SQL Editor

-- Remove NOT NULL constraint from email column
ALTER TABLE players ALTER COLUMN email DROP NOT NULL;

-- Note: The unique index on (club_id, email) will automatically allow multiple NULL emails
-- PostgreSQL unique indexes treat NULL values as distinct, so multiple NULLs are allowed
-- This means multiple players in the same club can have NULL email addresses

