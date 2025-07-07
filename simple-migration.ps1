# Simple PowerShell migration script
# Run this from PowerShell in the project directory

Write-Host "=== Supabase Migration Script ===" -ForegroundColor Green
Write-Host ""

# Get current location
$currentPath = Get-Location
Write-Host "Current directory: $currentPath" -ForegroundColor Yellow

# Check if we're in the right place
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Not in project root. Please navigate to the project folder first." -ForegroundColor Red
    Write-Host "Expected files: package.json, supabase folder" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

if (-not (Test-Path "supabase")) {
    Write-Host "❌ Supabase folder not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found supabase folder" -ForegroundColor Green
Write-Host ""

# Check Node.js and npm
Write-Host "Checking environment..." -ForegroundColor Cyan
try {
    $nodeVersion = & node --version 2>$null
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    exit 1
}

try {
    $npmVersion = & npm --version 2>$null
    Write-Host "npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check Supabase CLI
Write-Host "Checking Supabase CLI..." -ForegroundColor Cyan
try {
    $supabaseVersion = & npx supabase --version 2>$null
    Write-Host "Supabase CLI: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Supabase CLI not found, will install via npx" -ForegroundColor Yellow
}

Write-Host ""

# Run migration
Write-Host "Running database migration..." -ForegroundColor Cyan
Write-Host "Command: npx supabase db push" -ForegroundColor Gray
Write-Host ""

try {
    & npx supabase db push
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
        Write-Host "Your chat system should now work." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Migration failed with exit code: $LASTEXITCODE" -ForegroundColor Red
        Write-Host "Check the error messages above for details." -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error running migration: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press Enter to exit..."
Read-Host