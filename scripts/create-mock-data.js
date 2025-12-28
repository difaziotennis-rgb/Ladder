#!/usr/bin/env node

/**
 * Script to create mock data for testing
 * Usage: node scripts/create-mock-data.js
 */

const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Mock data
const clubs = [
  { name: 'Riverside Tennis Club' },
  { name: 'Country Club Tennis' },
  { name: 'Elite Tennis Academy' },
  { name: 'Community Tennis Center' },
]

const playersByClub = {
  'Riverside Tennis Club': [
    { name: 'John Smith', email: 'john.smith@example.com', skill_level: '4.5', points: 1500 },
    { name: 'Sarah Johnson', email: 'sarah.j@example.com', skill_level: '4.0', points: 1200 },
    { name: 'Mike Davis', email: 'mike.davis@example.com', skill_level: '3.5', points: 1000 },
    { name: 'Emily Wilson', email: 'emily.w@example.com', skill_level: '4.0', points: 1100 },
    { name: 'David Brown', email: 'david.brown@example.com', skill_level: '3.5', points: 950 },
    { name: 'Lisa Anderson', email: 'lisa.a@example.com', skill_level: '4.5', points: 1400 },
  ],
  'Country Club Tennis': [
    { name: 'Robert Taylor', email: 'robert.t@example.com', skill_level: '5.0', points: 1800 },
    { name: 'Jennifer Martinez', email: 'jennifer.m@example.com', skill_level: '4.5', points: 1600 },
    { name: 'James White', email: 'james.white@example.com', skill_level: '4.0', points: 1300 },
    { name: 'Patricia Harris', email: 'patricia.h@example.com', skill_level: '3.5', points: 1050 },
    { name: 'Michael Thompson', email: 'michael.t@example.com', skill_level: '4.0', points: 1250 },
  ],
  'Elite Tennis Academy': [
    { name: 'Christopher Lee', email: 'chris.lee@example.com', skill_level: '5.5', points: 2000 },
    { name: 'Amanda Garcia', email: 'amanda.g@example.com', skill_level: '5.0', points: 1750 },
    { name: 'Daniel Rodriguez', email: 'daniel.r@example.com', skill_level: '4.5', points: 1550 },
    { name: 'Jessica Moore', email: 'jessica.m@example.com', skill_level: '4.0', points: 1350 },
  ],
  'Community Tennis Center': [
    { name: 'Matthew Jackson', email: 'matthew.j@example.com', skill_level: '3.5', points: 900 },
    { name: 'Ashley Williams', email: 'ashley.w@example.com', skill_level: '3.0', points: 800 },
    { name: 'Joshua Martin', email: 'joshua.m@example.com', skill_level: '3.5', points: 950 },
    { name: 'Stephanie Young', email: 'stephanie.y@example.com', skill_level: '4.0', points: 1150 },
    { name: 'Andrew King', email: 'andrew.k@example.com', skill_level: '3.5', points: 1000 },
  ],
}

function getRandomDate(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

function getRandomScore() {
  const scores = [
    '6-4, 6-2',
    '6-3, 6-1',
    '6-2, 6-4',
    '7-5, 6-3',
    '6-4, 4-6, 6-2',
    '6-1, 6-3',
    '6-3, 6-4',
    '7-6, 6-4',
    '6-2, 6-1',
    '6-4, 3-6, 6-3',
  ]
  return scores[Math.floor(Math.random() * scores.length)]
}

async function createMockData() {
  console.log('🎾 Creating mock data...\n')

  try {
    // Create clubs
    console.log('📋 Creating clubs...')
    const createdClubs = []
    
    for (const clubData of clubs) {
      // Check if club exists by name
      const { data: existing } = await supabase
        .from('clubs')
        .select('id, name')
        .eq('name', clubData.name)
        .single()

      if (existing) {
        console.log(`   ⏭️  Club "${clubData.name}" already exists, skipping...`)
        createdClubs.push(existing)
        continue
      }

      // Insert club (without slug for now - will be added by migration)
      const { data: club, error } = await supabase
        .from('clubs')
        .insert([{
          name: clubData.name,
        }])
        .select()
        .single()

      if (error) {
        console.error(`   ❌ Error creating club "${clubData.name}":`, error.message)
        continue
      }

      console.log(`   ✅ Created club: ${clubData.name}`)
      createdClubs.push(club)
    }

    // Create players and matches for each club
    for (let i = 0; i < createdClubs.length; i++) {
      const club = createdClubs[i]
      const clubName = clubs[i].name
      const players = playersByClub[clubName] || []

      console.log(`\n👥 Creating players for "${clubName}"...`)
      const createdPlayers = []

      for (const playerData of players) {
        const { data: existing } = await supabase
          .from('players')
          .select('id')
          .eq('club_id', club.id)
          .eq('email', playerData.email)
          .single()

        if (existing) {
          console.log(`   ⏭️  Player "${playerData.name}" already exists, skipping...`)
          createdPlayers.push(existing)
          continue
        }

        const { data: player, error } = await supabase
          .from('players')
          .insert([{
            name: playerData.name,
            email: playerData.email,
            skill_level: playerData.skill_level,
            ranking_points: playerData.points,
            club_id: club.id,
          }])
          .select()
          .single()

        if (error) {
          console.error(`   ❌ Error creating player "${playerData.name}":`, error.message)
          continue
        }

        console.log(`   ✅ Created player: ${playerData.name} (${playerData.skill_level}, ${playerData.points} pts)`)
        createdPlayers.push(player)
      }

      // Create matches
      console.log(`\n🎾 Creating matches for "${clubName}"...`)
      const matchCount = Math.min(createdPlayers.length * 2, 15) // 2 matches per player, max 15

      for (let j = 0; j < matchCount; j++) {
        // Pick two random players
        const winnerIndex = Math.floor(Math.random() * createdPlayers.length)
        let loserIndex = Math.floor(Math.random() * createdPlayers.length)
        while (loserIndex === winnerIndex) {
          loserIndex = Math.floor(Math.random() * createdPlayers.length)
        }

        const winner = createdPlayers[winnerIndex]
        const loser = createdPlayers[loserIndex]

        // Sometimes lower-ranked player wins (upset)
        let actualWinner = winner
        let actualLoser = loser
        if (Math.random() < 0.3 && loser.ranking_points < winner.ranking_points) {
          actualWinner = loser
          actualLoser = winner
        }

        const { error: matchError } = await supabase
          .from('matches')
          .insert([{
            winner_id: actualWinner.id,
            loser_id: actualLoser.id,
            score: getRandomScore(),
            date_played: getRandomDate(Math.floor(Math.random() * 90)), // Last 90 days
            club_id: club.id,
          }])

        if (matchError) {
          console.error(`   ❌ Error creating match:`, matchError.message)
        } else {
          console.log(`   ✅ Created match: ${actualWinner.name} def. ${actualLoser.name}`)
        }
      }
    }

    console.log('\n✅ Mock data creation complete!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Clubs: ${createdClubs.length}`)
    
    let totalPlayers = 0
    for (const clubName of Object.keys(playersByClub)) {
      totalPlayers += playersByClub[clubName].length
    }
    console.log(`   - Players: ${totalPlayers}`)
    console.log(`   - Matches: ~${createdClubs.length * 10} (varies per club)`)
    console.log(`\n🌐 You can now test the app at http://localhost:3000`)

  } catch (error) {
    console.error('❌ Error creating mock data:', error)
    process.exit(1)
  }
}

createMockData()

