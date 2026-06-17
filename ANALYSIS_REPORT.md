# FurnHaus E-Commerce Project - Comprehensive Analysis Report

**Date**: June 15, 2026  
**Project**: Furniture E-Commerce Platform  
**Status**: Frontend Complete | Backend & Admin Dashboard Required

---

## EXECUTIVE SUMMARY

Your FurnHaus project is a **production-ready frontend** built with Next.js 16, featuring 10 pages and 3 reusable components. All data is currently **hardcoded/mocked**, requiring a complete backend infrastructure using Laravel, database design, REST APIs, and an admin dashboard.

---

# PART 1: FRONTEND ARCHITECTURE ANALYSIS

## 1.1 Technology Stack

| Component       | Technology   | Version     |
| --------------- | ------------ | ----------- |
| Framework       | Next.js      | 16.2.9      |
| Runtime         | React        | 19.2.4      |
| Language        | TypeScript   | 5           |
| Styling         | Tailwind CSS | 4           |
| Icons           | Lucide React | 1.17.0      |
| Type Safety     | TypeScript   | Strict Mode |
| Node Version    |              | 18+ (ESM)   |
| Package Manager | npm          | 10+         |

## 1.2 Project Folder Structure

```
furniturehouse_2/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Home page
│   │
│   ├── components/
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Footer
│   │   └── ProductCard.tsx       # Reusable product card
│   │
│   ├── lib/
│   │   └── mock-data.ts          # Static product & blog data
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   │
│   ├── shop/
│   │   └── page.tsx              # Products listing (w/ filters)
│   │
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx          # Product detail page
│   │
│   ├── cart/
│   │   └── page.tsx              # Shopping cart
│   │
│   ├── checkout/
│   │   └── page.tsx              # Multi-step checkout
│   │
│   ├── login/
│   │   └── page.tsx              # Login/Register page
│   │
│   ├── dashboard/
│   │   └── page.tsx              # Customer dashboard
│   │
│   ├── about/
│   │   └── page.tsx              # About page
│   │
│   ├── blog/
│   │   └── page.tsx              # Blog listing
│   │
│   └── contact/
│       └── page.tsx              # Contact form
│
├── public/
│   └── products/                 # Product images by category
│       ├── Chairs/
│       ├── Sofas/
│       ├── Tables/
│       ├── Beds/
│       ├── Shelves/
│       ├── Desk & Office/
│       ├── Lamp & Lighting/
│       ├── Rugs & Accessories/
│       └── Hero:Banner images/
│
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind setup
└── postcss.config.mjs           # PostCSS config
```

## 1.3 Routing Structure

| Route           | Component               | Purpose                        | Data Source    |
| --------------- | ----------------------- | ------------------------------ | -------------- |
| `/`             | `page.tsx`              | Home/Hero + Featured Products  | Mock Data      |
| `/shop`         | `shop/page.tsx`         | Product catalog w/ filters     | Mock Data      |
| `/product/[id]` | `product/[id]/page.tsx` | Product detail view            | Mock Data      |
| `/cart`         | `cart/page.tsx`         | Shopping cart (2 sample items) | Client State   |
| `/checkout`     | `checkout/page.tsx`     | Multi-step checkout flow       | Client State   |
| `/login`        | `login/page.tsx`        | Login/Register forms           | None           |
| `/dashboard`    | `dashboard/page.tsx`    | Customer profile & orders      | Mock Data      |
| `/about`        | `about/page.tsx`        | Company information            | Static Content |
| `/blog`         | `blog/page.tsx`         | Blog posts listing             | Mock Data      |
| `/contact`      | `contact/page.tsx`      | Contact form                   | None           |

## 1.4 Components Hierarchy

### **Header Component** (`app/components/Header.tsx`)

- **Type**: Client Component (`'use client'`)
- **Purpose**: Navigation & site branding
- **Features**:
  - Logo linking to home
  - Navigation menu (Home, Shop, About, Blog, Contact)
  - Search icon
  - User icon (links to login)
  - Shopping cart badge (currently shows 0)
  - Mobile responsive hamburger menu
- **Links**: None to backend yet
- **State**: `mobileOpen` (for mobile menu toggle)

### **ProductCard Component** (`app/components/ProductCard.tsx`)

- **Type**: Client Component (`'use client'`)
- **Purpose**: Reusable product display card
- **Features**:
  - Product image with hover zoom effect
  - Heart/wishlist button (stateful)
  - Product name, rating, reviews
  - Price display with discount support
  - Links to product detail page
- **Props**: `Product` interface
- **State**: `liked` (wishlist toggle)

### **Footer Component** (`app/components/Footer.tsx`)

- **Type**: Functional Component
- **Purpose**: Site footer with links
- **Sections**:
  - Brand info with social icons
  - Shop links
  - Company links
  - Support info
  - Legal links (Privacy, Terms, Shipping)
- **Links**: All internal navigation (no external APIs)

## 1.5 TypeScript Types & Interfaces

```typescript
// Product Interface
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For sales/discounts
  image: string;
  category: string;
  material: string;
  color: string;
  rating: number; // 1-5
  reviews: number; // Count of reviews
  inStock: boolean;
  description?: string;
}

// CartItem Interface
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

// Order Interface
interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: string; // e.g., "Pending", "Shipped", "Delivered"
  date: string;
}

// User Interface
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// BlogPost Interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}
```

## 1.6 Mock Data Analysis

### **Products Database**

- **Total Items**: 28 products
- **Categories**: 7 (Chairs, Sofas, Tables, Beds, Storage, Desks, Lighting, Accessories)
- **Price Range**: $99 - $1,299
- **Data Fields**:
  - id, name, price, originalPrice, image, category, material, color, rating, reviews, inStock, description

### **Product Categories & Count**

| Category           | Count  | Sample Price Range |
| ------------------ | ------ | ------------------ |
| Chairs             | 5      | $199 - $599        |
| Sofas              | 4      | $749 - $1,299      |
| Tables             | 4      | $299 - $599        |
| Beds               | 3      | $499 - $1,099      |
| Storage/Shelves    | 4      | $129 - $449        |
| Desks              | 3      | $449 - $699        |
| Lighting           | 3      | $99 - $229         |
| Rugs & Accessories | 2      | $149 - $399        |
| **TOTAL**          | **28** | **$99 - $1,299**   |

### **Blog Posts**

- **Total**: 3 posts
- **Categories**: Design Tips, Furniture Guide, Trends
- **Fields**: id, title, excerpt, image, date, category

## 1.7 State Management Approach

### **Current Implementation**

- **Client-Side State**: React `useState` hook only
- **Examples**:
  - Mobile menu toggle in Header
  - Product wishlist toggle in ProductCard
  - Cart quantity adjustment
  - Checkout step tracking
  - Tab switching in Dashboard
- **Persistence**: NONE (all state lost on refresh)
- **Global State**: NONE (no Context API or Redux)

### **Issues**:

- ❌ No cart persistence (localStorage not implemented)
- ❌ No authentication state
- ❌ No user data persistence
- ❌ No real-time updates
- ❌ No error handling

---

## 1.8 Page-by-Page Analysis

### **1. HOME PAGE** (`/`)

**Purpose**: Hero section, featured products, value propositions

**Sections**:

1. **Hero Banner** - Full-width image with overlay and CTA
2. **Features** - 4 info cards (Free Shipping, Easy Returns, etc.)
3. **Categories** - 5 category cards with images
4. **Best Sellers** - Grid of 4 products
5. **Newsletter Signup** - Email subscription form
6. **Trust Badges** - Customer testimonials/ratings

**Data Required**:

- Hero image (static)
- Features data (static text)
- Categories list (needs dynamic data)
- Best sellers (from products)
- Newsletter config (email service)
- Testimonials (static content)

---

### **2. SHOP PAGE** (`/shop`)

**Purpose**: Product catalog with advanced filtering

**Features**:

- **Sidebar Filters**:
  - Categories checkboxes (All, Chairs, Sofas, Tables, Storage, Desks, Bedroom)
  - Price ranges ($0-$200, $200-$500, $500-$1000, $1000+)
  - Materials (Wood, Fabric, Metal, Leather)
- **Sort Options**: Popularity, Price Low-High, Price High-Low, Newest
- **Product Grid**: 3 columns on desktop, responsive
- **Item Count**: Shows number of filtered results

**Current Issues**:

- Filters UI present but NOT FUNCTIONAL
- All 28 products always displayed
- No actual filtering logic

**Data Required**:

- All products
- Filter categories
- Material options

---

### **3. PRODUCT DETAIL** (`/product/[id]`)

**Purpose**: Individual product showcase with purchase options

**Features**:

- **Product Image Gallery**: Single large image
- **Product Info**:
  - Name, Price, Original Price (if on sale)
  - Star rating with review count
  - Material & Color specs
  - Full description
- **Purchase Options**:
  - Quantity selector
  - Add to Cart button
  - Wishlist button
- **Related Products**: 4 related items (same category)
- **Customer Reviews Section** (UI present, no data)

**Data Required**:

- Single product details
- Related products
- Reviews (if implemented)

---

### **4. CART PAGE** (`/cart`)

**Purpose**: Shopping cart management

**Features**:

- Cart items list (currently 2 hardcoded items)
- Remove/quantity adjustment buttons
- **Order Summary**:
  - Subtotal
  - Shipping (Free if > $100)
  - Tax (8% calculated)
  - Total
- Checkout & Continue Shopping buttons

**Current Issues**:

- Cart data is hardcoded (first 2 products)
- No cart persistence
- No item removal implementation

---

### **5. CHECKOUT PAGE** (`/checkout`)

**Purpose**: Multi-step purchase process

**Steps**:

1. **Shipping Information**:
   - First/Last name, Email
   - Address, City, State, ZIP
2. **Payment Method**:
   - Credit Card (form fields)
   - PayPal option
3. **Order Review**:
   - Summary of items
   - Final confirmation

**Current Issues**:

- UI only, no form submission
- No payment gateway integration
- No step progression logic

---

### **6. LOGIN PAGE** (`/login`)

**Purpose**: User authentication

**Features**:

- Login form (Email, Password)
- Remember me checkbox
- Forgot password link
- Register form toggle
- Register form (Name, Email, Password, Confirm Password)

**Current Issues**:

- No actual authentication
- No form submission
- No backend integration

---

### **7. DASHBOARD PAGE** (`/dashboard`)

**Purpose**: Customer account management

**Features**:

- Welcome greeting with user info
- **Statistics Cards**:
  - Total orders (12)
  - Wishlist items (8)
  - Total spent ($8,490)
  - Addresses (2)
- **Sidebar Navigation**:
  - My Orders
  - Wishlist
  - Account Settings
- **Orders Section**: Order list with ID, Date, Status, Total, Items

**Current Issues**:

- All data is hardcoded
- No actual user session
- Sidebar navigation works (tabs switch) but content is dummy

---

### **8. ABOUT PAGE** (`/about`)

**Purpose**: Company information and values

**Content**:

- Hero section with company intro
- Mission statement
- 3 core values (with icons)
- Team member cards
- Call-to-action

**Data**: All static (no database needed)

---

### **9. BLOG PAGE** (`/blog`)

**Purpose**: Content marketing and engagement

**Features**:

- Featured blog post (larger display)
- Blog post grid (remaining posts)
- Each post shows: Category tag, Date, Title, Excerpt, Read More link
- Currently 3 hardcoded posts

**Data Needed**:

- Blog posts CRUD
- Blog categories

---

### **10. CONTACT PAGE** (`/contact`)

**Purpose**: Customer communication

**Sections**:

- 3 info cards: Phone, Email, Address
- Contact form with fields:
  - Name, Email, Subject, Message
- Google Maps embed placeholder

**Current Issues**:

- Form has no submission logic
- No email service integration

---

## 1.9 Missing Functionality & Issues

### **Frontend Issues**

| Issue                         | Category         | Severity | Impact                             |
| ----------------------------- | ---------------- | -------- | ---------------------------------- |
| No cart persistence           | State Management | HIGH     | Users lose cart on refresh         |
| Filters not functional        | Shop Page        | HIGH     | Users can't filter products        |
| No authentication             | Security         | CRITICAL | No protected routes                |
| Forms don't submit            | UX               | HIGH     | Users can't complete actions       |
| No error handling             | Stability        | MEDIUM   | App crashes on errors              |
| No loading states             | UX               | MEDIUM   | No user feedback during requests   |
| No pagination                 | Scalability      | MEDIUM   | Only 28 products shown             |
| Hard-coded dashboard data     | Scalability      | MEDIUM   | Not personalized                   |
| No real images (placeholders) | UX               | LOW      | Need to upload from images/ folder |
| No slug-based blog URLs       | SEO              | LOW      | Blog posts use IDs instead         |

---

# PART 2: UI DATA REQUIREMENTS

## 2.1 Data Requirements by Page

| Page               | Displayed Data                                          | Database Tables Needed                                  | API Endpoints Needed                                                          |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Home**           | Categories, Featured Products, Blog Posts, Testimonials | categories, products, blog_posts, testimonials          | GET /categories, GET /products?featured=true, GET /blog?limit=3               |
| **Shop**           | All Products, Categories, Materials, Filters            | products, categories                                    | GET /products?filters, GET /categories, GET /materials                        |
| **Product Detail** | Product Info, Related Products, Reviews, Ratings        | products, reviews, ratings                              | GET /products/{id}, GET /products/{id}/related, GET /products/{id}/reviews    |
| **Cart**           | Cart Items, Quantities, Totals, Shipping                | orders, order_items, shipping_rates                     | POST /cart, PUT /cart/{item_id}, DELETE /cart/{item_id}, GET /shipping        |
| **Checkout**       | User Info, Order Items, Shipping Methods, Discounts     | users, orders, order_items, shipping_methods, discounts | POST /orders, POST /payments, GET /shipping-methods, POST /discounts/validate |
| **Login**          | User Credentials, Session                               | users                                                   | POST /auth/login, POST /auth/register, POST /auth/refresh                     |
| **Dashboard**      | User Info, Orders, Wishlist, Settings                   | users, orders, wishlists, addresses                     | GET /user/profile, GET /user/orders, GET /user/wishlist, PUT /user/settings   |
| **About**          | Company Info                                            | settings                                                | GET /settings/about (or static)                                               |
| **Blog**           | Blog Posts, Categories, Comments                        | blog_posts, blog_categories, comments                   | GET /blog, GET /blog/{id}                                                     |
| **Contact**        | Contact Info, Messages                                  | contact_messages, settings                              | GET /settings/contact, POST /contact/submit                                   |

---

## 2.2 Static vs Dynamic Data

### **STATIC DATA** (Content Management)

- Company name, logo, tagline
- Mission, vision, values
- Contact information
- Social media links
- Terms, privacy policy
- Navigation menus
- Feature descriptions

### **DYNAMIC DATA** (Database Required)

- **Products**: Name, price, description, image, stock, category, ratings
- **Users**: Email, password (hashed), profile, addresses, preferences
- **Orders**: Items, totals, status, dates, shipping address
- **Reviews**: Rating, comment, reviewer, product ID
- **Blog Posts**: Title, content, author, publish date, category
- **Cart**: User ID, items, quantities
- **Wishlist**: User ID, products
- **Categories**: Name, description, image
- **Notifications**: User ID, message, type, read status
- **Analytics**: Page views, user behavior, sales data

---

# PART 3: DATABASE DESIGN

## 3.1 Entity Relationship Diagram (ERD)

```
┌─────────────┐         ┌──────────────┐
│   users     │ 1───∞ │    orders     │
└─────────────┘         └──────────────┘
      │ ∞                    │ ∞
      │                      │
      │                 ┌────────────────┐
      │                 │  order_items   │
      │                 └────────────────┘
      │                      │ ∞
      │                      │
      │                 ┌─────────────┐
      │                 │  products   │
      │                 └─────────────┘
      │                      │ ∞
      │                      │
      │                 ┌───────────────┐
      │                 │ product_specs │
      │                 └───────────────┘
      │
      ├─ 1───∞ ┌──────────────┐
      │         │  addresses   │
      │         └──────────────┘
      │
      ├─ 1───∞ ┌──────────────┐
      │         │  wishlists   │
      │         └──────────────┘
      │
      ├─ 1───∞ ┌──────────────┐
      │         │    reviews   │
      │         └──────────────┘
      │
      └─ 1───∞ ┌──────────────┐
                │ notifications│
                └──────────────┘

┌──────────────┐     ┌───────────────┐
│  categories  │ 1─∞ │    products   │
└──────────────┘     └───────────────┘

┌───────────────┐    ┌──────────────┐
│  blog_posts   │ 1─∞ │  blog_comments│
└───────────────┘    └──────────────┘
     │
     │ ∞
     │
┌──────────────────┐
│ blog_categories  │
└──────────────────┘
```

---

## 3.2 Database Tables & Schema

### **1. users**

**Purpose**: Store customer and admin accounts

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
email               VARCHAR(255) UNIQUE NOT NULL
password            VARCHAR(255) NOT NULL (bcrypt hashed)
first_name          VARCHAR(100) NOT NULL
last_name           VARCHAR(100) NOT NULL
phone               VARCHAR(20) NULLABLE
avatar              VARCHAR(255) NULLABLE
role                ENUM('customer', 'admin', 'moderator') DEFAULT 'customer'
status              ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
email_verified_at   TIMESTAMP NULLABLE
phone_verified_at   TIMESTAMP NULLABLE
remember_token      VARCHAR(100) NULLABLE
last_login_at       TIMESTAMP NULLABLE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- hasMany: orders, addresses, reviews, wishlists, notifications

**Indexes**:

- PRIMARY (id)
- UNIQUE (email)
- INDEX (role)
- INDEX (status)
- INDEX (created_at)

---

### **2. categories**

**Purpose**: Product classification

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
name                VARCHAR(100) NOT NULL UNIQUE
slug                VARCHAR(100) UNIQUE NOT NULL
description         TEXT NULLABLE
image               VARCHAR(255) NULLABLE
icon                VARCHAR(255) NULLABLE
is_active           BOOLEAN DEFAULT TRUE
sort_order          INT DEFAULT 0
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- hasMany: products

**Indexes**:

- PRIMARY (id)
- UNIQUE (slug)
- INDEX (is_active)

---

### **3. products**

**Purpose**: Furniture inventory

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
name                VARCHAR(255) NOT NULL
slug                VARCHAR(255) UNIQUE NOT NULL
description         LONGTEXT NULLABLE
short_description   VARCHAR(500) NULLABLE
price               DECIMAL(10, 2) NOT NULL
original_price      DECIMAL(10, 2) NULLABLE
cost_price          DECIMAL(10, 2) NULLABLE
sku                 VARCHAR(100) UNIQUE NULLABLE
quantity            INT DEFAULT 0
category_id         BIGINT NOT NULL
material            VARCHAR(100) NULLABLE
color               VARCHAR(100) NULLABLE
dimensions          VARCHAR(255) NULLABLE
weight              DECIMAL(8, 2) NULLABLE
featured_image      VARCHAR(255) NOT NULL
gallery_images      JSON NULLABLE
rating              DECIMAL(3, 2) DEFAULT 0
reviews_count       INT DEFAULT 0
stock_status        ENUM('in_stock', 'low_stock', 'out_of_stock') DEFAULT 'in_stock'
is_active           BOOLEAN DEFAULT TRUE
is_featured         BOOLEAN DEFAULT FALSE
is_new              BOOLEAN DEFAULT FALSE
meta_title          VARCHAR(255) NULLABLE
meta_description    VARCHAR(255) NULLABLE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: category
- hasMany: order_items, reviews, wishlist_items
- hasMany: product_specs (through JSON or separate table)

**Indexes**:

- PRIMARY (id)
- UNIQUE (slug)
- INDEX (category_id)
- INDEX (price)
- INDEX (is_active, is_featured)
- INDEX (stock_status)

---

### **4. orders**

**Purpose**: Customer purchase records

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL
order_number        VARCHAR(50) UNIQUE NOT NULL
subtotal            DECIMAL(12, 2) NOT NULL
tax_amount          DECIMAL(10, 2) NOT NULL
shipping_amount     DECIMAL(10, 2) DEFAULT 0
discount_amount     DECIMAL(10, 2) DEFAULT 0
total               DECIMAL(12, 2) NOT NULL
status              ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending'
payment_status      ENUM('unpaid', 'paid', 'failed', 'refunded') DEFAULT 'unpaid'
payment_method      VARCHAR(50) NULLABLE
transaction_id      VARCHAR(255) NULLABLE
notes               TEXT NULLABLE
customer_notes      TEXT NULLABLE
ordered_at          TIMESTAMP NOT NULL
shipped_at          TIMESTAMP NULLABLE
delivered_at        TIMESTAMP NULLABLE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: user
- hasMany: order_items
- hasOne: shipping_address (foreign key in addresses table)
- hasOne: billing_address (foreign key in addresses table)

**Indexes**:

- PRIMARY (id)
- UNIQUE (order_number)
- INDEX (user_id)
- INDEX (status)
- INDEX (payment_status)
- INDEX (ordered_at)

---

### **5. order_items**

**Purpose**: Individual items in each order

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
order_id            BIGINT NOT NULL
product_id          BIGINT NOT NULL
product_name        VARCHAR(255) NOT NULL (denormalized snapshot)
product_sku         VARCHAR(100) NULLABLE
quantity            INT NOT NULL
unit_price          DECIMAL(10, 2) NOT NULL (price at time of order)
total_price         DECIMAL(12, 2) NOT NULL
attributes          JSON NULLABLE (color, size, material selected)
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: order
- belongsTo: product

**Indexes**:

- PRIMARY (id)
- INDEX (order_id)
- INDEX (product_id)

---

### **6. addresses**

**Purpose**: User delivery/billing addresses

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL
first_name          VARCHAR(100) NOT NULL
last_name           VARCHAR(100) NOT NULL
phone               VARCHAR(20) NOT NULL
street_address      VARCHAR(255) NOT NULL
apartment          VARCHAR(100) NULLABLE
city                VARCHAR(100) NOT NULL
state               VARCHAR(100) NOT NULL
postal_code         VARCHAR(20) NOT NULL
country             VARCHAR(100) NOT NULL DEFAULT 'USA'
address_type        ENUM('billing', 'shipping', 'both') DEFAULT 'both'
is_default          BOOLEAN DEFAULT FALSE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: user

**Indexes**:

- PRIMARY (id)
- INDEX (user_id)
- INDEX (is_default)

---

### **7. reviews**

**Purpose**: Product ratings and feedback

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
product_id          BIGINT NOT NULL
user_id             BIGINT NOT NULL
rating              INT NOT NULL (1-5)
title               VARCHAR(255) NOT NULL
comment             TEXT NOT NULL
helpful_count       INT DEFAULT 0
unhelpful_count     INT DEFAULT 0
is_verified_purchase BOOLEAN DEFAULT FALSE
status              ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: product
- belongsTo: user

**Indexes**:

- PRIMARY (id)
- INDEX (product_id, status)
- INDEX (user_id)
- INDEX (created_at DESC)

---

### **8. wishlists**

**Purpose**: Products saved for later

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL
product_id          BIGINT NOT NULL
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

UNIQUE KEY unique_user_product (user_id, product_id)
```

**Relationships**:

- belongsTo: user
- belongsTo: product

**Indexes**:

- PRIMARY (id)
- UNIQUE (user_id, product_id)

---

### **9. blog_posts**

**Purpose**: Content management

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
title               VARCHAR(255) NOT NULL
slug                VARCHAR(255) UNIQUE NOT NULL
excerpt             VARCHAR(500) NOT NULL
content             LONGTEXT NOT NULL
featured_image      VARCHAR(255) NOT NULL
category_id         BIGINT NOT NULL
author_id           BIGINT NOT NULL
status              ENUM('draft', 'published', 'archived') DEFAULT 'draft'
published_at        TIMESTAMP NULLABLE
view_count          INT DEFAULT 0
meta_title          VARCHAR(255) NULLABLE
meta_description    VARCHAR(255) NULLABLE
meta_keywords       VARCHAR(255) NULLABLE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: category (blog_categories)
- belongsTo: user (author)
- hasMany: blog_comments

**Indexes**:

- PRIMARY (id)
- UNIQUE (slug)
- INDEX (category_id, status)
- INDEX (published_at DESC)

---

### **10. blog_categories**

**Purpose**: Blog post classification

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
name                VARCHAR(100) NOT NULL UNIQUE
slug                VARCHAR(100) UNIQUE NOT NULL
description         TEXT NULLABLE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- hasMany: blog_posts

---

### **11. blog_comments**

**Purpose**: Blog post comments

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
blog_post_id        BIGINT NOT NULL
user_id             BIGINT NULLABLE
name                VARCHAR(100) NOT NULL
email               VARCHAR(255) NOT NULL
comment             TEXT NOT NULL
status              ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: blog_post
- belongsTo: user (NULLABLE - allow guest comments)

---

### **12. notifications**

**Purpose**: User notifications

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
user_id             BIGINT NOT NULL
type                VARCHAR(50) NOT NULL (order_shipped, review_response, promotion, etc.)
title               VARCHAR(255) NOT NULL
message             TEXT NOT NULL
action_url          VARCHAR(255) NULLABLE
is_read             BOOLEAN DEFAULT FALSE
read_at             TIMESTAMP NULLABLE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Relationships**:

- belongsTo: user

**Indexes**:

- PRIMARY (id)
- INDEX (user_id, is_read)
- INDEX (created_at DESC)

---

### **13. settings**

**Purpose**: Global application configuration

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
key                 VARCHAR(100) UNIQUE NOT NULL
value               LONGTEXT NOT NULL
category            VARCHAR(50) NOT NULL (general, email, seo, payment, shipping)
is_public           BOOLEAN DEFAULT FALSE
created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

**Sample Keys**:

```
site_name: "FurnHaus"
site_logo: "/images/logo.png"
site_description: "Premium furniture collections..."
support_email: "support@furnhaus.com"
support_phone: "+1 (555) 123-4567"
tax_rate: "0.08"
free_shipping_threshold: "100"
```

---

### **14. discounts**

**Purpose**: Promotional codes and discounts

**Columns**:

```sql
id                  BIGINT PRIMARY KEY AUTO_INCREMENT
code                VARCHAR(50) UNIQUE NOT NULL
description        VARCHAR(255) NULLABLE
discount_type      ENUM('percentage', 'fixed') NOT NULL
discount_value     DECIMAL(10, 2) NOT NULL
max_uses           INT NULLABLE
used_count         INT DEFAULT 0
min_purchase       DECIMAL(10, 2) DEFAULT 0
applicable_categories JSON NULLABLE
valid_from         TIMESTAMP NOT NULL
valid_until        TIMESTAMP NULLABLE
is_active          BOOLEAN DEFAULT TRUE
created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

---

---

# PART 4: DEVELOPMENT ROADMAP

## Phase 1: Backend Setup (Week 1-2)

1. Initialize Laravel project
2. Configure database (MySQL/PostgreSQL)
3. Set up Laravel Sanctum authentication
4. Create migrations for all tables
5. Create models and relationships
6. Create seeders with sample data

## Phase 2: APIs (Week 2-3)

1. Create API routes and controllers
2. Implement CRUD endpoints for each resource
3. Add validation and error handling
4. Implement pagination, filtering, sorting
5. API documentation (OpenAPI/Swagger)

## Phase 3: Admin Dashboard (Week 3-4)

1. Create admin middleware/authorization
2. Build dashboard views (Laravel Blade or React)
3. Product management interface
4. Order management interface
5. User management interface
6. Analytics and reporting

## Phase 4: Frontend Integration (Week 4-5)

1. Replace mock data with API calls
2. Implement authentication state
3. Add cart persistence
4. Connect checkout to payment gateway
5. Implement protected routes

## Phase 5: Testing & Deployment (Week 5-6)

1. Unit and integration tests
2. API testing
3. Security audit
4. Performance optimization
5. Deployment to production

---

## KEY ASSUMPTIONS & DECISIONS

1. **Authentication**: Using Laravel Sanctum (SPA-focused)
2. **Database**: MySQL (standard for Laravel)
3. **API Format**: RESTful JSON APIs
4. **Admin Dashboard**: Can be built with Laravel Blade or separate React/Vue frontend
5. **Payment**: Integration point for Stripe/PayPal (not fully implemented)
6. **Email**: Laravel's Mail service for transactional emails
7. **File Storage**: Local storage for images (consider AWS S3 for production)
8. **Rate Limiting**: API rate limiting to prevent abuse
9. **Caching**: Redis for caching frequently accessed data

---

## NEXT STEPS

Would you like me to proceed with:

1. **Step 2**: Database Schema Migrations & Seeders
2. **Step 3**: Laravel Backend Setup & Models
3. **Step 4**: REST API Implementation
4. **Step 5**: Admin Dashboard Design
5. **All of the above** in a structured implementation plan

Please confirm which approach you prefer and I'll create a detailed implementation plan with code examples before building.

---

**Report Generated**: June 15, 2026  
**Version**: 1.0  
**Status**: Analysis Complete - Awaiting Implementation Approval
