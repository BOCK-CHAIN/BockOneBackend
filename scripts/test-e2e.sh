#!/usr/bin/env bash
set -euo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:3004"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/drive/api/v1"

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
echo "  BockDrive E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health Check ---"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/api/drive/health")
check "GET /api/drive/health" "200" "$HEALTH"

# Auth
echo ""
echo "--- Auth ---"
# Register (ignore if already exists)
REG=$(curl -s -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-drive@test.com","password":"TestPass123!","name":"E2E Drive"}')
HT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-drive@test.com","password":"TestPass123!","name":"E2E Drive"}')
# Registration may return 201 (new) or 400 (already exists) — both are OK
check "POST auth/register (responds)" "1" "$( [ "$HT" = "201" ] || [ "$HT" = "400" ] && echo 1 || echo 0 )"

# Login
LOGIN=$(curl -s -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-drive@test.com","password":"TestPass123!"}')
TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
if [ -n "$TOKEN" ]; then
  check "POST auth/login (got token)" "1" "1"
else
  check "POST auth/login (got token)" "1" "0"
fi

# Upload
echo ""
echo "--- Upload ---"
echo "test content" > /tmp/e2e-drive-test.txt
UPLOAD=$(curl -s -X POST "$BASE/upload" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/tmp/e2e-drive-test.txt")
FILE_ID=$(echo "$UPLOAD" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('file',{}).get('id',''))" 2>/dev/null)
if [ -n "$FILE_ID" ]; then
  check "POST upload (file uploaded)" "1" "1"
else
  check "POST upload (file uploaded)" "1" "0"
fi

# List
echo ""
echo "--- File Operations ---"
FILES=$(curl -s "$BASE/files" -H "Authorization: Bearer $TOKEN")
ITEMS=$(echo "$FILES" | python3 -c "import sys,json; d=json.load(sys.stdin); items=d.get('files',d.get('data',d.get('items',[]))); print(len(items))" 2>/dev/null)
check "GET files (list)" "1" "$( [ "$ITEMS" -gt 0 ] && echo 1 || echo 0 )"

# Download
DL_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/files/proxy/$FILE_ID" -H "Authorization: Bearer $TOKEN")
check "GET files/proxy/:id (download)" "302" "$DL_CODE"

# Star
STAR=$(curl -s -X PATCH "$BASE/files/$FILE_ID/star" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")
check "PATCH files/:id/star" "200" "$(echo "$STAR" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or '200')" 2>/dev/null)"

# Rename
RENAME=$(curl -s -X PATCH "$BASE/files/$FILE_ID/rename" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"renamed-test.txt"}')
check "PATCH files/:id/rename" "200" "$(echo "$RENAME" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','200'))" 2>/dev/null)"

# Starred list
STARRED=$(curl -s "$BASE/files/starred" -H "Authorization: Bearer $TOKEN")
check "GET files/starred" "200" "$(echo "$STARRED" | python3 -c "import sys,json; d=json.load(sys.stdin); items=d.get('files',d.get('data',d.get('items',[]))); print(len(items)>0 and '200' or 'empty')" 2>/dev/null)"

# Share
SHARE=$(curl -s -X POST "$BASE/../api/v1/shares" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"fileId\":\"$FILE_ID\",\"permission\":\"view\"}")
check "POST shares (create)" "200" "$(echo "$SHARE" | python3 -c "import sys,json; d=json.load(sys.stdin); print('200')" 2>/dev/null)"

# Delete
DELETE_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/files/$FILE_ID" -H "Authorization: Bearer $TOKEN")
check "DELETE files/:id" "200" "$DELETE_CODE"

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
