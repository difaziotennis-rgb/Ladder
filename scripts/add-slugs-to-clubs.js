#!/usr/bin/env node

/**
 * Add slugs to existing clubs
 */

const { createClient } = require('@supabase/supabase-js')
const { createSlug } = require('../lib/utils/slug.js')
require('dotenv').config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function addSlugs() {
  console.log('🔗 Adding slugs to clubs...\n')

  try {
    // First, try to add slug column if it doesn't exist
    console.log('📋 Fetching clubs...')
    const { data: clubs, error: fetchError } = await supabase
      .from('clubs')
      .select('*')

    if (fetchError) {
      console.error('❌ Error fetching clubs:', fetchError.message)
      process.exit(1)
    }

    if (!clubs || clubs.length === 0) {
      console.log('⚠️  No clubs found')
      return
    }

    console.log(`Found ${clubs.length} clubs\n`)

    // Update each club with a slug
    for (const club of clubs) {
      if (club.slug) {
        console.log(`⏭️  Club "${club.name}" already has slug: ${club.slug}`)
        continue
      }

      const slug = createSlug(club.name)
      
      // Try to update with slug
      const { error: updateError } = await supabase
        .from('clubs')
        .update({ slug: slug })
        .eq('id', club.id)

      if (updateError) {
        // If slug column doesn't exist, that's okay - migration needed
        if (updateError.message.includes('column') && updateError.message.includes('slug')) {
          console.log(`⚠️  Club "${club.name}": Slug column doesn't exist yet. Run the slug migration first.`)
        } else {
          console.error(`❌ Error updating club "${club.name}":`, updateError.message)
        }
      } else {
        console.log(`✅ Added slug to "${club.name}": ${slug}`)
      }
    }

    console.log('\n✅ Done!')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

addSlugs()

