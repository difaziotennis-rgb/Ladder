-- Create Players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  skill_level TEXT NOT NULL, -- NTRP rating (e.g., "3.5", "4.0")
  ranking_points INTEGER NOT NULL DEFAULT 1000,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  winner_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  loser_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  score TEXT NOT NULL, -- e.g., "6-4, 6-2"
  date_played TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (winner_id != loser_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_ranking_points ON players(ranking_points DESC);
CREATE INDEX IF NOT EXISTS idx_matches_winner_id ON matches(winner_id);
CREATE INDEX IF NOT EXISTS idx_matches_loser_id ON matches(loser_id);
CREATE INDEX IF NOT EXISTS idx_matches_date_played ON matches(date_played DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist (for idempotency)
DROP TRIGGER IF EXISTS update_players_updated_at ON players;
DROP TRIGGER IF EXISTS update_matches_updated_at ON matches;

-- Create triggers for updated_at
CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON matches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Allow all operations on players" ON players;
DROP POLICY IF EXISTS "Allow all operations on matches" ON matches;

-- Create policies (adjust based on your auth requirements)
-- For now, allow all operations (you may want to restrict this)
CREATE POLICY "Allow all operations on players" ON players
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on matches" ON matches
  FOR ALL USING (true) WITH CHECK (true);

