-- Comprehensive migration script for the updated ladder system
-- Run this in your Supabase SQL Editor
-- This handles: optional email, removed skill_level, and added position column

-- 1. Make email optional (remove NOT NULL constraint)
ALTER TABLE players ALTER COLUMN email DROP NOT NULL;

-- 2. Remove skill_level column (we're not using NTRP ratings anymore)
ALTER TABLE players DROP COLUMN IF EXISTS skill_level;

-- 3. Add position column if it doesn't exist
ALTER TABLE players ADD COLUMN IF NOT EXISTS position INTEGER;

-- 4. Initialize positions for existing players (if position is NULL)
-- Assign positions based on club_id, ordered by created_at
DO $$
DECLARE
  club_record RECORD;
  player_record RECORD;
  pos INTEGER;
BEGIN
  -- Loop through each club
  FOR club_record IN SELECT DISTINCT club_id FROM players WHERE club_id IS NOT NULL LOOP
    pos := 1;
    -- Assign positions to players in this club, ordered by created_at
    FOR player_record IN 
      SELECT id FROM players 
      WHERE club_id = club_record.club_id 
        AND (position IS NULL OR position = 0)
      ORDER BY created_at ASC
    LOOP
      UPDATE players SET position = pos WHERE id = player_record.id;
      pos := pos + 1;
    END LOOP;
  END LOOP;
  
  -- Handle players without club_id (if any)
  pos := 1;
  FOR player_record IN 
    SELECT id FROM players 
    WHERE club_id IS NULL 
      AND (position IS NULL OR position = 0)
    ORDER BY created_at ASC
  LOOP
    UPDATE players SET position = pos WHERE id = player_record.id;
    pos := pos + 1;
  END LOOP;
END $$;

-- 5. Create index for position column
CREATE INDEX IF NOT EXISTS idx_players_position ON players(club_id, position);

-- Note: The unique index on (club_id, email) already exists and allows multiple NULL emails
-- PostgreSQL unique indexes treat NULL values as distinct, so multiple NULLs are allowed

