-- Migration script to add multi-club support
-- Run this in your Supabase SQL Editor

-- Create Clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add club_id to players table
ALTER TABLE players ADD COLUMN IF NOT EXISTS club_id UUID REFERENCES clubs(id) ON DELETE CASCADE;

-- Add club_id to matches (via players, but we'll track it for performance)
-- Actually, we can derive it from players, but let's add it for clarity
ALTER TABLE matches ADD COLUMN IF NOT EXISTS club_id UUID REFERENCES clubs(id) ON DELETE CASCADE;

-- Update existing players to have a default club (if any exist)
-- Create a default club first
INSERT INTO clubs (name) VALUES ('Default Club') ON CONFLICT (name) DO NOTHING;

-- Set default club for existing players
UPDATE players SET club_id = (SELECT id FROM clubs WHERE name = 'Default Club' LIMIT 1) WHERE club_id IS NULL;

-- Set default club for existing matches
UPDATE matches SET club_id = (
  SELECT p.club_id FROM players p WHERE p.id = matches.winner_id LIMIT 1
) WHERE club_id IS NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_club_id ON players(club_id);
CREATE INDEX IF NOT EXISTS idx_matches_club_id ON matches(club_id);
CREATE INDEX IF NOT EXISTS idx_players_club_email ON players(club_id, email);

-- Update unique constraint on email to be per-club
ALTER TABLE players DROP CONSTRAINT IF EXISTS players_email_key;
CREATE UNIQUE INDEX IF NOT EXISTS players_club_email_unique ON players(club_id, email);

-- Enable RLS on clubs
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations on clubs" ON clubs;

-- Create policies for clubs
CREATE POLICY "Allow all operations on clubs" ON clubs
  FOR ALL USING (true) WITH CHECK (true);

-- Update existing policies to be club-aware (optional, keeping permissive for now)
-- The existing policies already allow all operations

