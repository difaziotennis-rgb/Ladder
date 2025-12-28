#!/usr/bin/env node

/**
 * Verify that the Supabase setup is correct
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Verifying Supabase Setup...\n');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.log('❌ Missing environment variables!');
  console.log('\nPlease create a .env.local file with:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log(`   URL: ${SUPABASE_URL.substring(0, 30)}...`);
console.log(`   Key: ${SUPABASE_KEY.substring(0, 20)}...\n`);

// Try to connect to Supabase
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verify() {
  try {
    // Check if players table exists
    const { data, error } = await supabase
      .from('players')
      .select('count')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('❌ Database tables not found!');
        console.log('\nPlease run the SQL schema in your Supabase SQL Editor:');
        console.log('1. Go to SQL Editor in Supabase dashboard');
        console.log('2. Copy contents of supabase-schema.sql');
        console.log('3. Paste and run it\n');
        process.exit(1);
      } else {
        throw error;
      }
    }

    console.log('✅ Database connection successful!');
    console.log('✅ Tables are set up correctly\n');
    
    // Check for existing players
    const { count } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Current players in database: ${count || 0}`);
    
    if (count === 0) {
      console.log('\n💡 Tip: Add some test players in Supabase Table Editor or via SQL\n');
    }

    console.log('🎉 Setup complete! You can now run: npm run dev\n');
  } catch (error) {
    console.log('❌ Error verifying setup:');
    console.log(error.message);
    process.exit(1);
  }
}

verify();

