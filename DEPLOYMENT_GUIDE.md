# 🚀 FurnHaus Deployment Guide

## Before Deploying to Production

Your application needs these environment configurations to work smoothly with data in production.

---

## Backend Configuration (Laravel)

### 1. Database Setup
Replace these values in `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=your-database-host.com          # e.g., db.example.com or AWS RDS endpoint
DB_PORT=3306
DB_DATABASE=furnhaus_db
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password
```

### 2. CORS Configuration (CRITICAL ⚠️)
Update `CORS_ALLOWED_ORIGINS` in `backend/.env`:

```env
# Production example:
CORS_ALLOWED_ORIGINS=https://furnhaus.com,https://api.furnhaus.com
```

**Important:** This MUST include your actual frontend domain, or all API calls will fail.

### 3. Sanctum Configuration
Update `SANCTUM_STATEFUL_DOMAINS` in `backend/.env`:

```env
# Production example:
SANCTUM_STATEFUL_DOMAINS=furnhaus.com,api.furnhaus.com
```

### 4. Application Settings
Update these for production:

```env
APP_ENV=production          # Change from "local"
APP_DEBUG=false             # Set to false in production
APP_URL=https://api.furnhaus.com  # Your production backend URL
```

### 5. Generate Fresh App Key
```bash
cd backend
php artisan key:generate
```

### 6. Run Database Migrations
```bash
php artisan migrate --force
php artisan db:seed          # Runs DatabaseSeeder with admin users and products
```

---

## Frontend Configuration (Next.js)

### 1. Set Backend API URL
Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=https://api.furnhaus.com
```

Or in your deployment platform (Vercel, Netlify, etc.):
- Add environment variable: `NEXT_PUBLIC_API_URL`
- Set value to your production backend URL

### 2. Build for Production
```bash
npm run build
npm start
```

---

## Deployment Checklist

### Before deploying:
- [ ] Database is provisioned and accessible
- [ ] Database credentials updated in `backend/.env`
- [ ] `CORS_ALLOWED_ORIGINS` set to your frontend domain
- [ ] `SANCTUM_STATEFUL_DOMAINS` updated
- [ ] `APP_ENV=production`
- [ ] `APP_DEBUG=false`
- [ ] `NEXT_PUBLIC_API_URL` set in frontend
- [ ] Database migrations have run
- [ ] Admin users seeded (virakroth@furnhaus.com, vannet@furnhaus.com)
- [ ] Product images are accessible in `public/products/`

### After deploying:
- [ ] Test login with admin account
- [ ] Test product CRUD operations (add, edit, delete)
- [ ] Test cart functionality with images
- [ ] Test checkout with correct pricing
- [ ] Verify no CORS errors in browser console

---

## Platform-Specific Deployment

### Vercel (Frontend)
1. Connect your GitHub repo
2. Add environment variable: `NEXT_PUBLIC_API_URL=https://api.furnhaus.com`
3. Deploy

### Heroku, AWS, DigitalOcean (Backend)
1. Set the environment variables in your platform's dashboard
2. Run migrations after first deployment
3. Ensure SSL/HTTPS is enabled

### Self-Hosted VPS
```bash
# Setup backend
cd backend
composer install --no-dev
php artisan migrate --force
php artisan db:seed

# Setup frontend
npm install
npm run build
npm start
```

---

## Troubleshooting

### CORS Error: "Access to XMLHttpRequest blocked"
- Check `CORS_ALLOWED_ORIGINS` in `backend/.env`
- Verify frontend URL matches exactly
- Restart backend server after changing

### Authentication failing (HTTP 401)
- Check `SANCTUM_STATEFUL_DOMAINS` is updated
- Verify database connection
- Check Bearer token format

### Products not showing
- Verify `DB_HOST` and database credentials
- Check migrations ran: `php artisan migrate:status`
- Verify product images exist in `public/products/`

### Images not loading
- Check `APP_URL` is correct and accessible
- Verify image file paths in database
- Ensure `public/` directory is served by web server

---

## Data Migration Tips

If migrating from existing database:
```bash
# Create custom migration
php artisan make:migration import_existing_data

# Copy existing data to new schema
# Then run:
php artisan migrate --force
```

---

## Production Monitoring

Monitor these endpoints after deployment:
- `GET /api/health` - Backend health check
- `GET /api/admin/products` - Product listing (requires admin token)
- `POST /api/auth/login` - Login endpoint

All endpoints should respond from your production domain, not localhost.
