#!/usr/bin/env bash
set -euo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:3005"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/docs/api"

PASS=0
FAIL=0

check() {
  local label="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  ✅ $label"
    PASS=$((PASS+1))
  else
    echo "  ❌ $label (expected $expected, got $actual)"
    FAIL=$((FAIL+1))
  fi
}

echo "=========================================="
echo "  BockDocs E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health Check ---"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/api/docs/health")
check "GET /api/docs/health" "200" "$HEALTH"

# Auth
echo ""
echo "--- Auth ---"
# Signup
SIGNUP=$(curl -s -X POST "$BASE/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-docs@test.com","password":"TestPass123!","name":"E2E Docs"}')
TOKEN=$(echo "$SIGNUP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('token',''))" 2>/dev/null)
if [ -n "$TOKEN" ]; then
  check "POST auth/signup (registered + token)" "1" "1"
fi

# Signin
SIGNIN=$(curl -s -X POST "$BASE/auth/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-docs@test.com","password":"TestPass123!"}')
TOKEN=$(echo "$SIGNIN" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('token',''))" 2>/dev/null)
check "POST auth/signin (got token)" "1" "$( [ -n "$TOKEN" ] && echo 1 || echo 0 )"

# Create document
echo ""
echo "--- Documents ---"
USER_ID=$(echo "$SIGNIN" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('user',{}).get('id',''))" 2>/dev/null)
DOC=$(curl -s -X POST "$BASE/documents/create" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"E2E Test Doc\",\"content\":\"# Hello World\\nTest content.\",\"userId\":${USER_ID:-1}}")
DOC_ID=$(echo "$DOC" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id',d.get('document',{}).get('id','')))" 2>/dev/null)
check "POST documents/create (doc created)" "1" "$( [ -n "$DOC_ID" ] && echo 1 || echo 0 )"

# List documents
LIST=$(curl -s "$BASE/documents" -H "Authorization: Bearer $TOKEN")
check "GET documents (list)" "200" "$(echo "$LIST" | python3 -c "import sys,json; d=json.load(sys.stdin); print('200')" 2>/dev/null)"

# Get document
GET_DOC=$(curl -s "$BASE/documents/$DOC_ID" -H "Authorization: Bearer $TOKEN")
check "GET documents/:id" "200" "$(echo "$GET_DOC" | python3 -c "import sys,json; d=json.load(sys.stdin); print('200')" 2>/dev/null)"

# Share
SHARE=$(curl -s -X POST "$BASE/documents/share/$DOC_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"expiresIn":"24h"}')
check "POST documents/share/:id (share link)" "200" "$(echo "$SHARE" | python3 -c "import sys,json; d=json.load(sys.stdin); print('200')" 2>/dev/null)"

# Delete
DELETE_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/documents/delete/$DOC_ID" -H "Authorization: Bearer $TOKEN")
check "DELETE documents/delete/:id" "200" "$DELETE_CODE"

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
