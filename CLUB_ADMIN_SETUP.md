# Club Admin Setup Guide

## Step 1: Run Database Migration

Run this SQL in your Supabase SQL Editor to add the admin password column:

```sql
-- Add club admin password to clubs table
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS admin_password_hash TEXT;

-- Set default password for existing clubs (password: admin)
UPDATE clubs 
SET admin_password_hash = '$2b$10$Ec0USp6oZbd/jHk5OhrjVOOuqcaEzJLR6H0l83Y2Diwj.hqxl9BZO'
WHERE admin_password_hash IS NULL;
```

The default password hash above is for the password: `admin`

## Step 2: Set Passwords for Existing Clubs (Optional)

If you want to set passwords for all existing clubs, run:

```bash
cd /Users/derek/new-website
node scripts/set-club-passwords.js
```

This will set the password `admin` for all clubs that don't have a password yet.

## Step 3: Test Club Admin Login

1. Go to any club page (e.g., `/club/riverside-tennis-club`)
2. Click "Club Admin" button
3. Enter password: `admin`
4. You'll be redirected to the admin panel

## Club Admin Features

Once logged in, club admins can:

### Players Management
- ✅ View all players in their club
- ✅ Edit player details (name, email, NTRP rating, points, phone)
- ✅ Delete players
- ✅ Add new players
- ✅ Adjust ranking points directly

### Matches Management
- ✅ View all matches
- ✅ Edit match details (score, date, status)
- ✅ Delete matches
- ✅ Change match status (pending/verified)

## Security

- Each club has its own password
- Club admins can only access their own club's data
- Passwords are hashed using bcrypt
- Sessions are stored in HTTP-only cookies

## Changing Club Admin Password

To change a club's admin password, update the `admin_password_hash` in the `clubs` table with a new bcrypt hash.

