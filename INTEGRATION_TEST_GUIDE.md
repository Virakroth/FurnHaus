# Local Demo & Testing Guide

## ✅ Both Servers Running

- **Frontend**: http://localhost:3000 (Next.js)
- **Backend**: http://localhost:8000 (Laravel API)
- **Database**: SQLite (already seeded with sample data)

## Quick Test Flow

### 1. Test Products (No Login Required)

Go to: http://localhost:3000/shop

- Should load products from backend API
- Products come from SQLite database
- Loading skeleton shown while fetching

### 2. Test Authentication

#### Sign Up

1. Go to http://localhost:3000/login
2. Click "Create one" tab
3. Fill in form:
   - First Name: Test
   - Last Name: User
   - Email: testuser@example.com
   - Phone: +1 (555) 123-4567
   - Password: password123
4. Click "CREATE ACCOUNT"
5. Should redirect to /dashboard on success
6. Token saved to localStorage

#### Sign In

1. Go to http://localhost:3000/login
2. Use test credentials:
   - Email: admin@furnhaus.com
   - Password: password123
3. Should redirect to /dashboard
4. Token saved to localStorage

### 3. Test Product Details

1. From shop page, click any product
2. Should load product details from backend
3. Shows related products
4. Can add to wishlist (when logged in)
5. Can create review (when logged in)

### 4. API Endpoint Testing (Terminal)

**Get Products:**

```bash
curl -s 'http://localhost:8000/api/products' | python3 -m json.tool | head -30
```

**Login:**

```bash
curl -s -X POST 'http://localhost:8000/api/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@furnhaus.com","password":"password123"}' | python3 -m json.tool
```

**Run Full API Test:**

```bash
cd backend
bash test-api.sh
```

## Test Accounts

**Admin:**

- Email: admin@furnhaus.com
- Password: password123

**Customer:**

- Email: customer@furnhaus.com
- Password: password123

## How Frontend Connects to Backend

1. **Environment Variable** (`.env.local`):

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

2. **API Client** (`app/lib/api.ts`):
   - All API calls go through this service
   - Handles authentication, products, orders, etc.
   - Stores token in localStorage

3. **Pages Updated**:
   - `/shop` - Fetch products from API
   - `/product/[id]` - Fetch product details & related items
   - `/login` - Register & login via API
   - Tokens persist across page refreshes

## Common Issues & Solutions

### "Cannot connect to API"

- Make sure both servers are running
- Check `http://localhost:8000/api/products` returns JSON
- Check `.env.local` has correct API URL

### "Product images not loading"

- Frontend fetches from `/public/products/` (local files)
- Backend returns image paths in API response
- Images were included in project setup

### "Login not working"

- Check localStorage is enabled in browser
- Verify test account credentials
- Check browser console for errors

## What's Working

✅ Frontend connects to backend API
✅ Products load dynamically from database
✅ Authentication with JWT tokens  
✅ Real-time data from database
✅ Error handling & loading states
✅ Token persistence in localStorage

## What to Test Next

1. **Full E2E Flow:**
   - Browse products → Click product → Read details → Login → Add to cart → Checkout

2. **Admin Features:**
   - Login as admin
   - Navigate to admin dashboard (if implemented)
   - View stats from `/api/admin/dashboard/stats`

3. **User Actions:**
   - Add to wishlist
   - Write reviews
   - Create orders
   - View profile

## Deployment Notes

When ready to deploy:

- Update `.env.local` to production API URL
- Build frontend: `npm run build`
- Deploy Next.js to Vercel/similar
- Deploy Laravel backend separately
- Configure CORS in backend for production domain
