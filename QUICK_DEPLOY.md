# 🚀 FurnHaus - Quick Deployment (Choose Your Platform)

## Step 1: Pick Your Hosting Platform

### **Option A: Vercel + Railway (Easiest - Recommended)**
- Frontend: Vercel (free tier available)
- Backend: Railway (free tier available)
- Database: Railway PostgreSQL

### **Option B: Heroku + Heroku Postgres (Simple)**
- Frontend: Heroku
- Backend: Heroku
- Database: Heroku Postgres

### **Option C: AWS (Most Control)**
- Frontend: Vercel or CloudFront
- Backend: EC2 or Elastic Beanstalk
- Database: RDS

### **Option D: DigitalOcean App Platform (Middle Ground)**
- All-in-one platform
- Simple GitHub integration

---

## Step 2: Prepare for Deployment

### **A. Commit Your Code to GitHub**
```bash
cd /Users/sumvirakroth/FurnHaus
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### **B. Collect These Values**
You'll need these when setting up your platform:

**Frontend Domain:**
- What domain for frontend? (e.g., furnhaus.com)

**Backend Domain:**
- What domain for backend API? (e.g., api.furnhaus.com)

**Database:**
- Which database provider? (Vercel/Railway/AWS/etc)
- Database name: `furnhaus_db`
- Username: `(you'll create this)`
- Password: `(you'll create this)`

---

## Step 3: Deploy (Choose Based on Platform)

### **🟢 VERCEL + RAILWAY (Recommended)**

#### Frontend on Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project" → "Import Git Repository"
3. Select your GitHub repo
4. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://api.furnhaus.com
   ```
5. Click "Deploy"

#### Backend on Railway:
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select `backend` folder
4. Add environment variables:
   ```
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://api.furnhaus.com
   DB_HOST=<railway-database-host>
   DB_USERNAME=<railway-db-user>
   DB_PASSWORD=<railway-db-password>
   DB_DATABASE=furnhaus_db
   CORS_ALLOWED_ORIGINS=https://furnhaus.com
   SANCTUM_STATEFUL_DOMAINS=furnhaus.com
   ```
5. Railway auto-provisions PostgreSQL
6. Click "Deploy"

#### Run Migrations:
```bash
# In Railway dashboard, open "Deployments" → "Connect" terminal
php artisan migrate --force
php artisan db:seed
```

---

### **🟡 HEROKU (Simple)**

#### Frontend on Heroku:
```bash
cd /Users/sumvirakroth/FurnHaus
heroku login
heroku create furnhaus-frontend
git push heroku main
heroku config:set NEXT_PUBLIC_API_URL=https://api.furnhaus.com
```

#### Backend on Heroku:
```bash
cd /Users/sumvirakroth/FurnHaus/backend
heroku create furnhaus-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main

# Run migrations
heroku run php artisan migrate --force
heroku run php artisan db:seed
```

---

### **🔵 AWS (Most Control)**

#### Setup RDS Database:
1. Go to AWS Console → RDS
2. Create MySQL database
3. Save endpoint, username, password

#### Deploy Backend to EC2:
1. Launch EC2 instance (Ubuntu 20.04)
2. SSH into instance
3. Clone repo and setup:
   ```bash
   git clone <your-repo>
   cd FurnHaus/backend
   composer install
   
   # Create .env
   cp .env.production .env
   # Edit .env with your RDS credentials
   
   php artisan migrate --force
   php artisan db:seed
   php artisan serve --host=0.0.0.0 --port=8000
   ```

#### Deploy Frontend to Vercel:
1. Same as Vercel section above
2. Set `NEXT_PUBLIC_API_URL` to your EC2 public IP

---

## Step 4: Verify Deployment Works

### **Test Backend:**
```bash
curl -X POST https://api.furnhaus.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"virakroth@furnhaus.com","password":"Roth@11"}'

# Should return: {"token":"...", "user":{...}}
```

### **Test Frontend:**
1. Visit https://furnhaus.com
2. Click "Login"
3. Login with virakroth@furnhaus.com / Roth@11
4. Click "Manage Products" - should show product list
5. Add a product - should save to database
6. Check cart - should show images
7. Check checkout - should show correct totals

---

## Step 5: Post-Deployment

- [ ] Update DNS records (point furnhaus.com to your frontend)
- [ ] Enable SSL/HTTPS (most platforms do this automatically)
- [ ] Set up automated backups for database
- [ ] Monitor error logs
- [ ] Test from different browsers/devices

---

## Quick Troubleshooting

**"API call blocked by CORS"**
- Check `CORS_ALLOWED_ORIGINS` matches your frontend domain exactly

**"Can't login / 401 Unauthorized"**
- Check `SANCTUM_STATEFUL_DOMAINS` matches your domain
- Verify database connection

**"Products not showing"**
- Check migrations ran: `php artisan migrate:status`
- Verify database has data: `php artisan tinker`

**"Images not loading"**
- Check product images exist in `public/products/`
- Verify `APP_URL` is accessible

---

## Support Files Created

I've created these for you:
- ✅ `.env.example` - Copy this to `.env.local` and fill values
- ✅ `backend/.env.production` - Template for backend production
- ✅ `DEPLOYMENT_GUIDE.md` - Detailed setup guide
- ✅ This file - Quick deployment checklist

**All code is ready. Pick your platform and follow the steps above!** 🎉
