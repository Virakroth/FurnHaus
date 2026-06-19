#!/bin/bash

# Ensure cache directory exists and is writable
mkdir -p /app/bootstrap/cache
chmod -R 755 /app/bootstrap/cache

# Ensure storage directory is writable
mkdir -p /app/storage/logs
mkdir -p /app/storage/framework/views
chmod -R 755 /app/storage

# Run migrations if needed
php artisan migrate --force --quiet 2>/dev/null || true

# Start the application
php artisan serve --host=0.0.0.0 --port=$PORT
