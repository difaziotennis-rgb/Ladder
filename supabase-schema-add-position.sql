-- Migration script to add position column to players table
-- Run this in your Supabase SQL Editor

-- Add position column to players table
ALTER TABLE players ADD COLUMN IF NOT EXISTS position INTEGER;

-- Initialize positions for existing players
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
    ORDER BY created_at ASC
  LOOP
    UPDATE players SET position = pos WHERE id = player_record.id;
    pos := pos + 1;
  END LOOP;
END $$;

-- Create index for position column
CREATE INDEX IF NOT EXISTS idx_players_position ON players(club_id, position);

