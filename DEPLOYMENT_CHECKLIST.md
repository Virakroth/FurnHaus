# ✅ Pre-Deployment Checklist

## Code Ready
- [ ] All features working locally
- [ ] No console errors or warnings
- [ ] All changes committed to git
- [ ] Push to main branch

## Environment Setup
- [ ] `.env.local` created for frontend
- [ ] Backend `.env` has real database credentials
- [ ] `NEXT_PUBLIC_API_URL` set to production API domain
- [ ] `APP_URL` in backend matches production domain
- [ ] `CORS_ALLOWED_ORIGINS` matches frontend domain
- [ ] `SANCTUM_STATEFUL_DOMAINS` matches frontend domain

## Database Prepared
- [ ] Database server provisioned (MySQL or PostgreSQL)
- [ ] Database name: `furnhaus_db`
- [ ] Database credentials saved securely
- [ ] Test connection works from your computer

## Hosting Platform Chosen
- [ ] Select platform: Vercel+Railway, Heroku, AWS, DigitalOcean
- [ ] Create accounts on each platform
- [ ] Connect GitHub repository
- [ ] Configure auto-deploys if desired

## DNS/Domain Setup
- [ ] Frontend domain registered (e.g., furnhaus.com)
- [ ] Backend domain registered or using subdomain (e.g., api.furnhaus.com)
- [ ] DNS records updated (provider shows how)
- [ ] SSL certificates ready (most platforms auto-provision)

## Deployment Steps
- [ ] Deploy frontend to your platform
- [ ] Deploy backend to your platform
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Seed database: `php artisan db:seed`
- [ ] Test admin login works
- [ ] Test product CRUD works
- [ ] Test cart/checkout works

## Post-Deployment Verification
- [ ] Visit frontend domain - should load
- [ ] Login with virakroth@furnhaus.com / Roth@11
- [ ] Click "Manage Products" - see product list
- [ ] Create new product - should work
- [ ] Edit product - should work
- [ ] Delete product - should work
- [ ] Add to cart - should show image
- [ ] Checkout - should show correct total

## Monitoring Setup
- [ ] Error logging configured
- [ ] Database backups scheduled
- [ ] Monitor response times
- [ ] Check error logs regularly

## Security Check
- [ ] No hardcoded passwords in code
- [ ] API keys stored in environment variables
- [ ] HTTPS/SSL enabled on both domains
- [ ] CORS properly configured
- [ ] Database backups encrypted
- [ ] Admin passwords are strong

---

## If You Get Stuck

**Check these:**
1. Backend logs for database errors
2. Frontend console for API errors
3. Network tab in DevTools (see actual API calls)
4. Check environment variables are set on platform
5. Verify migrations ran successfully

**Common Issues:**
- CORS errors → check `CORS_ALLOWED_ORIGINS`
- 401 errors → check `SANCTUM_STATEFUL_DOMAINS`
- Database errors → check credentials and connectivity
- Missing products → run `php artisan db:seed`

---

## 🎉 Ready to Deploy!

All code is production-ready. Just:
1. Pick your platform from QUICK_DEPLOY.md
2. Follow the deployment steps
3. Run migrations
4. Test everything works

**Questions? Check:**
- DEPLOYMENT_GUIDE.md - Detailed setup for each platform
- QUICK_DEPLOY.md - Quick reference for each platform
- API_DOCUMENTATION.md - API endpoint reference
