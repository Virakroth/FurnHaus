# FurnHaus - Complete System Architecture & Integration Plan

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js 16 Frontend (React 19 + TypeScript)            │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Pages:                                                   │  │
│  │  ├─ Home, Shop, Product, Cart, Checkout                 │  │
│  │  ├─ Login/Register, Dashboard                           │  │
│  │  ├─ About, Blog, Contact                                │  │
│  │  │                                                        │  │
│  │  Components:                                             │  │
│  │  ├─ Header, Footer, ProductCard                         │  │
│  │  ├─ Forms, Modals, Notifications                        │  │
│  │  └─ Protected Routes (after auth)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↓                                      │
│                    HTTP/HTTPS (JSON)                            │
│                           ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Laravel Sanctum (API Authentication)                   │  │
│  │  ├─ Token validation                                     │  │
│  │  ├─ Rate limiting                                        │  │
│  │  ├─ CORS handling                                        │  │
│  │  └─ Request validation                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  REST APIs (35+ Endpoints)                               │  │
│  │  ├─ /api/auth/*              (Authentication)            │  │
│  │  ├─ /api/products/*          (Product Management)        │  │
│  │  ├─ /api/orders/*            (Order Management)          │  │
│  │  ├─ /api/cart/*              (Shopping Cart)             │  │
│  │  ├─ /api/user/*              (User Management)           │  │
│  │  ├─ /api/blog/*              (Blog)                      │  │
│  │  └─ /api/admin/*             (Admin Functions)           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Laravel Application                                      │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Controllers (Business Logic)                      │  │  │
│  │  │  ├─ AuthController                                │  │  │
│  │  │  ├─ ProductController                             │  │  │
│  │  │  ├─ OrderController                               │  │  │
│  │  │  ├─ UserController                                │  │  │
│  │  │  └─ AdminController                               │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Services (Business Rules)                         │  │  │
│  │  │  ├─ AuthService                                    │  │  │
│  │  │  ├─ OrderService                                   │  │  │
│  │  │  ├─ PaymentService                                 │  │  │
│  │  │  ├─ EmailService                                   │  │  │
│  │  │  └─ CartService                                    │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Models (Data Representation)                      │  │  │
│  │  │  ├─ User, Product, Order, Category                │  │  │
│  │  │  ├─ Review, Blog, Comment, Wishlist               │  │  │
│  │  │  ├─ Address, Notification, Settings               │  │  │
│  │  │  └─ Discount                                       │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Middleware (Requests Processing)                  │  │  │
│  │  │  ├─ Auth (JWT verification)                        │  │  │
│  │  │  ├─ Admin (role-based access)                      │  │  │
│  │  │  └─ RequestValidation                              │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↓                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  MySQL/PostgreSQL Database (14 Tables)                  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                            │  │
│  │  Authentication:        settings                          │  │
│  │  ├─ users              Promotion:                        │  │
│  │  ├─ personal_access_tokens  ├─ discounts                │  │
│  │                                                            │  │
│  │  Products:             Content:                          │  │
│  │  ├─ categories         ├─ blog_posts                     │  │
│  │  ├─ products           ├─ blog_categories                │  │
│  │  └─ reviews            └─ blog_comments                  │  │
│  │                                                            │  │
│  │  Orders:               User Data:                         │  │
│  │  ├─ orders             ├─ addresses                      │  │
│  │  ├─ order_items        ├─ wishlists                      │  │
│  │  └─ carts              └─ notifications                  │  │
│  │                                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Caching Layer (Redis)                                   │  │
│  │  ├─ Session caching                                      │  │
│  │  ├─ Product catalog caching                              │  │
│  │  ├─ User data caching                                    │  │
│  │  └─ API response caching                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  File Storage                                             │  │
│  │  ├─ Product images (local/S3)                            │  │
│  │  ├─ User avatars (local/S3)                              │  │
│  │  └─ Blog images (local/S3)                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Stripe     │  │  SendGrid    │  │   AWS S3     │          │
│  │   (Payments) │  │   (Email)    │  │  (Storage)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Sentry      │  │  DataDog     │  │  Analytics   │          │
│  │(Error Track.)│  │(Monitoring)  │  │  (Traffic)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Registration & Authentication Flow

```
┌─ User (Frontend) ─┐
│  Fills Register   │
│  Form             │
└────────┬──────────┘
         │
         ↓
    [POST /api/auth/register]
    {
      "email": "user@email.com",
      "password": "****",
      "first_name": "John",
      "last_name": "Doe"
    }
         │
         ↓
    ┌─ Laravel API ─┐
    │ AuthController│
    └────────┬──────┘
             │ Validate Request
             │ Hash Password
             │ Create User
             │
             ↓
    ┌─ Database ─┐
    │ INSERT     │
    │ INTO users │
    └────────┬───┘
             │
             ↓
    ┌─ Email Service ─┐
    │ Send verification│
    │ email (SendGrid) │
    └────────┬─────────┘
             │
             ↓
    ┌─ Response ─┐
    │ 201 Created│
    │ {          │
    │  "token":  │
    │  "user":   │
    │ }          │
    └────────┬───┘
             │
             ↓
    Store token in
    localStorage
    (Frontend)
    Redirect to Home
```

### 2. Product Purchase Flow

```
┌─ Browse Products ─┐
│ GET /api/products │ → Display on Shop page
└────────┬──────────┘
         │
         ↓
┌─ View Product Details ─┐
│ GET /api/products/{id} │ → Display on Product page
│ GET /api/products/{id}/related │ → Related products
└────────┬──────────────┘
         │
         ↓
┌─ Add to Cart ─┐
│ POST /api/cart │
│ {              │
│  "product_id": │
│  "quantity":   │
│ }              │
└────────┬───────┘
         │
         ↓
┌─ View Cart ─┐
│ GET /api/cart │ → Display items
└────────┬──────┘
         │
         ↓
┌─ Proceed to Checkout ─┐
│ POST /api/orders      │
│ {                     │
│  "items": [...],      │
│  "address_id":        │
│ }                     │
└────────┬──────────────┘
         │
         ↓
┌─ Payment Processing ─┐
│ Stripe Integration   │
│ Authorize payment    │
└────────┬──────────────┘
         │
         ↓ (if successful)
┌─ Create Order ─┐
│ INSERT orders  │
│ INSERT order_items
│ UPDATE inventory
└────────┬───────┘
         │
         ↓
┌─ Send Confirmation ─┐
│ Email order receipt │
│ (SendGrid)          │
└────────┬────────────┘
         │
         ↓
┌─ Redirect ─┐
│ /order-success │ → Show confirmation
└─────────────────┘
```

### 3. Admin Dashboard Authorization Flow

```
┌─ Admin Login ─┐
│ POST /api/auth/login │
└────────┬─────────────┘
         │
         ↓
┌─ Verify credentials ─┐
│ Check user role      │
│ admin? → YES → Token │
│          NO  → Error │
└────────┬──────────────┘
         │
         ↓
┌─ Access Admin Routes ─┐
│ Headers: {            │
│  "Authorization":     │
│  "Bearer {token}"     │
│ }                     │
└────────┬──────────────┘
         │
         ↓
┌─ AuthMiddleware ─┐
│ Verify token     │
│ Check role=admin │
│ Allow? → YES     │
│         NO → 403 │
└────────┬─────────┘
         │
         ↓
┌─ Load Admin Dashboard ─┐
│ GET /admin/dashboard    │ → Statistics
│ GET /api/admin/users    │ → Users list
│ GET /api/admin/products │ → Products list
│ GET /api/admin/orders   │ → Orders list
└─────────────────────────┘
```

---

## Frontend Integration Checklist

### **Phase 1: State Management Setup**

- [ ] Create API client using Axios/Fetch
- [ ] Create authentication context/hook
- [ ] Create token storage (localStorage)
- [ ] Create error handling interceptor
- [ ] Create loading state management

### **Phase 2: Authentication Integration**

- [ ] Update login page to call `/api/auth/login`
- [ ] Update register page to call `/api/auth/register`
- [ ] Store token in localStorage
- [ ] Implement protected routes
- [ ] Add logout functionality
- [ ] Add password reset flow

### **Phase 3: Product & Shop Integration**

- [ ] Replace mock products with `/api/products`
- [ ] Implement working filters
- [ ] Add search functionality
- [ ] Implement sorting
- [ ] Add pagination
- [ ] Cache product data

### **Phase 4: Cart & Checkout Integration**

- [ ] Connect cart to `/api/cart` endpoints
- [ ] Persist cart in backend
- [ ] Integrate Stripe payment
- [ ] Call `/api/orders` to create order
- [ ] Show order confirmation

### **Phase 5: User Dashboard Integration**

- [ ] Display user profile from `/api/user/profile`
- [ ] Show user orders from `/api/user/orders`
- [ ] Display wishlist from `/api/user/wishlist`
- [ ] Show user addresses from `/api/user/addresses`
- [ ] Allow profile updates

### **Phase 6: Blog Integration**

- [ ] Replace mock blog posts with `/api/blog`
- [ ] Implement blog detail view
- [ ] Add comment functionality

---

## API Response Format Standard

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Product Name",
    "price": 99.99
  },
  "message": "Operation successful"
}
```

### Paginated Response (200)

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Product 1" },
    { "id": 2, "name": "Product 2" }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "per_page": 15,
    "total": 150
  }
}
```

### Error Response (4xx/5xx)

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

## Security Considerations

### Frontend Security

- ✅ Never store sensitive data in localStorage (only tokens)
- ✅ Use HTTPS only
- ✅ Validate user input
- ✅ Sanitize output
- ✅ Implement CSRF protection
- ✅ Use secure cookies for tokens

### Backend Security

- ✅ Hash passwords with bcrypt
- ✅ Validate all inputs server-side
- ✅ Use parameterized queries
- ✅ Implement rate limiting
- ✅ Use CORS properly
- ✅ Add API request signing
- ✅ Implement proper authorization checks
- ✅ Log security events
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS/TLS

---

## Performance Optimization

### Frontend

- Implement code splitting
- Lazy load images
- Implement infinite scroll or pagination
- Cache API responses
- Minify CSS/JS
- Compress images

### Backend

- Implement database indexing
- Use eager loading (prevent N+1 queries)
- Implement caching (Redis)
- Use database connection pooling
- Optimize database queries
- Implement pagination (max 100 items)
- Use CDN for static assets

---

## Monitoring & Analytics

### Error Tracking

- [ ] Set up Sentry for error tracking
- [ ] Configure error alerts
- [ ] Track API errors
- [ ] Monitor database errors

### Performance Monitoring

- [ ] Set up DataDog/New Relic
- [ ] Monitor API response times
- [ ] Track database query performance
- [ ] Monitor server resource usage

### Business Analytics

- [ ] Track user registration
- [ ] Track product views
- [ ] Track purchases
- [ ] Track revenue
- [ ] Track user retention

---

## Deployment Architecture

```
┌─ Production Environment ─┐
│                          │
│  ┌────────────────────┐  │
│  │ Load Balancer      │  │
│  │ (Nginx/HAProxy)    │  │
│  └────────┬───────────┘  │
│           │              │
│  ┌────────┴───────────┐  │
│  │                    │  │
│  ↓                    ↓  │
│ ┌──────────┐      ┌──────────┐
│ │ Laravel  │      │ Laravel  │
│ │ API #1   │      │ API #2   │
│ │ (App     │      │ (App     │
│ │ Server)  │      │ Server)  │
│ └──────────┘      └──────────┘
│       │               │
│       └───────┬───────┘
│               │
│       ┌───────▼─────────┐
│       │ Database        │
│       │ (Master-Slave)  │
│       │ MySQL/PostgreSQL│
│       └─────────────────┘
│
│   ┌─────────────────────┐
│   │ Cache Layer (Redis) │
│   └─────────────────────┘
│
│   ┌──────────────────────┐
│   │ File Storage (S3)    │
│   └──────────────────────┘
│
└──────────────────────────┘
```

---

## Summary

Your FurnHaus project has a solid frontend. The backend implementation will follow a clean, scalable architecture:

1. **Database First**: 14 well-designed tables with proper relationships
2. **API-Centric**: RESTful APIs for all features
3. **Security**: JWT/Sanctum authentication and authorization
4. **Admin Control**: Complete admin dashboard for content management
5. **Scalability**: Caching, pagination, optimization ready

**Next Steps**:

1. Confirm backend technology choices
2. Set up Laravel project
3. Create database migrations
4. Build models and controllers
5. Implement APIs
6. Build admin dashboard
7. Integrate frontend

**Ready to begin implementation? 🚀**
