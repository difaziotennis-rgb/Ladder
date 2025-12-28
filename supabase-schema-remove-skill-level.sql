-- Migration script to remove skill_level column from players table
-- Run this in your Supabase SQL Editor

-- Option 1: Drop the column entirely (recommended since we're not using it)
ALTER TABLE players DROP COLUMN IF EXISTS skill_level;

-- Option 2: If you want to keep the column for historical data, make it nullable instead:
-- ALTER TABLE players ALTER COLUMN skill_level DROP NOT NULL;

