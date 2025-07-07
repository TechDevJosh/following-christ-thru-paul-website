# PowerShell script to run Supabase migration
Write-Host "Starting Supabase Migration..." -ForegroundColor Green
Write-Host ""

# Change to the correct directory
$projectPath = "C:\Users\LPO\OneDrive\Desktop\Following Christ Thru Paul Website - Experimental & Migration Version\following-christ-thru-paul-website"
Set-Location -Path $projectPath

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Check if we're in the right place
if (Test-Path "supabase") {
    Write-Host "✅ Found supabase folder" -ForegroundColor Green
} else {
    Write-Host "❌ Supabase folder not found" -ForegroundColor Red
    Write-Host "Make sure you're in the right directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ Found package.json" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found" -ForegroundColor Red
    Write-Host "Make sure you're in the project root" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Running: npx supabase db push" -ForegroundColor Cyan
Write-Host ""

# Run the migration
try {
    & npx supabase db push
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Migration failed with exit code: $LASTEXITCODE" -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error running migration: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"