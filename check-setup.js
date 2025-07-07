// Autonomous setup checker for chat system
const fs = require('fs');
const path = require('path');

console.log('🔍 Autonomous Setup Checker');
console.log('============================\n');

// Check if we're in the right directory
const requiredFiles = ['package.json', 'supabase'];
let allFilesExist = true;

console.log('📁 Checking project structure...');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ Found: ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('\n❌ Not in correct project directory');
    process.exit(1);
}

// Check environment file
console.log('\n🔐 Checking environment configuration...');
if (fs.existsSync('.env.local')) {
    console.log('✅ Found .env.local');
    
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const hasUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=');
    const hasAnonKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');
    const hasServiceKey = envContent.includes('SUPABASE_SERVICE_ROLE_KEY=');
    
    console.log(`${hasUrl ? '✅' : '❌'} Supabase URL configured`);
    console.log(`${hasAnonKey ? '✅' : '❌'} Anon key configured`);
    console.log(`${hasServiceKey ? '✅' : '❌'} Service role key configured`);
    
    if (!hasUrl || !hasAnonKey || !hasServiceKey) {
        console.log('\n⚠️ Environment variables missing or incomplete');
        console.log('Please check your .env.local file');
    }
} else {
    console.log('❌ No .env.local file found');
    
    // Create template
    const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Get these values from: Supabase Dashboard > Settings > API
`;
    
    fs.writeFileSync('.env.local', envTemplate);
    console.log('📝 Created .env.local template');
    console.log('Please fill in your Supabase credentials');
}

// Check migration files
console.log('\n📋 Checking migration files...');
const migrationDir = 'supabase/migrations';
if (fs.existsSync(migrationDir)) {
    const migrations = fs.readdirSync(migrationDir);
    const expectedMigrations = [
        '001_initial_schema.sql',
        '002_chat_system.sql',
        '003_profile_enhancements.sql'
    ];
    
    expectedMigrations.forEach(migration => {
        if (migrations.includes(migration)) {
            console.log(`✅ Found: ${migration}`);
        } else {
            console.log(`⚠️ Missing: ${migration}`);
        }
    });
} else {
    console.log('❌ Migration directory not found');
}

// Check package.json for dependencies
console.log('\n📦 Checking dependencies...');
if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    const requiredDeps = [
        '@supabase/supabase-js',
        'next',
        'react',
        'typescript'
    ];
    
    requiredDeps.forEach(dep => {
        if (deps[dep]) {
            console.log(`✅ ${dep}: ${deps[dep]}`);
        } else {
            console.log(`❌ Missing: ${dep}`);
        }
    });
}

console.log('\n🎯 Next Steps:');
console.log('1. Ensure .env.local has correct Supabase credentials');
console.log('2. Run: npx supabase db push');
console.log('3. Test chat system in /studio');

console.log('\n✨ Setup check completed!');