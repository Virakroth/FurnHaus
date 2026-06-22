# Production Environment Setup for Railway

## Current Status ✅
- ✅ HTTP 500 error fix deployed
- ✅ Database defaults fix deployed  
- ✅ /api/install security endpoint removed
- ⏳ APP_DEBUG needs to be set to false in Railway

## Required Action: Update Railway Environment Variables

### What Needs to Be Done
Set `APP_DEBUG=false` in the production environment to prevent exposing sensitive stack traces to users.

### How to Set It in Railway

1. **Go to Railway Dashboard**
   - Navigate to: https://railway.app
   - Log in to your account
   - Select the FurnHaus project

2. **Navigate to Backend Service**
   - Click on the "furnhaus-production" service (or similar backend service)
   - Go to the "Variables" section

3. **Update APP_DEBUG Variable**
   - Find the `APP_DEBUG` environment variable
   - Change the value from `true` to `false`
   - Save/Deploy the changes

4. **Verify the Update**
   - Wait for Railway to redeploy (usually 30-60 seconds)
   - Test an error endpoint: `curl -s https://furnhaus-production.up.railway.app/api/not-found`
   - Verify that it no longer shows detailed stack traces

### Why This Matters 🔒
- **Security**: Prevents exposing sensitive file paths, database details, and internal code structure
- **Professional**: Users see generic error messages instead of raw exceptions
- **Compliance**: Best practice for production environments

### Current Environment Variables Reference
```env
APP_NAME=FurnHaus
APP_ENV=production
APP_DEBUG=false         # ← CHANGE THIS from true to false
APP_KEY=[existing_key]
DB_CONNECTION=mysql
DB_DATABASE=railway
SANCTUM_EXPIRATION=259200
CORS_ALLOWED_ORIGINS=https://furnhaus.vercel.app
```

### Alternative: Using Railway CLI
If you prefer command-line:
```bash
railway variables set APP_DEBUG=false
railway up --detach
```

## Post-Update Checklist
- [ ] APP_DEBUG set to false in Railway
- [ ] Railway redeployed successfully  
- [ ] Error responses no longer show stack traces
- [ ] Normal API responses still work correctly

## Related Commits
- d983a5a: Exception handler returns JSON for API routes
- d89e300: Added featured_image default value
- cedc92d: Removed /api/install security endpoint
