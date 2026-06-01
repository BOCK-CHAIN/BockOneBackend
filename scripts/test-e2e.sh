#!/usr/bin/env bash
set -uo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:3001"
  TILE_HOST="http://localhost:8081"
else
  HOST="http://$ALB"
  TILE_HOST="http://$ALB"
fi
BASE="$HOST/api/maps"

PASS=0
FAIL=0

check() {
  local label="$1" expected="$2" actual="$3"
  # Accept both 200 and 201 for POST creates
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
echo "  BockMaps E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health ---"
H=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/health")
check "GET /api/maps/health" "200" "$H"

# Auth
echo ""
echo "--- Auth ---"
LOGIN=$(curl -s -X POST "$BASE/auth/login" -H "Content-Type: application/json" \
  -d '{"email":"e2e-maps@test.com","password":"TestPass123!"}')
TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
if [ -z "$TOKEN" ]; then
  REG=$(curl -s -X POST "$BASE/auth/register" -H "Content-Type: application/json" \
    -d '{"email":"e2e-maps@test.com","password":"TestPass123!"}')
  TOKEN=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
  if [ -z "$TOKEN" ]; then
    LOGIN=$(curl -s -X POST "$BASE/auth/login" -H "Content-Type: application/json" \
      -d '{"email":"e2e-maps@test.com","password":"TestPass123!"}')
    TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
  fi
fi
check "Auth (got token)" "1" "$( [ -n "$TOKEN" ] && echo 1 || echo 0 )"

# Get user ID from register response, or decode JWT
USER_ID=$(echo "${REG:-}" 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('user',{}).get('id',''))" 2>/dev/null || true)
if [ -z "$USER_ID" ]; then
  USER_ID=$(echo "$TOKEN" | python3 -c "import sys,base64,json; p=sys.stdin.read().split('.')[1]; p+='='*(4-len(p)%4); print(json.loads(base64.b64decode(p)).get('id',''))" 2>/dev/null || true)
fi
check "Auth (got user_id)" "1" "$( [ -n "$USER_ID" ] && echo 1 || echo 0 )"

# Lists
echo ""
echo "--- Lists ---"
LIST=$(curl -s -X POST "$BASE/list/lists/create" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" -d '{"name":"E2E Test List"}')
LIST_ID=$(echo "$LIST" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('list',{}).get('id',''))" 2>/dev/null)
check "POST list/lists/create" "1" "$( [ -n "$LIST_ID" ] && echo 1 || echo 0 )"

LISTS_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/list/lists" -H "Authorization: Bearer $TOKEN")
check "GET list/lists" "200" "$LISTS_HT"

# Stored Addresses
echo ""
echo "--- Stored Addresses ---"
if [ -n "$LIST_ID" ]; then
  ADDR_HT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/storedAddress/addresses" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d "{\"list_id\":\"$LIST_ID\",\"name\":\"E2E Test Place\",\"latitude\":$(date +%S),\"longitude\":77.5946}")
  check "POST storedAddress/addresses" "200" "$ADDR_HT"

  ADDY_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/storedAddress/addresses/$LIST_ID" \
    -H "Authorization: Bearer $TOKEN")
  check "GET storedAddress/addresses/:listId" "200" "$ADDY_HT"
fi

# Contribute
echo ""
echo "--- Contribute ---"
CONT_HT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/contribute/contribute-place" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d "{\"user_id\":\"$USER_ID\",\"name\":\"E2E Cafe\",\"short_description\":\"Test\",\"category\":\"cafe\",\"email\":\"test@test.com\",\"phone_number\":\"1234567890\",\"website\":\"https://test.com\",\"postal_address\":\"Test\",\"exact_address\":\"Test\",\"landmark\":\"Test\",\"opening_hours\":\"09:00\",\"closing_hours\":\"18:00\",\"services\":\"wifi\",\"price_range\":\"medium\"}")
check "POST contribute/contribute-place" "200" "$CONT_HT"

CONTRIBS_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/contribute/user-contributions" \
  -H "Authorization: Bearer $TOKEN")
check "GET contribute/user-contributions" "200" "$CONTRIBS_HT"

# OpenResty Tile
echo ""
echo "--- Tile Server ---"
TILE_HT=$(curl -s -o /dev/null -w "%{http_code}" \
  "$TILE_HOST/api/maps/styles/basic-preview/0/0/0.png?key=myfirstkey")
check "GET /api/maps/styles/... (tile with key)" "200" "$TILE_HT"

NO_KEY_HT=$(curl -s -o /dev/null -w "%{http_code}" \
  "$TILE_HOST/api/maps/styles/")
check "Tile without key (401)" "401" "$NO_KEY_HT"

BAD_KEY=$(curl -s "$TILE_HOST/api/maps/styles/?key=bogus" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('error',''))" 2>/dev/null)
check "Tile with bad key (403)" "Invalid API key" "$BAD_KEY"

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
