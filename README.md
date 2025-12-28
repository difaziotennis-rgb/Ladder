# TennisLadder

A full-stack Tennis Ladder Management application built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Leaderboard**: Real-time standings sorted by ranking points
- **Match Reporting**: Simple form to report match results with automatic ranking updates
- **Player Profiles**: View individual player stats and match history
- **Leapfrog Ranking**: Lower-ranked players who beat higher-ranked players gain significant points
- **PWA Support**: Installable on mobile devices for easy access
- **Mobile-First Design**: Optimized for country club members on the go

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and backend
- **shadcn/ui** - Premium UI components
- **Lucide React** - Icons

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase-schema.sql`
3. Get your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Players
- `id` (UUID)
- `name` (TEXT)
- `email` (TEXT, UNIQUE)
- `skill_level` (TEXT) - NTRP rating
- `ranking_points` (INTEGER) - Default: 1000
- `phone_number` (TEXT, optional)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Matches
- `id` (UUID)
- `winner_id` (UUID, FK to players)
- `loser_id` (UUID, FK to players)
- `score` (TEXT) - e.g., "6-4, 6-2"
- `date_played` (TIMESTAMPTZ)
- `status` (TEXT) - 'pending' or 'verified'
- `created_at`, `updated_at` (TIMESTAMPTZ)

## Ranking Logic

The app uses a "Leapfrog" ranking system:

- If a lower-ranked player beats a higher-ranked player, they gain significant points (leapfrog bonus)
- If a higher-ranked player beats a lower-ranked player, they gain a small amount of points
- Points are calculated based on the ranking difference between players

## PWA Features

The app is configured as a Progressive Web App (PWA), allowing users to:
- Install it on their home screen
- Use it offline (with service worker support)
- Get a native app-like experience

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## License

MIT
