# Database Migration Instructions

## Step-by-Step Guide

1. **Go to your Supabase Dashboard**
   - Open https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query" button (top right)

3. **Paste the SQL**
   - Copy the entire contents of `supabase-schema-multiclub.sql`
   - Paste it into the new query window
   - **Important**: Paste it in a NEW query window, not underneath old code

4. **Run the Migration**
   - Click the "Run" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for "Success" message

5. **Verify**
   - Go to "Table Editor" in the left sidebar
   - You should now see a "clubs" table
   - The "players" and "matches" tables should have a "club_id" column

## What This Migration Does

- Creates a `clubs` table for multi-club support
- Adds `club_id` to `players` and `matches` tables
- Creates a default club called "Default Club"
- Migrates any existing players/matches to the default club
- Sets up proper indexes and constraints

## After Migration

Once the migration is complete, you can:
- Go to `/admin` in your app to create new clubs
- Players can select a club and add themselves
- Each club will have its own isolated ladder

