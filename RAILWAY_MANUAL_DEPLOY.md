# 🚀 Manual Railway Deployment (5 minutes)

Since the CLI approach had issues, here's the easiest visual way:

## Step 1: Go to Railway Dashboard
https://railway.com/dashboard

## Step 2: Select Your Project
Click **"furnhaus-backend"** (already created)

## Step 2: Add GitHub Service
1. Click **"+ New"**
2. Select **"GitHub Repo"**
3. Select **"Seung-Vannet/FurnHaus"** repo
4. Select **"backend"** directory
5. Click **"Deploy"**

## Step 3: Add MySQL Database
1. In Project View, click **"+ New"**
2. Select **"MySQL"**
3. Railway auto-provisions database
4. Note the credentials (they auto-populate)

## Step 4: Set Environment Variables
1. Click on "backend" service
2. Go to **"Variables"** tab
3. Paste these:

```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xkPMgBPFytYUklPiDF5diakv6F/pLGWJnLb3ZvyOciY=
APP_URL=https://api.furnhaus.com
LOG_CHANNEL=stack
DB_CONNECTION=mysql
DB_PORT=3306
DB_DATABASE=furnhaus_db
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync
MAIL_DRIVER=log
MAIL_FROM_ADDRESS=noreply@furnhaus.com
MAIL_FROM_NAME=FurnHaus
SANCTUM_STATEFUL_DOMAINS=furnhaus.vercel.app
CORS_ALLOWED_ORIGINS=https://furnhaus.vercel.app
```

Railway will auto-add:
- DB_HOST
- DB_USERNAME  
- DB_PASSWORD

(from MySQL service)

## Step 5: Set Deployment Command
1. Click **"Deployment"** tab
2. Set **Build Command**: `composer install && php artisan migrate:fresh --seed`
3. Set **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

## Step 6: Deploy
Railway auto-deploys. You'll see:
✓ Build logs
✓ Deployment URL (e.g., furnhaus-production-xxxx.railway.app)

## Step 7: Get Your URL
After deployment succeeds, Railway shows your API URL

## Step 8: Update Vercel
1. Go to Vercel Dashboard
2. furnhaus project → Settings → Environment Variables
3. Update: `NEXT_PUBLIC_API_URL=<your-railway-url>`
4. Vercel auto-redeploys

---

**Done!** Your app is fully deployed! 🎉

Frontend: https://furnhaus.vercel.app
Backend: https://<railway-url>
Admin: virakroth@furnhaus.com / Roth@11
