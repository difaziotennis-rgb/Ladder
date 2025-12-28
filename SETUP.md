# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** in your Supabase dashboard
4. Copy and paste the entire contents of `supabase-schema.sql` into the SQL editor
5. Click **Run** to create the tables

## 3. Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy your **anon/public key** (long string starting with `eyJ...`)

## 4. Create Environment File

Create a file named `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 6. Add Some Test Data (Optional)

You can add players directly in Supabase:

1. Go to **Table Editor** > **players**
2. Click **Insert** > **Insert row**
3. Add a player with:
   - `name`: "John Doe"
   - `email`: "john@example.com"
   - `skill_level`: "4.0"
   - `ranking_points`: 1000

Or use the SQL Editor:

```sql
INSERT INTO players (name, email, skill_level, ranking_points) VALUES
('John Doe', 'john@example.com', '4.0', 1000),
('Jane Smith', 'jane@example.com', '4.5', 1200),
('Bob Johnson', 'bob@example.com', '3.5', 900);
```

## 7. Deploy to Vercel (Optional)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add the same environment variables in Vercel's dashboard
4. Deploy!

## Troubleshooting

- **"Failed to fetch players"**: Make sure your Supabase URL and key are correct in `.env.local`
- **Database errors**: Make sure you ran the SQL schema in Supabase
- **Build errors**: Make sure all dependencies are installed with `npm install`

