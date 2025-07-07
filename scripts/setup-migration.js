#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up CMS Migration to Supabase');
console.log('==================================================');

// Check if required environment variables are set
function checkEnvironmentVariables() {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease set these variables in your .env.local file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables configured');
}

// Install required dependencies
async function installDependencies() {
  console.log('📦 Installing required dependencies...');
  
  const { execSync } = require('child_process');
  
  try {
    execSync('npm install @supabase/supabase-js @hookform/resolvers react-hook-form zod', { 
      stdio: 'inherit' 
    });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

// Create Supabase configuration
function createSupabaseConfig() {
  console.log('⚙️  Creating Supabase configuration...');
  
  const configPath = path.join(process.cwd(), 'supabase', 'config.toml');
  const configDir = path.dirname(configPath);
  
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  const config = `# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running \`supabase init\`.
project_id = "following-christ-thru-paul"

[api]
enabled = true
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. public and storage are always included.
schemas = ["public", "storage", "graphql_public"]
# Extra schemas to add to the search_path of every request. public is always included.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returns from a table or view. Limits payload size for accidental or
# malicious requests.
max_rows = 1000

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# The database major version to use. This has to be the same as your remote database's. Run \`SHOW
# server_version_num;\` on the remote database to check.
major_version = 15

[studio]
enabled = true
# Port to use for Supabase Studio.
port = 54323
# External URL of the API server that frontend connects to.
api_url = "http://127.0.0.1:54321"

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
enabled = true
# Port to use for the email testing server web interface.
port = 54324
# Uncomment to expose additional ports for testing user applications that send emails.
# smtp_port = 54325
# pop3_port = 54326

[storage]
enabled = true
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://localhost:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604800 (1 week).
jwt_expiry = 3600
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = false

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = false
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = false
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending a confirmation message when signing up via phone.
template = "Your code is {{ .Code }} ."

# Use pre-defined map of phone number to OTP for testing.
# [auth.sms.test_otp]
# 4152127777 = "123456"

# Configure one of the supported SMS providers: \`twilio\`, \`twilio_verify\`, \`messagebird\`, \`textlocal\`, \`vonage\`.
# [auth.sms.twilio]
# enabled = false
# account_sid = ""
# auth_token = ""
# from_number = ""

[edge_runtime]
enabled = true
# Configure one of the supported request policies: \`oneshot\`, \`per_worker\`.
# Use \`oneshot\` for hot reload, or \`per_worker\` for load testing.
policy = "oneshot"
inspector_port = 8083

[analytics]
enabled = false
port = 54327
vector_port = 54328
# Configure one of the supported backends: \`postgres\`, \`bigquery\`.
backend = "postgres"

[functions]
# A mapping of function names to their corresponding Docker image.
[functions._function_name]
verify_jwt = false`;

  fs.writeFileSync(configPath, config);
  console.log('✅ Supabase configuration created');
}

// Run migration validation
async function validateMigration() {
  console.log('🔍 Validating migration setup...');
  
  try {
    // Check if migration files exist
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '001_initial_schema.sql');
    if (!fs.existsSync(migrationPath)) {
      throw new Error('Migration file not found');
    }
    
    // Check if Supabase client is configured
    const supabaseLibPath = path.join(process.cwd(), 'lib', 'supabase.ts');
    if (!fs.existsSync(supabaseLibPath)) {
      throw new Error('Supabase client configuration not found');
    }
    
    console.log('✅ Migration setup validated');
  } catch (error) {
    console.error('❌ Migration validation failed:', error.message);
    process.exit(1);
  }
}

// Main setup function
async function main() {
  try {
    checkEnvironmentVariables();
    await installDependencies();
    createSupabaseConfig();
    await validateMigration();
    
    console.log('\n🎉 Migration setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: supabase start (to start local Supabase)');
    console.log('2. Run: supabase db reset (to apply migrations)');
    console.log('3. Run: node scripts/migrate-data.js (to migrate data)');
    console.log('4. Run: npm run dev (to start development server)');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}