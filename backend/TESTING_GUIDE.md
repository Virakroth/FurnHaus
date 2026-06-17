# Backend Testing Guide

## Quick Start Testing

### Step 1: Start the Server

```bash
cd backend
php artisan serve --port=8000
```

Server will be available at: `http://localhost:8000`

### Step 2: Test Accounts

Use these credentials for testing:

**Admin Account:**

- Email: `admin@furnhaus.com`
- Password: `password123`
- Role: `admin`

**Customer Account:**

- Email: `customer@furnhaus.com`
- Password: `password123`
- Role: `customer`

---

## Complete API Testing Walkthrough

### 1. AUTHENTICATION ENDPOINTS

#### 1.1 Register New User

```bash
curl -X POST 'http://localhost:8000/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+1 (555) 987-6543"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 3,
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "customer",
      "status": "active"
    },
    "token": "2|ABC123..."
  },
  "message": "User registered successfully"
}
```

#### 1.2 Login

```bash
curl -X POST 'http://localhost:8000/api/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "admin@furnhaus.com",
    "password": "password123"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "2|ABC123..."
  },
  "message": "Login successful"
}
```

**Save the token** for use in authenticated requests:

```bash
TOKEN="2|ABC123..."
```

#### 1.3 Get Current User

```bash
curl -X GET 'http://localhost:8000/api/auth/me' \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@furnhaus.com",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin"
  }
}
```

#### 1.4 Refresh Token

```bash
curl -X POST 'http://localhost:8000/api/auth/refresh' \
  -H "Authorization: Bearer $TOKEN"
```

#### 1.5 Logout

```bash
curl -X POST 'http://localhost:8000/api/auth/logout' \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 2. PRODUCTS ENDPOINTS (Public)

#### 2.1 Get All Products with Filters

```bash
curl 'http://localhost:8000/api/products'
```

**With Filters:**

```bash
curl 'http://localhost:8000/api/products?category_id=1&min_price=100&max_price=1000&sort=price&order=asc&page=1'
```

**Query Parameters:**

- `category_id` - Filter by category ID
- `min_price` - Minimum price
- `max_price` - Maximum price
- `search` - Search by name/description
- `sort` - Sort by: price, rating, name, created_at
- `order` - asc or desc
- `per_page` - Items per page (default: 15)
- `page` - Page number

**Expected Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Luxury Leather Sofa",
      "price": 1299,
      "rating": 4.8,
      "stock": 15,
      "image": "/images/sofa.jpg"
    }
  ],
  "pagination": {
    "total": 16,
    "per_page": 15,
    "current_page": 1
  }
}
```

#### 2.2 Get Single Product

```bash
curl 'http://localhost:8000/api/products/1'
```

#### 2.3 Get Featured Products

```bash
curl 'http://localhost:8000/api/products/featured'
```

#### 2.4 Get Related Products

```bash
curl 'http://localhost:8000/api/products/1/related'
```

#### 2.5 Get Product Reviews

```bash
curl 'http://localhost:8000/api/products/1/reviews'
```

---

### 3. CATEGORY ENDPOINTS (Public)

#### 3.1 Get All Categories

```bash
curl 'http://localhost:8000/api/categories'
```

**Expected Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Chairs",
      "slug": "chairs",
      "description": "Comfortable seating options...",
      "image": "/images/chairs.jpg"
    }
  ]
}
```

#### 3.2 Get Category with Products

```bash
curl 'http://localhost:8000/api/categories/1?include=products'
```

---

### 4. AUTHENTICATED USER ENDPOINTS

#### 4.1 Get User Profile

```bash
curl -X GET 'http://localhost:8000/api/user/profile' \
  -H "Authorization: Bearer $TOKEN"
```

#### 4.2 Update User Profile

```bash
curl -X PUT 'http://localhost:8000/api/user/profile' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "John",
    "last_name": "Updated",
    "phone": "+1 (555) 111-2222"
  }'
```

#### 4.3 Get User Orders

```bash
curl -X GET 'http://localhost:8000/api/user/orders' \
  -H "Authorization: Bearer $TOKEN"
```

---

### 5. WISHLIST ENDPOINTS (Authenticated)

#### 5.1 Get Wishlist

```bash
curl -X GET 'http://localhost:8000/api/wishlist' \
  -H "Authorization: Bearer $TOKEN"
```

#### 5.2 Add to Wishlist

```bash
curl -X POST 'http://localhost:8000/api/wishlist' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"product_id": 1}'
```

#### 5.3 Remove from Wishlist

```bash
curl -X DELETE 'http://localhost:8000/api/wishlist/1' \
  -H "Authorization: Bearer $TOKEN"
```

---

### 6. REVIEWS ENDPOINTS

#### 6.1 Create Review

```bash
curl -X POST 'http://localhost:8000/api/reviews' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "product_id": 1,
    "rating": 5,
    "title": "Excellent Product",
    "comment": "Very satisfied with this purchase!"
  }'
```

#### 6.2 Update Review

```bash
curl -X PUT 'http://localhost:8000/api/reviews/1' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "rating": 4,
    "comment": "Good but could be better"
  }'
```

#### 6.3 Delete Review

```bash
curl -X DELETE 'http://localhost:8000/api/reviews/1' \
  -H "Authorization: Bearer $TOKEN"
```

---

### 7. ORDER ENDPOINTS (Authenticated)

#### 7.1 Create Order

```bash
curl -X POST 'http://localhost:8000/api/orders' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "items": [
      {
        "product_id": 1,
        "quantity": 2
      },
      {
        "product_id": 2,
        "quantity": 1
      }
    ],
    "shipping_address_id": 1,
    "billing_address_id": 1,
    "payment_method": "credit_card",
    "notes": "Please deliver in morning"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_number": "ORD-20260615-001",
    "status": "pending",
    "total": 2597,
    "items": [...],
    "created_at": "2026-06-15T..."
  }
}
```

#### 7.2 Get Order Details

```bash
curl -X GET 'http://localhost:8000/api/orders/1' \
  -H "Authorization: Bearer $TOKEN"
```

#### 7.3 Get User Orders

```bash
curl -X GET 'http://localhost:8000/api/user/orders' \
  -H "Authorization: Bearer $TOKEN"
```

#### 7.4 Cancel Order

```bash
curl -X POST 'http://localhost:8000/api/orders/1/cancel' \
  -H "Authorization: Bearer $TOKEN"
```

---

### 8. BLOG ENDPOINTS (Public)

#### 8.1 Get All Blog Posts

```bash
curl 'http://localhost:8000/api/blog/posts'
```

#### 8.2 Get Single Blog Post

```bash
curl 'http://localhost:8000/api/blog/posts/1'
```

#### 8.3 Get Blog Categories

```bash
curl 'http://localhost:8000/api/blog/categories'
```

---

### 9. ADMIN ENDPOINTS (Requires Admin Token)

Get admin token first:

```bash
ADMIN_TOKEN=$(curl -s -X POST 'http://localhost:8000/api/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@furnhaus.com","password":"password123"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)
```

#### 9.1 Get Dashboard Stats

```bash
curl -X GET 'http://localhost:8000/api/admin/dashboard/stats' \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "total_orders": 5,
    "total_revenue": 12500,
    "total_customers": 150,
    "total_products": 50,
    "orders_this_month": 12,
    "revenue_this_month": 8500,
    "pending_orders": 3,
    "low_stock_products": 2
  }
}
```

#### 9.2 Create Product (Admin)

```bash
curl -X POST 'http://localhost:8000/api/admin/products' \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Modern Office Chair",
    "sku": "CHAIR-001",
    "price": 399,
    "cost": 150,
    "category_id": 1,
    "description": "Ergonomic office chair",
    "short_description": "Comfortable seating",
    "stock": 20,
    "rating": 4.5
  }'
```

#### 9.3 Update Product (Admin)

```bash
curl -X PUT 'http://localhost:8000/api/admin/products/1' \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Updated Chair Name",
    "price": 449,
    "stock": 15
  }'
```

#### 9.4 Delete Product (Admin)

```bash
curl -X DELETE 'http://localhost:8000/api/admin/products/1' \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 9.5 Get All Orders (Admin)

```bash
curl -X GET 'http://localhost:8000/api/admin/orders' \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 9.6 Update Order Status (Admin)

```bash
curl -X PATCH 'http://localhost:8000/api/admin/orders/1/status' \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "status": "shipped"
  }'
```

#### 9.7 Get All Users (Admin)

```bash
curl -X GET 'http://localhost:8000/api/admin/users' \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Using Postman for Testing

### 1. Import Collection

Create a new Postman collection with the endpoints above.

### 2. Set Variables

In Postman, create environment variables:

- `base_url` = `http://localhost:8000`
- `token` = (set after login)
- `admin_token` = (set after admin login)

### 3. Use in Requests

```
GET {{base_url}}/api/products
Authorization: Bearer {{token}}
```

---

## Testing with JavaScript/Node.js

```javascript
const BASE_URL = "http://localhost:8000/api";

// Login
const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@furnhaus.com",
    password: "password123",
  }),
});

const { data } = await loginResponse.json();
const token = data.token;

// Get Products
const productsResponse = await fetch(`${BASE_URL}/products`, {
  headers: { Authorization: `Bearer ${token}` },
});

const products = await productsResponse.json();
console.log(products);
```

---

## Common Issues & Solutions

### Issue: 401 Unauthorized

**Solution:** Token expired or missing. Re-login and get a new token.

### Issue: 403 Forbidden

**Solution:** User doesn't have admin role. Use admin account.

### Issue: 404 Not Found

**Solution:** Resource ID doesn't exist. Check ID in database first.

### Issue: 422 Unprocessable Entity

**Solution:** Validation error. Check required fields in request.

### Issue: 500 Internal Server Error

**Solution:** Check Laravel logs:

```bash
tail -50 storage/logs/laravel.log
```

---

## Quick Test Checklist

- [ ] Server starts without errors
- [ ] Register new user works
- [ ] Login returns token
- [ ] Get current user works with token
- [ ] Get all products works
- [ ] Get single product works
- [ ] Get categories works
- [ ] Admin can view stats
- [ ] Admin can create product
- [ ] Admin can update order status
- [ ] Create order works
- [ ] Add to wishlist works
- [ ] Create review works
- [ ] Logout works

All tests should show `"success": true` in responses.
