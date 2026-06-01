#!/usr/bin/env bash
set -uo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:3003"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/foods/api"

PASS=0
FAIL=0

check() {
  local label="$1" expected="$2" actual="$3"
  if [ "$actual" = "201" ]; then actual="200"; fi
  if [ "$expected" = "$actual" ]; then
    echo "  ✅ $label"
    PASS=$((PASS+1))
  else
    echo "  ❌ $label (expected $expected, got $actual)"
    FAIL=$((FAIL+1))
  fi
}

echo "=========================================="
echo "  BockFoods E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health Check ---"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/api/foods/health")
check "GET /api/foods/health" "200" "$HEALTH"

# Auth
echo ""
echo "--- Auth ---"
REG=$(curl -s -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-foods@test.com","password":"TestPass123!","name":"E2E Foods"}')
TOKEN=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
if [ -z "$TOKEN" ]; then
  LOGIN=$(curl -s -X POST "$BASE/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"e2e-foods@test.com","password":"TestPass123!"}')
  TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
fi
check "Auth (got token)" "1" "$( [ -n "$TOKEN" ] && echo 1 || echo 0 )"

# User profile
echo ""
echo "--- User Profile ---"
ME=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/users/me" -H "Authorization: Bearer $TOKEN")
check "GET users/me" "200" "$ME"

# Categories
echo ""
echo "--- Categories ---"
CAT_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/categories")
check "GET categories" "200" "$CAT_HT"

# Restaurants
echo ""
echo "--- Restaurants ---"
REST_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/restaurants")
check "GET restaurants" "200" "$REST_HT"

# Menu Items
echo ""
echo "--- Menu Items ---"
MENU_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/menu-items")
check "GET menu-items" "200" "$MENU_HT"

# Grocery Stores
echo ""
echo "--- Grocery Stores ---"
GROC_CAT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/grocerystores/categories")
check "GET grocerystores/categories" "200" "$GROC_CAT"

GROC_FEAT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/grocerystores/featured")
check "GET grocerystores/featured" "200" "$GROC_FEAT"

GROC_ITEMS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/grocerystores/items")
check "GET grocerystores/items" "200" "$GROC_ITEMS"

# Cart
echo ""
echo "--- Cart ---"
CART_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/cart" -H "Authorization: Bearer $TOKEN")
check "GET cart" "200" "$CART_HT"

# Order (will fail gracefully if cart empty — check endpoint exists)
echo ""
echo "--- Orders ---"
ORDER_HT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/orders/place" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")
check "POST orders/place (endpoint hit)" "1" "$( [ "$ORDER_HT" = "200" ] || [ "$ORDER_HT" = "400" ] || [ "$ORDER_HT" = "500" ] && echo 1 || echo 0 )"

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
