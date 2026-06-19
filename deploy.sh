#!/bin/bash

# FurnHaus Deployment Helper Script
# This script prepares your app for deployment

set -e

echo "🚀 FurnHaus Deployment Prep"
echo "============================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run: git init"
    exit 1
fi

# Check if code is committed
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ All changes committed"
else
    echo "⚠️  You have uncommitted changes:"
    git status --short
    echo ""
    read -p "Commit these changes? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Pre-deployment commit"
    else
        echo "❌ Please commit changes before deploying"
        exit 1
    fi
fi

# Check frontend .env.local
if [ ! -f ".env.local" ]; then
    echo ""
    echo "❌ Missing .env.local (frontend env)"
    echo "📝 Create .env.local with:"
    echo "   NEXT_PUBLIC_API_URL=https://your-api-domain.com"
    exit 1
fi

# Check backend .env
if [ ! -f "backend/.env" ]; then
    echo ""
    echo "❌ Missing backend/.env"
    echo "📝 Create backend/.env with database credentials"
    exit 1
fi

echo ""
echo "✅ Frontend .env.local found"
echo "✅ Backend .env found"
echo ""

# Show current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
COMMIT=$(git rev-parse --short HEAD)
echo "📦 Ready to deploy:"
echo "   Branch: $BRANCH"
echo "   Commit: $COMMIT"
echo ""

# Show deployment platforms
echo "🌐 Next steps for your platform:"
echo ""
echo "VERCEL + RAILWAY:"
echo "  1. Push to GitHub"
echo "  2. Connect to Vercel (frontend)"
echo "  3. Connect to Railway (backend)"
echo "  4. Set environment variables"
echo ""
echo "HEROKU:"
echo "  1. heroku create furnhaus-frontend"
echo "  2. git push heroku main"
echo "  3. heroku config:set NEXT_PUBLIC_API_URL=https://your-api.com"
echo ""
echo "AWS:"
echo "  1. Launch EC2 instance"
echo "  2. Clone repo, setup .env"
echo "  3. Run: php artisan migrate --force && php artisan db:seed"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo "✅ Ready! Push your code and follow platform setup instructions."
echo "📖 See QUICK_DEPLOY.md for detailed steps"
