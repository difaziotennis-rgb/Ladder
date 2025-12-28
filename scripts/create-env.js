#!/usr/bin/env node

/**
 * Helper script to create .env.local file
 * Usage: node scripts/create-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🎾 TennisLadder - Environment Setup\n');
console.log('This will create a .env.local file with your Supabase credentials.\n');
console.log('To find these values:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Click Settings > API');
console.log('3. Copy the Project URL and anon public key\n');

rl.question('Enter your Supabase Project URL: ', (url) => {
  if (!url || !url.includes('supabase.co')) {
    console.log('\n❌ Invalid URL. Please enter a valid Supabase URL.');
    rl.close();
    return;
  }

  rl.question('Enter your Supabase anon/public key: ', (key) => {
    if (!key || !key.startsWith('eyJ')) {
      console.log('\n❌ Invalid key. Please enter a valid anon key.');
      rl.close();
      return;
    }

    const envContent = `# Supabase Configuration
# Generated automatically - do not commit to git

NEXT_PUBLIC_SUPABASE_URL=${url.trim()}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${key.trim()}
`;

    const envPath = path.join(process.cwd(), '.env.local');
    
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('\n✅ Created .env.local file successfully!');
      console.log(`   Location: ${envPath}\n`);
      console.log('Next steps:');
      console.log('1. Run: npm run verify (to test the connection)');
      console.log('2. Run: npm run dev (to start the app)\n');
    } catch (error) {
      console.log('\n❌ Error creating .env.local file:');
      console.log(error.message);
    }
    
    rl.close();
  });
});

