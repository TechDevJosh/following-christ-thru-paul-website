# Autonomous Supabase Setup Script
# This script will automatically set up the chat system

param(
    [string]$SupabaseUrl = "",
    [string]$SupabaseAnonKey = "",
    [string]$SupabaseServiceKey = "",
    [string]$ProjectRef = ""
)

Write-Host "🚀 Starting Autonomous Supabase Setup..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Set location to project directory
$projectPath = "C:\Users\LPO\OneDrive\Desktop\Following Christ Thru Paul Website - Experimental & Migration Version\following-christ-thru-paul-website"
Set-Location $projectPath

Write-Host "📁 Project Directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Verify project structure
$requiredFiles = @("package.json", "supabase")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Check environment
Write-Host "🔍 Checking Environment..." -ForegroundColor Cyan
try {
    $nodeVersion = & node --version 2>$null
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not installed" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

try {
    $npmVersion = & npm --version 2>$null
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not available" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check/Install Supabase CLI
Write-Host "🔧 Setting up Supabase CLI..." -ForegroundColor Cyan
try {
    $supabaseVersion = & npx supabase --version 2>$null
    Write-Host "✅ Supabase CLI available: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 Installing Supabase CLI..." -ForegroundColor Yellow
    & npm install -g supabase
}

Write-Host ""

# Check for environment file
Write-Host "🔐 Checking Environment Configuration..." -ForegroundColor Cyan
if (Test-Path ".env.local") {
    Write-Host "✅ Found .env.local file" -ForegroundColor Green
    
    # Read environment variables
    $envContent = Get-Content ".env.local"
    $hasSupabaseUrl = $envContent | Where-Object { $_ -match "NEXT_PUBLIC_SUPABASE_URL" }
    $hasAnonKey = $envContent | Where-Object { $_ -match "NEXT_PUBLIC_SUPABASE_ANON_KEY" }
    $hasServiceKey = $envContent | Where-Object { $_ -match "SUPABASE_SERVICE_ROLE_KEY" }
    
    if ($hasSupabaseUrl) { Write-Host "✅ Supabase URL configured" -ForegroundColor Green }
    else { Write-Host "⚠️ Missing NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Yellow }
    
    if ($hasAnonKey) { Write-Host "✅ Anon key configured" -ForegroundColor Green }
    else { Write-Host "⚠️ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Yellow }
    
    if ($hasServiceKey) { Write-Host "✅ Service role key configured" -ForegroundColor Green }
    else { Write-Host "⚠️ Missing SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Yellow }
    
} else {
    Write-Host "⚠️ No .env.local file found" -ForegroundColor Yellow
    Write-Host "Creating template .env.local file..." -ForegroundColor Yellow
    
    $envTemplate = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Add your actual values from Supabase Dashboard > Settings > API
"@
    
    $envTemplate | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "📝 Created .env.local template" -ForegroundColor Green
    Write-Host "Please fill in your Supabase credentials and run this script again" -ForegroundColor Yellow
}

Write-Host ""

# Initialize Supabase if needed
Write-Host "🏗️ Initializing Supabase..." -ForegroundColor Cyan
if (Test-Path "supabase\config.toml") {
    Write-Host "✅ Supabase already initialized" -ForegroundColor Green
} else {
    Write-Host "📦 Initializing Supabase project..." -ForegroundColor Yellow
    & npx supabase init
}

Write-Host ""

# Check migration files
Write-Host "📋 Checking Migration Files..." -ForegroundColor Cyan
$migrationFiles = @(
    "supabase\migrations\001_initial_schema.sql",
    "supabase\migrations\002_chat_system.sql", 
    "supabase\migrations\003_profile_enhancements.sql"
)

foreach ($migration in $migrationFiles) {
    if (Test-Path $migration) {
        Write-Host "✅ Found: $(Split-Path $migration -Leaf)" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Missing: $(Split-Path $migration -Leaf)" -ForegroundColor Yellow
    }
}

Write-Host ""

# Apply migrations
Write-Host "🚀 Applying Database Migrations..." -ForegroundColor Cyan
Write-Host "Running: npx supabase db push" -ForegroundColor Gray
Write-Host ""

try {
    & npx supabase db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 SUCCESS! Database migrations applied!" -ForegroundColor Green
        Write-Host "✅ Chat system tables created" -ForegroundColor Green
        Write-Host "✅ Profile enhancements applied" -ForegroundColor Green
        Write-Host "✅ RLS policies configured" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔥 Your chat system should now work!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Make sure you're logged in as admin/writer" -ForegroundColor White
        Write-Host "2. Navigate to /studio in your app" -ForegroundColor White
        Write-Host "3. Look for the chat icon in bottom-left corner" -ForegroundColor White
        
    } else {
        Write-Host ""
        Write-Host "❌ Migration failed with exit code: $LASTEXITCODE" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common solutions:" -ForegroundColor Yellow
        Write-Host "1. Check your .env.local file has correct Supabase credentials" -ForegroundColor White
        Write-Host "2. Run: npx supabase login" -ForegroundColor White
        Write-Host "3. Run: npx supabase link --project-ref YOUR_PROJECT_REF" -ForegroundColor White
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Error running migration: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Setup completed. Check output above for results." -ForegroundColor Green
Write-Host "Press Enter to exit..."
Read-Host