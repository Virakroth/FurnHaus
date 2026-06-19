# 🚀 Deploy Backend to Railway

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Click **"Start Free"**
3. Sign up with GitHub (easiest)
4. Authorize Railway to access your GitHub

## Step 2: Create New Project

In Railway Dashboard:
1. Click **"New Project"**
2. Click **"GitHub Repo"**
3. Select **"Seung-Vannet/FurnHaus"** repo
4. Click **"Deploy Now"**

Railway will auto-detect it's PHP/Laravel

## Step 3: Set Environment Variables

In Railway Project Settings → Variables, add:

```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xkPMgBPFytYUklPiDF5diakv6F/pLGWJnLb3ZvyOciY=
APP_URL=https://furnhaus-api.railway.app

DB_CONNECTION=mysql
DB_PORT=3306
DB_DATABASE=furnhaus_db

SANCTUM_STATEFUL_DOMAINS=furnhaus.vercel.app
CORS_ALLOWED_ORIGINS=https://furnhaus.vercel.app

MAIL_DRIVER=log
MAIL_FROM_ADDRESS=noreply@furnhaus.com
```

Railway will auto-provision:
- `DB_HOST` (Railway MySQL)
- `DB_USERNAME` (Railway auto-generated)
- `DB_PASSWORD` (Railway auto-generated)

## Step 4: Add Start Command

In Railway → Deployment:
1. Set **"Start Command":**
   ```
   php artisan serve --host=0.0.0.0 --port=$PORT
   ```

2. Set **"Build Command":**
   ```
   composer install && php artisan migrate --force
   ```

## Step 5: Get Your API URL

After deployment:
- Railway shows your domain (e.g., `furnhaus-api-production.up.railway.app`)
- This is your backend URL

## Step 6: Update Frontend API URL

Go to Vercel Dashboard:
1. Settings → Environment Variables
2. Update: `NEXT_PUBLIC_API_URL=https://furnhaus-api-production.up.railway.app`
3. Vercel auto-redeploys ✓

## Step 7: Run Database Migrations

In Railway Terminal:
```bash
php artisan migrate --force
php artisan db:seed
```

This creates tables + seeds 16 products + 2 admin accounts

---

**That's it! Your app is now fully deployed!** 🎉

Test:
- Frontend: https://furnhaus.vercel.app
- Backend API: https://furnhaus-api-production.up.railway.app/api/admin/products
- Login: virakroth@furnhaus.com / Roth@11
