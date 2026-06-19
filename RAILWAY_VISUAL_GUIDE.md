# 🖱️ VISUAL RAILWAY SETUP - Click by Click

## WHERE TO FIND "+ NEW" BUTTON:

1. **Go to:** https://railway.com/dashboard

2. **You'll see your project "furnhaus-backend"** listed

3. **LOOK FOR THIS:**
   - Inside the furnhaus-backend project box
   - In the **TOP RIGHT CORNER**
   - There's a **"+ New"** button (BLUE button)
   - **CLICK IT** ← THIS IS THE BUTTON!

## What to do AFTER clicking "+ New":

### First time: ADD GITHUB SERVICE
1. Click "+ New"
2. Select **"GitHub Repo"** (purple option)
3. Select **"Seung-Vannet/FurnHaus"**
4. Select **"backend"** folder
5. Click **"Deploy"**
   - Railway starts building...
   - Wait 2-3 minutes for build to finish

### Second time: ADD MYSQL DATABASE
1. Click "+ New" again
2. Select **"MySQL"** (green option)
3. Railway auto-creates database
   - Don't change anything, just wait

### Third: SET ENVIRONMENT VARIABLES
1. Click on **"backend"** service (the one that's deploying)
2. Go to **"Variables"** tab (on the left)
3. Click **"+ Add Variable"** or paste all these:

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

Railroad auto-fills these from MySQL:
- DB_HOST
- DB_USERNAME
- DB_PASSWORD

### Fourth: SET START COMMAND
1. Click on "backend" service
2. Go to **"Deployment"** tab
3. Change **"Start Command"** to:
   ```
   php artisan serve --host=0.0.0.0 --port=$PORT
   ```

### Fifth: RUN MIGRATIONS
1. In the "backend" service, go to **"Deploy"** tab
2. Click **"Open Terminal"**
3. Run:
   ```
   php artisan migrate:fresh --seed
   ```

---

## THAT'S IT! 🎉

Your backend is now deployed!

Railway will give you a URL like:
`furnhaus-api-production-xxxxx.railway.app`

---

## NEXT: Update Vercel

1. Go to https://vercel.com/dashboard
2. Click "furnhaus" project
3. Go to **Settings** → **Environment Variables**
4. Update: `NEXT_PUBLIC_API_URL=<your-railway-url>`
5. Vercel auto-redeploys

**DONE!** Your app is live! 🚀
