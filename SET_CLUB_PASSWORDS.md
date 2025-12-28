# Set All Club Admin Passwords to "admin"

## Quick Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Add the admin_password_hash column if it doesn't exist
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS admin_password_hash TEXT;

-- Set all club admin passwords to "admin"
UPDATE clubs 
SET admin_password_hash = '$2b$10$Ogi3eJ6SP/CXnkZLm9SfDuoAa9Nj/ocS4Qm0BFiY95DOLArZMxHLW'
WHERE admin_password_hash IS NULL;
```

This will:
- ✅ Add the `admin_password_hash` column to the clubs table
- ✅ Set all existing clubs' passwords to "admin"
- ✅ All new clubs created will automatically have password "admin"

## After Running SQL

All club admin passwords are now: **`admin`**

You can test by:
1. Going to any club page
2. Clicking "Club Admin"
3. Entering password: `admin`
4. You'll be redirected to the admin panel

## For New Clubs

When you create a new club (as site admin), it will automatically have the password "admin" set.

