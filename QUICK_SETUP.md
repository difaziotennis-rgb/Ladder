# 🚀 Quick Setup Guide

Since you've already created your Supabase account, follow these steps:

## Step 1: Create Your Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name**: Tennis Ladder (or any name you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"** (takes 1-2 minutes)

## Step 2: Set Up the Database

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase-schema.sql` in this project
4. Copy **ALL** the contents (Ctrl+A, Ctrl+C / Cmd+A, Cmd+C)
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
7. You should see "Success. No rows returned"

## Step 3: Get Your Credentials

1. In Supabase, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** under Project Settings
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 4: Create Environment File

**Option A: I can do it for you** - Just provide me:
- Your Supabase Project URL
- Your Supabase anon/public key

**Option B: Do it yourself:**
1. Create a file named `.env.local` in the project root
2. Add these two lines (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 5: Verify Setup

Run this command to verify everything is set up correctly:

```bash
npm run verify
```

## Step 6: Start the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎾

## Step 7: Add Test Data (Optional)

You can add players directly in Supabase:

1. Go to **Table Editor** > **players**
2. Click **Insert** > **Insert row**
3. Add:
   - `name`: "John Doe"
   - `email`: "john@example.com"  
   - `skill_level`: "4.0"
   - `ranking_points`: 1000

Or use SQL Editor:

```sql
INSERT INTO players (name, email, skill_level, ranking_points) VALUES
('John Doe', 'john@example.com', '4.0', 1000),
('Jane Smith', 'jane@example.com', '4.5', 1200),
('Bob Johnson', 'bob@example.com', '3.5', 900);
```

---

## Need Help?

If you get stuck, share your Supabase Project URL and anon key with me, and I'll set up the `.env.local` file for you!

