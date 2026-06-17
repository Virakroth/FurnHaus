# FurnHaus Backend API Documentation

## Overview

Complete REST API for the FurnHaus e-commerce platform built with Laravel 11 + Sanctum.

## Base URL

```
http://localhost:8000/api
```

## Authentication

Uses Laravel Sanctum for API authentication. Include token in header:

```
Authorization: Bearer {token}
```

---

## API Endpoints

### Authentication

#### Register

```
POST /auth/register
```

**Body:**

```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "+1 (555) 123-4567"
}
```

#### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout (Authenticated)

```
POST /auth/logout
```

#### Refresh Token (Authenticated)

```
POST /auth/refresh
```

#### Get Current User (Authenticated)

```
GET /auth/me
```

---

### Products

#### Get All Products

```
GET /products?page=1&per_page=15&sort_by=newest&category_id=1&min_price=100&max_price=500
```

**Query Parameters:**

- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 15)
- `sort_by` - Sort method: newest, price_low, price_high, rating, popular
- `category_id` - Filter by category
- `min_price` - Minimum price
- `max_price` - Maximum price
- `material` - Filter by material
- `color` - Filter by color
- `search` - Full-text search
- `in_stock` - Only in-stock items

#### Get Featured Products

```
GET /products/featured
```

#### Get Single Product

```
GET /products/{id}
```

#### Get Related Products

```
GET /products/{id}/related
```

---

### Categories

#### Get All Categories

```
GET /categories
```

#### Get Category

```
GET /categories/{id}
```

---

### Reviews

#### Get Product Reviews

```
GET /products/{product_id}/reviews?page=1
```

#### Post Review (Authenticated)

```
POST /products/{product_id}/reviews
```

**Body:**

```json
{
  "rating": 5,
  "title": "Great product!",
  "comment": "Very satisfied with this purchase."
}
```

---

### Orders (Authenticated)

#### Get User Orders

```
GET /orders?page=1
```

#### Get Order Details

```
GET /orders/{id}
```

#### Create Order

```
POST /orders
```

**Body:**

```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ],
  "shipping_amount": 10,
  "discount_amount": 0
}
```

---

### User Profile (Authenticated)

#### Get Profile

```
GET /user/profile
```

#### Update Profile

```
PUT /user/profile
```

**Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1 (555) 123-4567"
}
```

#### Change Password

```
POST /user/change-password
```

**Body:**

```json
{
  "current_password": "old_password",
  "new_password": "new_password",
  "new_password_confirmation": "new_password"
}
```

---

### Addresses (Authenticated)

#### Get All Addresses

```
GET /user/addresses
```

#### Create Address

```
POST /user/addresses
```

**Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1 (555) 123-4567",
  "street_address": "123 Main St",
  "apartment": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "postal_code": "10001",
  "country": "USA",
  "address_type": "billing",
  "is_default": true
}
```

#### Update Address

```
PUT /user/addresses/{id}
```

#### Delete Address

```
DELETE /user/addresses/{id}
```

---

### Wishlist (Authenticated)

#### Get Wishlist

```
GET /wishlist?page=1
```

#### Add to Wishlist

```
POST /wishlist
```

**Body:**

```json
{
  "product_id": 1
}
```

#### Remove from Wishlist

```
DELETE /wishlist/{id}
```

---

### Blog

#### Get Blog Posts

```
GET /blog?page=1
```

#### Get Blog Post

```
GET /blog/{id}
```

---

### Admin Endpoints (Admin Role Required)

#### Dashboard Statistics

```
GET /admin/dashboard/stats
```

#### Get All Products (Admin)

```
GET /admin/products
```

#### Create Product

```
POST /admin/products
```

#### Update Product

```
PUT /admin/products/{id}
```

#### Delete Product

```
DELETE /admin/products/{id}
```

#### Get All Orders (Admin)

```
GET /admin/orders
```

#### Update Order Status

```
PUT /admin/orders/{id}/status
```

**Body:**

```json
{
  "status": "shipped"
}
```

#### Get All Users (Admin)

```
GET /admin/users
```

#### Update User Role

```
PUT /admin/users/{id}/role
```

**Body:**

```json
{
  "role": "admin"
}
```

#### Update User Status

```
PUT /admin/users/{id}/status
```

**Body:**

```json
{
  "status": "suspended"
}
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Error description"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "total": 150,
    "total_pages": 10
  }
}
```

---

## HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human readable message"
}
```

Validation errors include field details:

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "The email field is required",
  "errors": {
    "email": ["The email field is required"]
  }
}
```

---

## Rate Limiting

Coming soon. Currently no rate limiting applied.

---

## Testing

### Using Postman

Import the API collection (available in docs/ folder)

### Using cURL

```bash
curl -X GET http://localhost:8000/api/products \
  -H "Accept: application/json"
```

---

## Support

Email: api-support@furnhaus.com
