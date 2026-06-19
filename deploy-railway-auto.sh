#!/bin/bash

# Railway Backend Deployment Script - AUTOMATED
# This script deploys FurnHaus backend to Railway with all configs

set -e

echo "🚀 FurnHaus Backend Automated Deployment (Railway)"
echo "=================================================="
echo ""

# Install Railway CLI if not present
echo "📦 Step 1: Checking Railway CLI..."
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    sudo npm install -g @railway/cli
fi

echo "✅ Railway CLI ready"
echo ""

# Navigate to backend
cd backend

echo "🔐 Step 2: Login to Railway"
echo "→ Browser will open for authentication"
railway login

echo ""
echo "✅ Logged in to Railway"
echo ""

echo "📝 Step 3: Creating Railway Project"
railway init --name furnhaus-backend

echo ""
echo "🔧 Step 4: Setting Environment Variables"
echo ""

# Get the environment details from user
read -p "Enter your frontend domain (e.g., furnhaus.vercel.app): " FRONTEND_DOMAIN
read -p "Enter your backend domain (e.g., api.furnhaus.com): " BACKEND_DOMAIN

echo ""
echo "Setting environment variables..."

# Set all required environment variables
railway variables set APP_ENV production
railway variables set APP_DEBUG false
railway variables set APP_KEY "base64:xkPMgBPFytYUklPiDF5diakv6F/pLGWJnLb3ZvyOciY="
railway variables set APP_URL "https://$BACKEND_DOMAIN"
railway variables set LOG_CHANNEL stack
railway variables set DB_CONNECTION mysql
railway variables set DB_PORT 3306
railway variables set DB_DATABASE furnhaus_db
railway variables set CACHE_DRIVER file
railway variables set SESSION_DRIVER file
railway variables set QUEUE_DRIVER sync
railway variables set MAIL_DRIVER log
railway variables set MAIL_FROM_ADDRESS "noreply@furnhaus.com"
railway variables set "SANCTUM_STATEFUL_DOMAINS=$FRONTEND_DOMAIN"
railway variables set "CORS_ALLOWED_ORIGINS=https://$FRONTEND_DOMAIN"

echo "✅ Environment variables set"
echo ""

echo "🚀 Step 5: Deploying to Railway"
railway up

echo ""
echo "⏳ Step 6: Getting Railway Database Credentials"
echo ""

# Get the project ID and get database info
PROJECT_ID=$(railway config --json | jq -r '.project')
echo "Project ID: $PROJECT_ID"
echo ""

# Get the Railway-provisioned database info
echo "Fetching database credentials from Railway..."
RAILWAY_DB_HOST=$(railway variables get DB_HOST)
RAILWAY_DB_USER=$(railway variables get DB_USERNAME)
RAILWAY_DB_PASS=$(railway variables get DB_PASSWORD)
RAILWAY_DB_NAME=$(railway variables get DB_DATABASE)

echo "✅ Database provisioned:"
echo "   Host: $RAILWAY_DB_HOST"
echo "   Username: $RAILWAY_DB_USER"
echo ""

echo "🔄 Step 7: Running Database Migrations"
echo ""

railway run php artisan migrate --force

echo ""
echo "🌱 Step 8: Seeding Database"
echo ""

railway run php artisan db:seed

echo ""
echo "✅ Database seeded with:"
echo "   • 16 products"
echo "   • 2 admin accounts"
echo "     - virakroth@furnhaus.com / Roth@11"
echo "     - vannet@furnhaus.com / Netking20$"
echo ""

# Get the Railway app URL
echo "📋 Step 9: Getting Your API URL"
RAILWAY_URL=$(railway url)
echo ""
echo "✅ Your Backend API is live at:"
echo "   $RAILWAY_URL"
echo ""

echo "🎯 NEXT STEPS:"
echo "1. Go to Vercel Dashboard"
echo "2. Project: furnhaus → Settings → Environment Variables"
echo "3. Update: NEXT_PUBLIC_API_URL=$RAILWAY_URL"
echo "4. Vercel will auto-redeploy"
echo ""

echo "✨ Your FurnHaus App is Now FULLY DEPLOYED! 🎉"
echo ""
echo "Frontend: https://furnhaus.vercel.app"
echo "Backend:  $RAILWAY_URL"
echo "Admin:    virakroth@furnhaus.com / Roth@11"
echo ""
echo "Test it now! 🚀"
