#!/usr/bin/env node

/**
 * Script to create a site admin user
 * Usage: node scripts/create-site-admin.js <username> <password>
 */

const bcrypt = require('bcryptjs')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const username = process.argv[2]
const password = process.argv[3]

if (!username || !password) {
  console.log('Usage: node scripts/create-site-admin.js <username> <password>')
  console.log('Example: node scripts/create-site-admin.js admin mypassword123')
  process.exit(1)
}

async function createAdmin() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)
    
    // Insert admin
    const { data, error } = await supabase
      .from('site_admin')
      .insert([{
        username: username,
        password_hash: passwordHash,
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        console.error('❌ Username already exists')
      } else {
        console.error('❌ Error creating admin:', error.message)
      }
      process.exit(1)
    }

    console.log('✅ Site admin created successfully!')
    console.log(`   Username: ${data.username}`)
    console.log(`   ID: ${data.id}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

createAdmin()

