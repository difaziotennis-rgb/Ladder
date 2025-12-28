-- Add slug column to clubs table for URL-friendly names
-- Run this AFTER the multiclub migration

ALTER TABLE clubs ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_clubs_slug ON clubs(slug);

-- Generate slugs from existing club names (if any)
-- This converts "Country Club Tennis" to "country-club-tennis"
UPDATE clubs 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Make slug required for new clubs (we'll handle this in the app)

