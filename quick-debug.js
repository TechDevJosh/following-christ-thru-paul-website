// Quick debug script - run with: node quick-debug.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function quickDebug() {
  console.log('🔍 Quick Chat Debug\n');

  // Check environment variables
  console.log('1. Environment Variables:');
  console.log('   SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('   SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
  console.log('   SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('\n❌ Missing required environment variables');
    console.log('Create .env.local with:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
    return;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Test basic connection
  console.log('\n2. Testing Supabase Connection...');
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    console.log('   ✅ Supabase connection working');
  } catch (error) {
    console.log('   ❌ Supabase connection failed:', error.message);
    return;
  }

  // Check if chat tables exist
  console.log('\n3. Checking Chat Tables...');
  try {
    const { error: convError } = await supabase.from('conversations').select('id').limit(1);
    if (convError && convError.code === '42P01') {
      console.log('   ❌ conversations table missing');
      console.log('   💡 Run: npx supabase db push');
      return;
    }
    console.log('   ✅ conversations table exists');

    const { error: msgError } = await supabase.from('messages').select('id').limit(1);
    if (msgError && msgError.code === '42P01') {
      console.log('   ❌ messages table missing');
      console.log('   💡 Run: npx supabase db push');
      return;
    }
    console.log('   ✅ messages table exists');
  } catch (error) {
    console.log('   ❌ Error checking tables:', error.message);
    return;
  }

  // Check profiles table structure
  console.log('\n4. Checking Profiles Table...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, role, display_name, profile_url')
      .limit(1);
    
    if (error) {
      console.log('   ❌ Profiles query failed:', error.message);
      if (error.message.includes('display_name') || error.message.includes('profile_url')) {
        console.log('   💡 Run: npx supabase db push (missing profile columns)');
      }
      return;
    }
    console.log('   ✅ profiles table structure correct');
    
    if (data && data.length > 0) {
      console.log('   📊 Sample user:', {
        id: data[0].id,
        email: data[0].email,
        role: data[0].role
      });
    } else {
      console.log('   ⚠️  No users found in profiles table');
    }
  } catch (error) {
    console.log('   ❌ Profiles check failed:', error.message);
  }

  console.log('\n🎯 Next Steps:');
  console.log('1. If tables are missing: npx supabase db push');
  console.log('2. If no users exist: Create a user account');
  console.log('3. If user role is wrong: Update role to admin/writer');
  console.log('4. Check browser console for client-side errors');
}

quickDebug().catch(console.error);