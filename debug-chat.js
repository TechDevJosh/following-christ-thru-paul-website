// Debug script to check chat system setup
// Run this with: node debug-chat.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Required:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugChatSystem() {
  console.log('🔍 Debugging Chat System...\n');

  try {
    // Check if conversations table exists
    console.log('1. Checking conversations table...');
    const { data: conversations, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .limit(1);

    if (convError) {
      console.error('❌ Conversations table error:', convError.message);
      if (convError.code === '42P01') {
        console.log('💡 Solution: Run database migration');
        console.log('   npx supabase db push');
      }
      return;
    }
    console.log('✅ Conversations table exists');

    // Check if messages table exists
    console.log('2. Checking messages table...');
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);

    if (msgError) {
      console.error('❌ Messages table error:', msgError.message);
      return;
    }
    console.log('✅ Messages table exists');

    // Check if profiles table has required columns
    console.log('3. Checking profiles table structure...');
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, role, display_name, profile_url')
      .limit(1);

    if (profileError) {
      console.error('❌ Profiles table error:', profileError.message);
      if (profileError.message.includes('display_name') || profileError.message.includes('profile_url')) {
        console.log('💡 Solution: Run profile migration');
        console.log('   npx supabase db push');
      }
      return;
    }
    console.log('✅ Profiles table has required columns');

    // Check RLS policies
    console.log('4. Checking RLS policies...');
    const { data: policies, error: policyError } = await supabase
      .rpc('get_policies', { table_name: 'conversations' })
      .catch(() => null);

    if (policyError) {
      console.log('⚠️  Could not check RLS policies (this is normal)');
    } else {
      console.log('✅ RLS policies check completed');
    }

    // Test creating a conversation
    console.log('5. Testing conversation creation...');
    const testUserId = '00000000-0000-0000-0000-000000000000'; // Dummy UUID
    const { data: testConv, error: testError } = await supabase
      .from('conversations')
      .insert([{ title: 'Test Chat', created_by: testUserId }])
      .select()
      .single();

    if (testError) {
      console.error('❌ Cannot create conversation:', testError.message);
      if (testError.code === '23503') {
        console.log('💡 This is expected - foreign key constraint (user must exist)');
      }
    } else {
      console.log('✅ Conversation creation works');
      // Clean up test data
      await supabase.from('conversations').delete().eq('id', testConv.id);
    }

    console.log('\n🎉 Chat system debug completed!');
    console.log('\nNext steps:');
    console.log('1. Ensure you have run: npx supabase db push');
    console.log('2. Check that user authentication is working');
    console.log('3. Verify user has admin or writer role');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugChatSystem();