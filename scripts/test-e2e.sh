#!/usr/bin/env bash
set -uo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:5000"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/golligog/api"

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
echo "  Golligog E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health Check ---"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/api/golligog/health")
check "GET /api/golligog/health" "200" "$HEALTH"

# Auth
echo ""
echo "--- Auth ---"
REG=$(curl -s -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-golligog@test.com","password":"TestPass123!","name":"E2E Golligog"}')
TOKEN=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
if [ -z "$TOKEN" ]; then
  LOGIN=$(curl -s -X POST "$BASE/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"e2e-golligog@test.com","password":"TestPass123!"}')
  TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
fi
check "Auth (got token)" "1" "$( [ -n "$TOKEN" ] && echo 1 || echo 0 )"

# Profile
echo ""
echo "--- Profile ---"
PROFILE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/auth/profile" -H "Authorization: Bearer $TOKEN")
check "GET auth/profile" "200" "$PROFILE"

# Search History
echo ""
echo "--- Search History ---"
HIST_HT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/search/history" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query":"e2e test search"}')
check "POST search/history" "200" "$HIST_HT"

HIST_GET=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/search/history" -H "Authorization: Bearer $TOKEN")
check "GET search/history" "200" "$HIST_GET"

# Search public endpoint
echo ""
echo "--- Public Search ---"
SEARCH_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/search?q=test&format=json")
check "GET search (public)" "200" "$SEARCH_HT"

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
