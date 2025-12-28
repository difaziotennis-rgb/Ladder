# Mock Data Verification Checklist

## ✅ Mock Data Created

The following mock data has been created:

### Clubs (4 total)
1. **Riverside Tennis Club** - 6 players, 12 matches
2. **Country Club Tennis** - 5 players, 10 matches  
3. **Elite Tennis Academy** - 4 players, 8 matches
4. **Community Tennis Center** - 5 players, 10 matches

### Total Data
- **4 Clubs**
- **20 Players** (various skill levels from 3.0 to 5.5)
- **~40 Matches** (with scores, dates, and status)

## 🧪 How to Verify

### 1. Home Page
- [ ] Go to http://localhost:3000
- [ ] Check that all 4 clubs appear in the dropdown menu
- [ ] Select a club from dropdown - should navigate to that club's page
- [ ] Type a club name - should work case-insensitively

### 2. Club Pages
For each club, verify:
- [ ] Leaderboard shows all players sorted by points
- [ ] Players have correct names, emails, NTRP ratings
- [ ] Points are displayed correctly
- [ ] Rank numbers are correct (1, 2, 3, etc.)
- [ ] Clicking a player name goes to their profile

### 3. Player Profiles
- [ ] Player name and details display correctly
- [ ] Match history shows recent matches
- [ ] Opponent names are clickable
- [ ] Scores are displayed
- [ ] Win/Loss badges are correct
- [ ] Match status (pending/verified) is shown

### 4. Match Reporting
- [ ] "Report Match" button works
- [ ] Can select winner and loser from dropdown
- [ ] Can enter score
- [ ] Can select date
- [ ] Submitting updates rankings correctly

### 5. Add Player
- [ ] "Add Player" button works
- [ ] Can add new player with name and email
- [ ] New player appears on leaderboard with 1000 starting points

### 6. Admin Features
- [ ] Site admin login works
- [ ] Can create new clubs as site admin
- [ ] Club admin pages are accessible

## 🐛 Common Issues to Check

1. **Leaderboard not showing**: Check that club_id is set correctly
2. **Matches not appearing**: Verify club_id matches on matches table
3. **Player profiles blank**: Check API route `/api/players/[id]`
4. **Dropdown empty**: Verify `/api/clubs` returns data

## 📊 Test Data Details

### Riverside Tennis Club
- Highest ranked: John Smith (1500 pts, 4.5 NTRP)
- Lowest ranked: David Brown (950 pts, 3.5 NTRP)
- Mix of verified and pending matches

### Country Club Tennis  
- Highest ranked: Robert Taylor (1800 pts, 5.0 NTRP)
- Competitive matches between top players

### Elite Tennis Academy
- Highest ranked: Christopher Lee (2000 pts, 5.5 NTRP)
- Elite level players

### Community Tennis Center
- More recreational players (3.0-4.0 NTRP)
- Lower point totals

## ✅ Everything Should Work!

All mock data has been created and should be visible throughout the app.

