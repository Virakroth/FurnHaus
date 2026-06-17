# How to Start & Stop Servers Manually

## ✅ START BACKEND (Laravel API)

**Open Terminal 1** and run:

```bash
cd /Users/macbook/Documents/WCT\ final\ poject/furniturehouse_2/backend
php artisan serve --port=8000
```

**Expected Output:**

```
   INFO  Server running on [http://127.0.0.1:8000].
```

✅ Backend is ready on: **http://localhost:8000**

---

## ✅ START FRONTEND (Next.js)

**Open Terminal 2** (separate terminal window) and run:

```bash
cd /Users/macbook/Documents/WCT\ final\ poject/furniturehouse_2
npm run dev
```

**Expected Output:**

```
✓ Ready in 333ms
- Local:         http://localhost:3000
```

✅ Frontend is ready on: **http://localhost:3000**

---

## ❌ STOP SERVERS

### Stop Backend (Terminal 1):

Press: **CTRL + C**

### Stop Frontend (Terminal 2):

Press: **CTRL + C**

---

## 🧪 Test Everything Works

**Test Backend API:**

```bash
curl -s http://localhost:8000/api/products?per_page=1 | python3 -m json.tool
```

Should return JSON with products.

**Test Frontend:**
Open browser: **http://localhost:3000**

Should load home page.

---

## Common Issues

### "Port 8000 already in use"

```bash
lsof -i :8000
kill -9 <PID>
```

### "Port 3000 already in use"

```bash
lsof -i :3000
kill -9 <PID>
```

### Frontend not connecting to backend

Check `.env.local` has:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Key Points

- **Keep both terminals open** while developing
- **Backend (8000)** = API only, no UI
- **Frontend (3000)** = Calls backend APIs
- Both must be running for full functionality
