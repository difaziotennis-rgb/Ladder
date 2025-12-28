# Site Admin Setup Guide

## Step 1: Run Database Migration

Run this SQL in your Supabase SQL Editor:

```sql
-- Create site_admin table for site-wide admin authentication
CREATE TABLE IF NOT EXISTS site_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL, -- Store bcrypt hash
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_admin ENABLE ROW LEVEL SECURITY;

-- Allow all operations (we'll handle auth in the app)
CREATE POLICY "Allow all operations on site_admin" ON site_admin
  FOR ALL USING (true) WITH CHECK (true);
```

## Step 2: Create Your First Site Admin

Run this command in your terminal:

```bash
cd /Users/derek/new-website
node scripts/create-site-admin.js admin yourpassword123
```

Replace:
- `admin` with your desired username
- `yourpassword123` with your desired password

## Step 3: Login

1. Go to the home page
2. Click "Site Admin Login"
3. Enter your username and password
4. You'll now see the "Create New Club" button

## Features

- **Site Admin Login**: Only site admins can create new clubs
- **Protected Routes**: `/admin` page requires site admin authentication
- **Logout Button**: Available on home page and admin page
- **Session Management**: Login persists for 7 days

## Security Notes

- Passwords are hashed using bcrypt
- Sessions are stored in HTTP-only cookies
- Only site admins can access the club creation page

