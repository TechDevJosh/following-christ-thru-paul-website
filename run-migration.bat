@echo off
echo Starting Supabase Migration...
echo.

REM Change to the correct directory
cd /d "C:\Users\LPO\OneDrive\Desktop\Following Christ Thru Paul Website - Experimental & Migration Version\following-christ-thru-paul-website"

echo Current directory: %CD%
echo.

REM Check if we're in the right place
if exist "supabase" (
    echo ✅ Found supabase folder
) else (
    echo ❌ Supabase folder not found
    echo Make sure you're in the right directory
    echo Press any key to continue...
    pause >nul
    exit /b 1
)

REM Check if package.json exists
if exist "package.json" (
    echo ✅ Found package.json
) else (
    echo ❌ package.json not found
    echo Make sure you're in the project root
    echo Press any key to continue...
    pause >nul
    exit /b 1
)

echo.
echo Running: npx supabase db push
echo.

REM Run the migration
call npx supabase db push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Migration completed successfully!
) else (
    echo.
    echo ❌ Migration failed with error code: %ERRORLEVEL%
)

echo.
echo Press any key to exit...
pause >nul