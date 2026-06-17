#!/bin/bash

# FurnHaus Backend Quick Setup Script

echo "🚀 FurnHaus Backend - Quick Setup"
echo "=================================="
echo ""

# Check if composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed. Please install Composer first."
    exit 1
fi

# Check PHP version
PHP_VERSION=$(php -v | grep -oP 'PHP \K[0-9]+\.[0-9]+' | head -1)
echo "✅ PHP Version: $PHP_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
composer install

# Setup environment
echo ""
echo "🔧 Setting up environment..."
cp .env.example .env
php artisan key:generate

# Database setup
echo ""
echo "🗄️  Setting up database..."
read -p "Enter MySQL password (press Enter if no password): " DB_PASSWORD

if [ -z "$DB_PASSWORD" ]; then
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS furnhaus_db;"
else
    mysql -u root -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS furnhaus_db;"
fi

# Run migrations
echo ""
echo "📋 Running migrations..."
php artisan migrate --force

# Seed database
echo ""
echo "🌱 Seeding sample data..."
php artisan db:seed

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env with your database credentials if needed"
echo "2. Run: php artisan serve --port=8000"
echo "3. Visit: http://localhost:8000"
echo ""
echo "📝 Test Credentials:"
echo "   Admin: admin@furnhaus.com / password123"
echo "   User: customer@furnhaus.com / password123"
echo ""
echo "📖 See SETUP_GUIDE.md for detailed instructions"
echo "=================================="
