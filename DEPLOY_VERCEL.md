# 🚀 Deploy to Vercel (Frontend)

## Step 1: Prepare Your Code

```bash
cd /Users/sumvirakroth/FurnHaus

# Commit everything
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 2: Create `.env.production.local`

```bash
# In root directory, create this file:
NEXT_PUBLIC_API_URL=https://api.furnhaus.com
```

**Replace `api.furnhaus.com` with your actual backend API domain**

## Step 3: Deploy to Vercel

### **Option A: Using Vercel CLI (Fastest)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

When prompted:
- Link to existing project? **No**
- Project name? **furnhaus** (or your choice)
- Which directory? **.** (root)
- Override build settings? **No**

### **Option B: Using Vercel Dashboard (Visual)**

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repo (`FurnHaus`)
5. Click **"Import"**
6. Configure:
   - **Build Command:** `npm run build` ✓ (auto-detected)
   - **Output Directory:** `.next` ✓ (auto-detected)
   - **Environment Variables:** Add
     ```
     NEXT_PUBLIC_API_URL=https://api.furnhaus.com
     ```
7. Click **"Deploy"** 🎉

## Step 4: Connect Your Domain (Optional)

In Vercel Dashboard:
1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `furnhaus.com`)
3. Update DNS records at your domain registrar
4. Wait 24-48 hours for DNS propagation

## Step 5: Backend Setup (Separate)

**Vercel only hosts frontend (Next.js)**

For backend PHP/Laravel, use **Railway** (recommended):

### Deploy Backend to Railway:

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repo
4. Select **`backend`** folder
5. Add environment variables:
   ```
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://api.furnhaus.com
   DB_HOST=<railway-postgres-host>
   DB_USERNAME=<railway-user>
   DB_PASSWORD=<railway-password>
   DB_DATABASE=furnhaus_db
   CORS_ALLOWED_ORIGINS=https://furnhaus.com
   SANCTUM_STATEFUL_DOMAINS=furnhaus.com
   ```
6. Railway will auto-provision PostgreSQL
7. Click **"Deploy"**

### Run Migrations on Railway:

In Railway dashboard terminal:
```bash
php artisan migrate --force
php artisan db:seed
```

## Step 6: Update Frontend API URL

After backend is deployed on Railway:

1. In Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.com
   ```
4. Vercel auto-redeploys ✓

## Step 7: Test Everything

```bash
# Open your Vercel frontend URL
https://furnhaus.vercel.app (or your custom domain)

# Test:
1. Click "Login"
2. Enter: virakroth@furnhaus.com / Roth@11
3. Click "Manage Products"
4. Try to add/edit/delete a product
5. Add something to cart
6. Go to checkout
7. Verify totals match
```

## ✅ Verification Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Environment variables set on both platforms
- [ ] Backend migrations ran successfully
- [ ] Login works on frontend
- [ ] Products load from database
- [ ] CRUD operations (add/edit/delete) work
- [ ] Cart shows product images
- [ ] Checkout shows correct totals
- [ ] No CORS errors in browser console

## 🎯 What You Get

- ✅ **Frontend:** Automatic deployments when you push to GitHub
- ✅ **Backend:** Automatic deployments when you push backend code
- ✅ **Database:** Hosted on Railway (PostgreSQL)
- ✅ **SSL/HTTPS:** Free, auto-provisioned
- ✅ **Custom Domain:** Optional, just update DNS

## Troubleshooting

**Frontend not loading:**
- Check Vercel deployment log for build errors
- Verify `NEXT_PUBLIC_API_URL` is correct

**API calls failing (CORS error):**
- Check `CORS_ALLOWED_ORIGINS` in backend `.env`
- Must match Vercel frontend domain exactly

**Products not showing:**
- Check Railway deployment logs
- Run: `railway run php artisan migrate:status`

**Images not loading:**
- Check Railway backend URL is accessible
- Verify product images in `public/products/`

## Platform URLs After Deploy

- **Frontend:** `https://furnhaus.vercel.app` (or custom domain)
- **Backend:** Railway provides API URL automatically
- **Database:** Railroad-hosted PostgreSQL

---

**Ready? Just follow steps 1-2 and deploy!** 🚀
