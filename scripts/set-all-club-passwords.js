#!/usr/bin/env node

/**
 * Set all club admin passwords to "admin"
 * Usage: node scripts/set-all-club-passwords.js
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
const PASSWORD = 'admin'

async function setAllPasswords() {
  console.log('🔐 Setting all club admin passwords to "admin"...\n')

  try {
    // First check if column exists by trying to select it
    const { data: clubs, error: fetchError } = await supabase
      .from('clubs')
      .select('id, name')

    if (fetchError) {
      console.error('❌ Error fetching clubs:', fetchError.message)
      console.log('\n⚠️  You may need to run the migration first:')
      console.log('   Run this SQL in Supabase:')
      console.log('   ALTER TABLE clubs ADD COLUMN IF NOT EXISTS admin_password_hash TEXT;')
      process.exit(1)
    }

    if (!clubs || clubs.length === 0) {
      console.log('⚠️  No clubs found')
      return
    }

    console.log(`Found ${clubs.length} clubs\n`)

    const passwordHash = await bcrypt.hash(PASSWORD, 10)
    let updated = 0
    let skipped = 0

    for (const club of clubs) {
      // Update all clubs with the password
      const { error: updateError } = await supabase
        .from('clubs')
        .update({ admin_password_hash: passwordHash })
        .eq('id', club.id)

      if (updateError) {
        if (updateError.message.includes('column') && updateError.message.includes('admin_password_hash')) {
          console.log(`⚠️  Club "${club.name}": admin_password_hash column doesn't exist.`)
          console.log('   Run this SQL in Supabase:')
          console.log('   ALTER TABLE clubs ADD COLUMN IF NOT EXISTS admin_password_hash TEXT;')
          skipped++
        } else {
          console.error(`❌ Error updating "${club.name}":`, updateError.message)
          skipped++
        }
      } else {
        console.log(`✅ Set password for "${club.name}"`)
        updated++
      }
    }

    console.log(`\n✅ Done!`)
    console.log(`   Updated: ${updated} clubs`)
    if (skipped > 0) {
      console.log(`   Skipped: ${skipped} clubs (column may not exist)`)
    }
    console.log(`\n📝 All club admin passwords are now: "${PASSWORD}"`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

setAllPasswords()

