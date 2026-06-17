# Backend Setup Guide

## Prerequisites

- PHP 8.2+
- Composer
- MySQL 5.7+ or PostgreSQL 10+
- Node.js 18+ (optional, for frontend integration)

## Installation

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Copy Environment File

```bash
cp .env.example .env
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Configure Database

Edit `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=furnhaus_db
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Create Database

```bash
mysql -u root -p -e "CREATE DATABASE furnhaus_db;"
```

### 7. Run Migrations

```bash
php artisan migrate
```

### 8. Seed Sample Data

```bash
php artisan db:seed
```

### 9. Start Development Server

```bash
php artisan serve --port=8000
```

Server will start at: `http://localhost:8000`

---

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/              (Public APIs)
│   │   │   └── Admin/            (Admin APIs)
│   │   ├── Middleware/           (Custom middleware)
│   │   └── Requests/             (Form requests)
│   ├── Models/                   (Database models)
│   └── Services/                 (Business logic)
├── database/
│   ├── migrations/               (Database schemas)
│   └── seeders/                  (Sample data)
├── routes/
│   ├── api.php                   (API routes)
│   └── admin.php                 (Admin routes)
├── config/
│   └── app.php                   (App configuration)
├── .env                          (Configuration)
└── composer.json                 (Dependencies)
```

---

## Default Test Credentials

### Admin Account

- **Email**: admin@furnhaus.com
- **Password**: password123

### Customer Account

- **Email**: customer@furnhaus.com
- **Password**: password123

---

## Important Commands

### Database Operations

```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Reset database
php artisan migrate:reset

# Seed database
php artisan db:seed
```

### Development

```bash
# Clear cache
php artisan cache:clear

# Clear all caches
php artisan cache:clear && php artisan config:clear && php artisan view:clear

# Create model with migration
php artisan make:model ModelName -m

# Create controller
php artisan make:controller ControllerName

# Tinker (interactive shell)
php artisan tinker
```

### Testing

```bash
# Run tests
php artisan test

# Run specific test file
php artisan test tests/Feature/AuthTest.php
```

---

## Environment Configuration

### Key Settings in `.env`

```
# App Settings
APP_NAME=FurnHaus
APP_ENV=local (or production)
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=furnhaus_db
DB_USERNAME=root
DB_PASSWORD=

# Cache (optional)
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Mail (optional for email notifications)
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key

# Sanctum (API Auth)
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SANCTUM_ENCRYPT_COOKIES=true
```

---

## Connecting to Frontend

### 1. Update Frontend API Base URL

In frontend `.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2. Create API Service

Create `app/lib/api.ts`:

```typescript
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### 3. Update Login Page

```typescript
const handleLogin = async (email, password) => {
  try {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed", error);
  }
};
```

---

## Troubleshooting

### "Class not found" Error

```bash
php artisan dump-autoload
composer dump-autoload
```

### Database Connection Error

- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists

### Port 8000 Already in Use

```bash
php artisan serve --port=8001
```

### Permission Issues

```bash
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

---

## Next Steps

1. ✅ Backend setup complete
2. ⏳ Update frontend to use APIs
3. ⏳ Implement authentication flow
4. ⏳ Connect cart to backend
5. ⏳ Integrate payment gateway
6. ⏳ Set up admin dashboard

---

## Support & Help

For issues or questions:

1. Check Laravel documentation: https://laravel.com/docs
2. Check Sanctum docs: https://laravel.com/docs/11.x/sanctum
3. Review API_DOCUMENTATION.md in this folder
