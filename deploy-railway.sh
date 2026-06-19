#!/bin/bash

# Railway Backend Deployment Script
# Deploys PHP/Laravel backend to Railway

set -e

echo "🚀 FurnHaus Backend Deployment (Railway)"
echo "========================================"
echo ""

# Check if railway CLI is installed
echo "📋 Checking Railway CLI..."
if ! command -v railway &> /dev/null; then
    echo "⚠️  Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI ready"
echo ""

# Ensure we're in backend directory
cd backend

echo "🔐 Step 1: Login to Railway"
railway login

echo ""
echo "📦 Step 2: Create Railway project"
railway init

echo ""
echo "🔧 Step 3: Setting up environment"
echo "=================================="

# Get environment values
read -p "Enter database name (default: furnhaus_db): " DB_NAME
DB_NAME=${DB_NAME:-furnhaus_db}

read -p "Enter frontend domain (e.g., furnhaus.com): " FRONTEND_DOMAIN
CORS_ORIGINS="https://$FRONTEND_DOMAIN"

read -p "Enter backend API domain (e.g., api.furnhaus.com): " BACKEND_DOMAIN

# Create .env for Railway
cat > .env.railway << EOF
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xkPMgBPFytYUklPiDF5diakv6F/pLGWJnLb3ZvyOciY=
APP_URL=https://$BACKEND_DOMAIN

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_PORT=3306
DB_DATABASE=$DB_NAME

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

MAIL_DRIVER=log
MAIL_FROM_ADDRESS=hello@example.com
MAIL_FROM_NAME="FurnHaus"

SANCTUM_STATEFUL_DOMAINS=$FRONTEND_DOMAIN
CORS_ALLOWED_ORIGINS=$CORS_ORIGINS
EOF

echo "✅ Created .env.railway"

echo ""
echo "🚀 Step 4: Deploying to Railway"
railway up

echo ""
echo "🔄 Step 5: Running database migrations"
railway run php artisan migrate --force

echo ""
echo "🌱 Step 6: Seeding database"
railway run php artisan db:seed

echo ""
echo "✅ Backend deployment complete!"
echo ""
echo "Your Railway backend URL has been created."
echo "Update your Vercel frontend with:"
echo "  NEXT_PUBLIC_API_URL=<railway-url>"
echo ""
echo "Test your API:"
echo "  curl https://<railway-url>/api/admin/products"
