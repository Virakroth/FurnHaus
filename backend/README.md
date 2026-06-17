# FurnHaus Backend

Laravel 11 REST API Backend for FurnHaus E-Commerce Platform

## Quick Start

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve --port=8000
```

Server runs at: **http://localhost:8000**

### Default Test Credentials

- **Admin**: admin@furnhaus.com / password123
- **Customer**: customer@furnhaus.com / password123

## Features

✅ **14 Database Tables** - Fully normalized schema
✅ **Authentication** - Laravel Sanctum with JWT tokens
✅ **REST APIs** - 35+ endpoints
✅ **Admin Dashboard** - Complete management system
✅ **Product Management** - Categories, filtering, search
✅ **Order Management** - Create, track, update status
✅ **User Management** - Profiles, addresses, wishlists
✅ **Reviews & Ratings** - Product feedback system
✅ **Blog System** - Content management
✅ **Email Ready** - SendGrid integration
✅ **Scalable** - Redis caching, pagination
✅ **Secure** - Password hashing, CORS, validation

## API Endpoints

### Public

- `GET /api/products` - List products
- `GET /api/products/{id}` - Product details
- `GET /api/categories` - Product categories
- `GET /api/blog` - Blog posts

### Authentication

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout (auth required)
- `POST /api/auth/refresh` - Refresh token (auth required)

### User (Auth Required)

- `GET /api/user/profile` - User profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/addresses` - User addresses
- `POST /api/user/addresses` - Create address
- `GET /api/orders` - User orders
- `POST /api/orders` - Create order
- `GET /api/wishlist` - Wishlist items
- `POST /api/wishlist` - Add to wishlist

### Admin (Auth Required + Admin Role)

- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/products` - All products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `GET /api/admin/orders` - All orders
- `PUT /api/admin/orders/{id}/status` - Update order status
- `GET /api/admin/users` - All users
- `PUT /api/admin/users/{id}/role` - Change user role

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete endpoint details.

## Project Structure

```
backend/
├── app/
│   ├── Models/              (Database models: User, Product, Order, etc.)
│   ├── Http/
│   │   ├── Controllers/Api/ (Public API controllers)
│   │   ├── Controllers/Api/Admin/ (Admin controllers)
│   │   └── Middleware/      (Auth, CORS, validation)
│   └── Services/            (Business logic)
├── database/
│   ├── migrations/          (14 database tables)
│   └── seeders/             (Sample data)
├── routes/
│   ├── api.php              (Public API routes)
│   └── admin.php            (Admin routes)
├── config/                  (Configuration files)
└── tests/                   (Unit and feature tests)
```

## Database Schema

**14 Tables:**

1. `users` - User accounts and profiles
2. `categories` - Product categories
3. `products` - Product inventory
4. `orders` - Customer orders
5. `order_items` - Items in each order
6. `addresses` - User delivery addresses
7. `reviews` - Product reviews
8. `wishlists` - Saved products
9. `blog_categories` - Blog post categories
10. `blog_posts` - Blog articles
11. `blog_comments` - Blog comments
12. `notifications` - User notifications
13. `discounts` - Promotional codes
14. `settings` - Global settings

## Technology Stack

- **Framework**: Laravel 11
- **Authentication**: Laravel Sanctum
- **Database**: MySQL/PostgreSQL
- **Caching**: Redis (optional)
- **Email**: SendGrid
- **File Storage**: Local/AWS S3
- **API Documentation**: OpenAPI (Swagger)

## Installation & Setup

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete installation instructions.

### Quick Setup (5 minutes)

1. Install dependencies: `composer install`
2. Setup environment: `cp .env.example .env && php artisan key:generate`
3. Setup database: Update DB credentials in `.env`
4. Run migrations: `php artisan migrate`
5. Seed data: `php artisan db:seed`
6. Start server: `php artisan serve --port=8000`

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```
APP_NAME=FurnHaus
APP_DEBUG=true
DB_CONNECTION=mysql
DB_DATABASE=furnhaus_db
FRONTEND_URL=http://localhost:3000
```

See `.env.example` for all available options.

## API Response Format

### Success

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Error description"
}
```

## Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test tests/Feature/AuthTest.php

# Run with coverage
php artisan test --coverage
```

## Deployment

### Production Checklist

- [ ] Set `APP_DEBUG=false`
- [ ] Set `APP_ENV=production`
- [ ] Generate new APP_KEY
- [ ] Configure proper database
- [ ] Set up email service (SendGrid)
- [ ] Configure file storage (AWS S3)
- [ ] Enable HTTPS
- [ ] Set up monitoring (Sentry)
- [ ] Configure CORS properly
- [ ] Set up backups

## Common Commands

```bash
# Database
php artisan migrate              # Run migrations
php artisan migrate:rollback    # Rollback migrations
php artisan db:seed             # Seed sample data

# Development
php artisan serve               # Start server
php artisan tinker              # Interactive shell
php artisan cache:clear         # Clear cache

# Maintenance
php artisan optimize            # Optimize app
php artisan view:clear          # Clear views
php artisan config:clear        # Clear config
```

## Troubleshooting

### Database connection error

- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists: `mysql -u root -p -e "CREATE DATABASE furnhaus_db;"`

### "Class not found" errors

```bash
php artisan dump-autoload
composer dump-autoload
```

### Port 8000 in use

```bash
php artisan serve --port=8001
```

## Integration with Frontend

Update frontend `.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Then use in components:

```typescript
import API from "@/lib/api";

const { data } = await API.get("/products");
```

## Contributing

1. Follow PSR-12 coding standards
2. Write tests for new features
3. Update documentation
4. Submit pull request

## Support

📧 Email: support@furnhaus.com
📖 Docs: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
🐛 Issues: Submit via GitHub Issues

## License

Proprietary - FurnHaus © 2024

---

**Status**: ✅ Production Ready
**Last Updated**: June 15, 2024
**Version**: 1.0.0
