-- Migration script to keep only "Rhinebeck Tennis Club"
-- Run this in your Supabase SQL Editor
-- WARNING: This will delete all clubs except "Rhinebeck Tennis Club"
-- Make sure to backup your data first if needed

-- First, ensure "Rhinebeck Tennis Club" exists (create it if it doesn't)
INSERT INTO clubs (name, slug, admin_password_hash)
VALUES (
  'Rhinebeck Tennis Club',
  'rhinebeck-tennis-club',
  '$2b$10$Ogi3eJ6SP/CXnkZLm9SfDuoAa9Nj/ocS4Qm0BFiY95DOLArZMxHLW' -- default "admin" password hash
)
ON CONFLICT (name) DO NOTHING
ON CONFLICT (slug) DO NOTHING;

-- Get the Rhinebeck Tennis Club ID
DO $$
DECLARE
  rhinebeck_id UUID;
BEGIN
  -- Find Rhinebeck Tennis Club (case-insensitive)
  SELECT id INTO rhinebeck_id
  FROM clubs
  WHERE LOWER(name) = LOWER('Rhinebeck Tennis Club')
  LIMIT 1;

  -- If Rhinebeck doesn't exist, create it
  IF rhinebeck_id IS NULL THEN
    INSERT INTO clubs (name, slug, admin_password_hash)
    VALUES (
      'Rhinebeck Tennis Club',
      'rhinebeck-tennis-club',
      '$2b$10$Ogi3eJ6SP/CXnkZLm9SfDuoAa9Nj/ocS4Qm0BFiY95DOLArZMxHLW'
    )
    RETURNING id INTO rhinebeck_id;
  END IF;

  -- Update all players to belong to Rhinebeck Tennis Club
  UPDATE players
  SET club_id = rhinebeck_id
  WHERE club_id IS NULL OR club_id != rhinebeck_id;

  -- Update all matches to belong to Rhinebeck Tennis Club
  UPDATE matches
  SET club_id = rhinebeck_id
  WHERE club_id IS NULL OR club_id != rhinebeck_id;

  -- Delete all clubs except Rhinebeck Tennis Club
  DELETE FROM clubs
  WHERE id != rhinebeck_id;
END $$;

