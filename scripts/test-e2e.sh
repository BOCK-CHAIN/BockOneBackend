#!/usr/bin/env bash
set -uo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:3000"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/orventus/api/v1"

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
echo "  Orventus E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health Check ---"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/api/orventus/health")
check "GET /api/orventus/health" "200" "$HEALTH"

# Auth — phone+OTP flow
echo ""
echo "--- Auth ---"
LOGIN=$(curl -s -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"phone":"9999999999","role":"rider"}')
check "POST auth/login (OTP sent)" "200" "$(echo "$LOGIN" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('msg','').startswith('OTP') and '200' or 'fail')" 2>/dev/null)"

VERIFY=$(curl -s -X POST "$BASE/auth/verify" \
  -H "Content-Type: application/json" \
  -d '{"phone":"9999999999","otp":"123456"}')
TOKEN=$(echo "$VERIFY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('accessToken',''))" 2>/dev/null)
check "Auth (got access token)" "1" "$( [ -n "$TOKEN" ] && echo 1 || echo 0 )"

# User profile
echo ""
echo "--- Users ---"
ME=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/users/me" -H "Authorization: Bearer $TOKEN")
check "GET users/me" "200" "$ME"

# Vehicles
echo ""
echo "--- Vehicles ---"
VEH_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/vehicles" -H "Authorization: Bearer $TOKEN")
check "GET vehicles" "200" "$VEH_HT"

# Promo codes
echo ""
echo "--- Promo Codes ---"
PROMO_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/promocodes" -H "Authorization: Bearer $TOKEN")
check "GET promocodes" "200" "$PROMO_HT"

# Settings
echo ""
echo "--- Settings ---"
SET_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/settings" -H "Authorization: Bearer $TOKEN")
check "GET settings" "200" "$SET_HT"

# Notifications
echo ""
echo "--- Notifications ---"
NOTIF_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/notifications" -H "Authorization: Bearer $TOKEN")
check "GET notifications" "200" "$NOTIF_HT"

# Document Types
echo ""
echo "--- Document Types ---"
DOC_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/documents" -H "Authorization: Bearer $TOKEN")
check "GET documents (types)" "200" "$DOC_HT"

# Reviews
echo ""
echo "--- Reviews ---"
REV_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/reviews" -H "Authorization: Bearer $TOKEN")
check "GET reviews" "200" "$REV_HT"

# Misc health
echo ""
echo "--- Misc ---"
MISC_HT=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/misc/health" -H "Authorization: Bearer $TOKEN")
check "GET misc/health" "200" "$MISC_HT"

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
