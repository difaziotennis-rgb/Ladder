# Deployment Guide for difaziotennis.com

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the easiest deployment experience.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/tennis-ladder.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - **Framework Preset**: Next.js (auto-detected)
     - **Root Directory**: `./` (default)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)

3. **Add Environment Variables in Vercel**
   - Go to Project Settings > Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

5. **Configure Domain**
   Since you already have difaziotennis.com running another project, you have options:

   **Option A: Use a subdomain** (Recommended)
   - In Vercel, go to Project Settings > Domains
   - Add: `ladder.difaziotennis.com`
   - Follow DNS instructions (add CNAME record)
   - Your ladder will be at: `https://ladder.difaziotennis.com`

   **Option B: Use a subdirectory** (More complex)
   - Requires reverse proxy setup (nginx, Cloudflare, etc.)
   - Not recommended unless you're comfortable with server config

   **Option C: Replace existing project**
   - Point difaziotennis.com to this Vercel project
   - Your other project would need to move to a subdomain

### After Deployment:
- Your app will be live at the Vercel URL (e.g., `your-project.vercel.app`)
- Or your custom domain once DNS is configured
- Environment variables are automatically included

---

## Option 2: Deploy to Netlify

Similar to Vercel but with different interface:

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import from GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables in Site Settings
6. Deploy

---

## Option 3: Self-Hosted (If you have a server)

### Requirements:
- Node.js 18+ installed
- PM2 or similar process manager (recommended)
- Nginx or Apache for reverse proxy

### Steps:

1. **Build the app**
   ```bash
   npm install
   npm run build
   ```

2. **Set environment variables**
   Create `.env.production`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=production
   ```

3. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "tennis-ladder" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx** (if using subdomain)
   ```nginx
   server {
       listen 80;
       server_name ladder.difaziotennis.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Set up SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d ladder.difaziotennis.com
   ```

---

## Environment Variables Needed

You'll need these in your hosting platform:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from:
- Supabase Dashboard > Settings > API

---

## Database Setup

Before deploying, make sure you've run all SQL migrations in your Supabase project:

1. `supabase-schema-multiclub.sql` (if not already done)
2. `supabase-schema-add-position.sql`
3. `supabase-schema-update-for-new-system.sql`
4. `supabase-schema-keep-only-rhinebeck.sql` (if you want to clean up clubs)
5. `supabase-schema-site-admin.sql` (for site admin functionality)

---

## Recommended Approach

**For your situation (already have difaziotennis.com with another project):**

1. **Use Vercel** (easiest)
2. **Deploy to subdomain**: `ladder.difaziotennis.com`
3. **DNS Configuration**:
   - Add CNAME record: `ladder` → `cname.vercel-dns.com` (Vercel will provide exact value)
   - Or A record if Vercel provides IP

This way:
- Your main site stays at `difaziotennis.com`
- Your ladder is at `ladder.difaziotennis.com`
- Both can run independently

---

## Post-Deployment Checklist

- [ ] Environment variables set in hosting platform
- [ ] All database migrations run in Supabase
- [ ] Test the app on the live URL
- [ ] Test site admin login
- [ ] Test club creation/deletion
- [ ] Test player management
- [ ] Test drag-and-drop ranking
- [ ] Verify SSL certificate (HTTPS)

---

## Troubleshooting

**Build fails:**
- Check environment variables are set
- Ensure all dependencies are in package.json
- Check build logs for specific errors

**Database connection fails:**
- Verify Supabase URL and key are correct
- Check Supabase project is active
- Verify RLS policies allow access

**Domain not working:**
- Check DNS propagation (can take 24-48 hours)
- Verify CNAME/A record is correct
- Check SSL certificate is issued

---

## Need Help?

If you need help with:
- Setting up the subdomain
- Configuring DNS
- Environment variables
- Database migrations

Let me know and I can guide you through the specific steps!

