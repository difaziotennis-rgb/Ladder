#!/usr/bin/env node

/**
 * This script helps verify your Supabase setup
 * Run: node scripts/setup-database.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🎾 TennisLadder - Supabase Setup Helper\n');
console.log('This script will help you set up your database.\n');
console.log('STEP 1: Go to your Supabase project dashboard');
console.log('STEP 2: Navigate to SQL Editor');
console.log('STEP 3: Copy the contents of supabase-schema.sql');
console.log('STEP 4: Paste and run it in the SQL Editor\n');

rl.question('Have you run the SQL schema? (yes/no): ', (answer) => {
  if (answer.toLowerCase() === 'yes') {
    console.log('\n✅ Great! Your database should be set up.');
    console.log('\nNext steps:');
    console.log('1. Get your Supabase URL and anon key from Settings > API');
    console.log('2. Create a .env.local file with:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=your_url');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key');
    console.log('\nOr run: npm run setup-env\n');
  } else {
    console.log('\n⚠️  Please run the SQL schema first!');
    console.log('The schema file is at: supabase-schema.sql');
  }
  rl.close();
});

