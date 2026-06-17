#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:8000/api"

echo -e "${YELLOW}🚀 Starting Backend API Tests${NC}\n"

# Test 1: Health Check
echo -e "${YELLOW}1. Testing Server Availability${NC}"
if curl -s "$BASE_URL/products" > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Server is running${NC}\n"
else
  echo -e "${RED}✗ Server is NOT running. Start with: php artisan serve --port=8000${NC}"
  exit 1
fi

# Test 2: Register User
echo -e "${YELLOW}2. Testing User Registration${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "testuser_'$(date +%s)'@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+1 (555) 111-1111"
  }')

if echo "$REGISTER_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Registration successful${NC}"
else
  echo -e "${RED}✗ Registration failed${NC}"
fi
echo ""

# Test 3: Login
echo -e "${YELLOW}3. Testing User Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "admin@furnhaus.com",
    "password": "password123"
  }')

if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Login successful${NC}"
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
  echo -e "Token: ${YELLOW}${TOKEN:0:20}...${NC}\n"
else
  echo -e "${RED}✗ Login failed${NC}\n"
  exit 1
fi

# Test 4: Get Current User
echo -e "${YELLOW}4. Testing Get Current User${NC}"
if curl -s "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Current user retrieved${NC}\n"
else
  echo -e "${RED}✗ Failed to get current user${NC}\n"
fi

# Test 5: Get Products
echo -e "${YELLOW}5. Testing Get Products${NC}"
PRODUCTS=$(curl -s "$BASE_URL/products?per_page=5")
if echo "$PRODUCTS" | grep -q '"success":true'; then
  COUNT=$(echo "$PRODUCTS" | grep -o '"id":' | wc -l)
  echo -e "${GREEN}✓ Products retrieved (found $COUNT products)${NC}\n"
else
  echo -e "${RED}✗ Failed to get products${NC}\n"
fi

# Test 6: Get Single Product
echo -e "${YELLOW}6. Testing Get Single Product${NC}"
if curl -s "$BASE_URL/products/1" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Single product retrieved${NC}\n"
else
  echo -e "${RED}✗ Failed to get single product${NC}\n"
fi

# Test 7: Get Categories
echo -e "${YELLOW}7. Testing Get Categories${NC}"
if curl -s "$BASE_URL/categories" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Categories retrieved${NC}\n"
else
  echo -e "${RED}✗ Failed to get categories${NC}\n"
fi

# Test 8: Add to Wishlist
echo -e "${YELLOW}8. Testing Add to Wishlist${NC}"
if curl -s -X POST "$BASE_URL/wishlist" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"product_id": 1}' | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Added to wishlist${NC}\n"
else
  echo -e "${RED}✗ Failed to add to wishlist${NC}\n"
fi

# Test 9: Get Wishlist
echo -e "${YELLOW}9. Testing Get Wishlist${NC}"
if curl -s "$BASE_URL/wishlist" \
  -H "Authorization: Bearer $TOKEN" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Wishlist retrieved${NC}\n"
else
  echo -e "${RED}✗ Failed to get wishlist${NC}\n"
fi

# Test 10: Create Review
echo -e "${YELLOW}10. Testing Create Review${NC}"
if curl -s -X POST "$BASE_URL/reviews" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "product_id": 1,
    "rating": 5,
    "title": "Great Product",
    "comment": "Very satisfied!"
  }' | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Review created${NC}\n"
else
  echo -e "${RED}✗ Failed to create review${NC}\n"
fi

# Test 11: Create Order
echo -e "${YELLOW}11. Testing Create Order${NC}"
if curl -s -X POST "$BASE_URL/orders" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "items": [{"product_id": 1, "quantity": 1}],
    "shipping_address_id": 1,
    "billing_address_id": 1,
    "payment_method": "credit_card"
  }' | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Order created${NC}\n"
else
  echo -e "${RED}✗ Failed to create order${NC}\n"
fi

# Test 12: Get Admin Dashboard Stats (requires admin token)
echo -e "${YELLOW}12. Testing Admin Dashboard Stats${NC}"
if curl -s "$BASE_URL/admin/dashboard/stats" \
  -H "Authorization: Bearer $TOKEN" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Admin stats retrieved${NC}\n"
else
  echo -e "${RED}✗ Failed to get admin stats (must be admin user)${NC}\n"
fi

# Test 13: Logout
echo -e "${YELLOW}13. Testing Logout${NC}"
if curl -s -X POST "$BASE_URL/auth/logout" \
  -H "Authorization: Bearer $TOKEN" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Logout successful${NC}\n"
else
  echo -e "${RED}✗ Failed to logout${NC}\n"
fi

echo -e "${GREEN}✅ API Testing Complete!${NC}"
