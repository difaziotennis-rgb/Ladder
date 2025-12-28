#!/usr/bin/env node

/**
 * Set default admin passwords for all clubs
 * Usage: node scripts/set-club-passwords.js
 */

const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const DEFAULT_PASSWORD = 'admin' // Default password for all clubs

async function setPasswords() {
  console.log('🔐 Setting club admin passwords...\n')

  try {
    // Get all clubs
    const { data: clubs, error } = await supabase
      .from('clubs')
      .select('*')

    if (error) {
      console.error('❌ Error fetching clubs:', error.message)
      process.exit(1)
    }

    if (!clubs || clubs.length === 0) {
      console.log('⚠️  No clubs found')
      return
    }

    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10)

    for (const club of clubs) {
      // Check if password column exists
      if (club.admin_password_hash) {
        console.log(`⏭️  Club "${club.name}" already has a password set`)
        continue
      }

      // Try to update (will fail if column doesn't exist)
      const { error: updateError } = await supabase
        .from('clubs')
        .update({ admin_password_hash: passwordHash })
        .eq('id', club.id)

      if (updateError) {
        if (updateError.message.includes('column') && updateError.message.includes('admin_password_hash')) {
          console.log(`⚠️  Club "${club.name}": admin_password_hash column doesn't exist. Run the migration first.`)
        } else {
          console.error(`❌ Error updating "${club.name}":`, updateError.message)
        }
      } else {
        console.log(`✅ Set password for "${club.name}" (password: ${DEFAULT_PASSWORD})`)
      }
    }

    console.log(`\n✅ Done! Default password for all clubs: "${DEFAULT_PASSWORD}"`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

setPasswords()

