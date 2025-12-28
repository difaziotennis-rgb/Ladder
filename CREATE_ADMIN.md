# Create Site Admin User

## Step 1: Create the Database Table

First, run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS site_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE site_admin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on site_admin" ON site_admin
  FOR ALL USING (true) WITH CHECK (true);
```

## Step 2: Create the Admin User

After running the SQL above, run this command:

```bash
cd /Users/derek/new-website
node scripts/create-site-admin.js derek admin
```

This will create:
- Username: `derek`
- Password: `admin`

## Alternative: Create via SQL (if script doesn't work)

If the script doesn't work, you can create the admin directly in Supabase:

1. Go to Supabase → SQL Editor
2. Run this (replace the hash with a bcrypt hash of "admin"):

```sql
-- First, generate a bcrypt hash for "admin" password
-- You can use an online bcrypt generator: https://bcrypt-generator.com/
-- Or use Node.js: require('bcryptjs').hashSync('admin', 10)

-- Example hash (this is for "admin" with salt rounds 10):
-- $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO site_admin (username, password_hash) VALUES 
('derek', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
```

**Note:** The hash above is just an example. Generate your own at https://bcrypt-generator.com/ with password "admin" and 10 salt rounds.

