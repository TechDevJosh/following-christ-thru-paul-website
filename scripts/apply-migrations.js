require('dotenv').config({ path: '.env.local' });

console.log('🚀 Database Migration Instructions');
console.log('================================');
console.log('1. Go to: https://supabase.com/dashboard/project/npbzwdadusywnevwozya/sql');
console.log('2. Copy and paste the SQL from: supabase/migrations/001_initial_schema.sql');
console.log('3. Click "Run" to execute the migration');
console.log('4. Then run: npm run migrate-data');
console.log('\n✅ Manual migration required - Supabase RPC limitations');
console.log('\nAfter applying the SQL, your database will have:');
console.log('- profiles table (user roles)');
console.log('- verse_by_verse table (sermons)');
console.log('- topics table (topics/series)');
console.log('- resources table (downloads)');
console.log('- ask table (Q&A)');
console.log('- All indexes and RLS policies');