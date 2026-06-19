#!/bin/bash

# Vercel Frontend Deployment Script
# This automates the frontend deployment process

set -e

echo "🚀 FurnHaus Vercel Deployment"
echo "=============================="
echo ""

# Step 1: Check git status
echo "📝 Step 1: Checking git status..."
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ All changes committed"
else
    echo "⚠️  Uncommitted changes found:"
    git status --short
    read -p "Commit these changes? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Pre-Vercel deployment"
    fi
fi

echo ""
echo "🌐 Step 2: Pushing to GitHub..."
git push origin main
echo "✅ Pushed to main branch"

echo ""
echo "🔧 Step 3: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "📋 Step 4: Environment Variables"
echo "================================"

# Check if .env.production.local exists
if [ ! -f ".env.production.local" ]; then
    echo "❌ Missing .env.production.local"
    echo ""
    echo "Create .env.production.local with:"
    echo "  NEXT_PUBLIC_API_URL=https://your-api-domain.com"
    echo ""
    read -p "Enter your backend API URL: " API_URL
    echo "NEXT_PUBLIC_API_URL=$API_URL" > .env.production.local
    git add .env.production.local
    git commit -m "Add production environment"
    git push origin main
fi

echo "✅ Environment file ready"

echo ""
echo "🚀 Step 5: Deploying to Vercel..."
echo ""
echo "Choose deployment method:"
echo "1) Deploy to existing Vercel project"
echo "2) Create new Vercel project"
echo ""
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    vercel --prod
elif [ "$choice" = "2" ]; then
    vercel --prod --name=furnhaus
else
    echo "Invalid choice"
    exit 1
fi

echo ""
echo "✅ Frontend deployment complete!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway (see DEPLOY_VERCEL.md)"
echo "2. Update NEXT_PUBLIC_API_URL with Railway backend URL"
echo "3. Test your app!"
