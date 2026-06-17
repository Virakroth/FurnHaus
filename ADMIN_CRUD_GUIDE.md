# Admin CRUD System - Quick Start Guide

## What Was Added

I've added a complete **Admin Product CRUD** system to your Furniture House app:

### Features:

✅ **Admin-only access** - Only users with admin role can see the CRUD button
✅ **Add Products** - Form to add new products with:

- Product Name (required)
- Price (required)
- Rating (1-5 stars)
- Category (dropdown, fetched from API)
- Materials (checkboxes: Wood, Fabric, Metal, Leather, Glass, Plastic)
- Image URL
- Description
- Quantity

✅ **Visible on Shop Page** - "Add New Product" button appears on `/shop` for admins
✅ **Auto-refresh** - Product list refreshes after successfully adding a product
✅ **Auto slug generation** - Creates URL-friendly product slugs automatically

---

## How to Test It

### Step 1: Create an Admin User

You need to create/modify a user to have admin role:

**Option A: Register new user and set admin role in DB**

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

**Option B: Add to database seeds** (optional)
See `backend/database/seeders/` for user seeding

### Step 2: Login as Admin

1. Go to `/login`
2. Register or login with your admin account
3. You should be redirected to `/dashboard`

### Step 3: Navigate to Shop

1. Go to `/shop` page
2. You should see a **black "Add New Product" button** at the top
3. Click it to open the product form

### Step 4: Add a Product

1. Fill in required fields:
   - **Name**: e.g., "Modern Desk Chair"
   - **Price**: e.g., 299.99
   - **Category**: Select from dropdown
2. Optional fields:
   - **Rating**: 1-5 (defaults to 5)
   - **Materials**: Check any that apply
   - **Image URL**: Use format like `/products/Chairs/IMAGE...jpg`
   - **Description**: Product details
   - **Quantity**: Stock amount
3. Click **"Add Product"**
4. See success message
5. Product appears in shop list

---

## Files Created/Modified

### New Files:

- `app/lib/auth.ts` - Authentication utilities
- `app/components/ProductCRUD.tsx` - Admin CRUD form component

### Modified Files:

- `app/lib/api.ts` - Added product CRUD API functions
- `app/shop/page.tsx` - Integrated ProductCRUD component

### Backend (Already Exists):

- `backend/routes/admin.php` - Admin API routes (protected)
- `backend/app/Http/Controllers/Api/Admin/ProductController.php` - CRUD logic

---

## API Endpoints Used

All protected by `auth:sanctum` and `admin` middleware:

```
POST   /api/admin/products           - Create product
GET    /api/admin/products           - List all products (admin)
PUT    /api/admin/products/{id}      - Update product
DELETE /api/admin/products/{id}      - Delete product
```

---

## Troubleshooting

**"Add New Product" button not showing?**

- Make sure you're logged in as a user with `role = 'admin'`
- Check browser DevTools Console for errors
- Verify localStorage has token and user with correct role

**Product not appearing after submission?**

- Check browser console for error messages
- Verify category ID exists in database
- Check backend logs: `php artisan logs`

**Form validation errors?**

- Name and Price are required
- Category must be selected
- Price must be a valid number

---

## Testing Complete CRUD

Once basic add works, you can enhance with:

- **Update Product**: Add PUT form in admin panel
- **Delete Product**: Add delete button next to each product
- **Edit Existing**: Click product to edit its details
- **Bulk Actions**: Select multiple products for bulk operations

These can be added following the same pattern!
