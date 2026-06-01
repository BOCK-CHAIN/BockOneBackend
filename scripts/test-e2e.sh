#!/usr/bin/env bash
set -euo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:9000"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/vote"
PRIV_KEY="${PRIV_KEY:-0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef}"

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
echo "  BockVote E2E Tests"
echo "=========================================="
echo ""

# Health
echo "--- Health Check ---"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/health")
check "GET /api/vote/health" "200" "$HEALTH"

# Create election
echo ""
echo "--- Create Election ---"
ELEC=$(curl -s -X POST "$BASE/voting/election/create" \
  -H "Content-Type: application/json" \
  -H "X-Private-Key: $PRIV_KEY" \
  -d '{"electionId":"e2e-election","title":"E2E Test Election","description":"E2E test","startTime":1710000000,"endTime":1999999999}')
check "POST voting/election/create" "200" "$(echo "$ELEC" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or 'fail')" 2>/dev/null)"

# Register candidate
echo ""
echo "--- Register Candidate ---"
CAND=$(curl -s -X POST "$BASE/voting/register/candidate" \
  -H "Content-Type: application/json" \
  -H "X-Private-Key: $PRIV_KEY" \
  -d '{"candidateId":"e2e-candidate","electionId":"e2e-election","ipfsProfileHash":"QmTest"}')
check "POST voting/register/candidate" "200" "$(echo "$CAND" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or 'fail')" 2>/dev/null)"

# Register voter
echo ""
echo "--- Register Voter ---"
VOTER_REG=$(curl -s -X POST "$BASE/voting/register/voter" \
  -H "Content-Type: application/json" \
  -H "X-Private-Key: $PRIV_KEY" \
  -d '{"voterId":"e2e-voter","ipfsDocHash":"QmVoter"}')
check "POST voting/register/voter" "200" "$(echo "$VOTER_REG" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or 'fail')" 2>/dev/null)"

# Wait for block
echo ""
echo "--- Wait for blockchain (7s) ---"
sleep 7

# Approve candidate
echo ""
echo "--- Approvals ---"
AP_CAND=$(curl -s -X POST "$BASE/voting/approve/candidate" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: $PRIV_KEY" \
  -d '{"id":"e2e-candidate","electionId":"e2e-election","approve":true}')
check "POST voting/approve/candidate" "200" "$(echo "$AP_CAND" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or 'fail')" 2>/dev/null)"

# Approve voter
AP_VOTER=$(curl -s -X POST "$BASE/voting/approve/voter" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: $PRIV_KEY" \
  -d '{"id":"e2e-voter","approve":true}')
check "POST voting/approve/voter" "200" "$(echo "$AP_VOTER" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or 'fail')" 2>/dev/null)"

# GET existing data
echo ""
echo "--- GET Existing Data ---"
# Election
ELEC_GET=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/voting/election/e2e-election")
check "GET voting/election/:id (exists)" "200" "$ELEC_GET"

# Candidate
CAND_GET=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/voting/candidate/e2e-election/e2e-candidate")
check "GET voting/candidate/:electionId/:id (exists)" "200" "$CAND_GET"

# Voter
VOTER_GET=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/voting/voter/e2e-voter")
check "GET voting/voter/:id (exists)" "200" "$VOTER_GET"

# List elections
LIST=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/voting/elections")
check "GET voting/elections (list)" "200" "$LIST"

# Get election results (will fail-not-ended but endpoint exists)
RESULTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/voting/election/e2e-election/results")
# Results endpoint returns 400 if election hasn't ended — endpoint exists and responds
check "GET voting/election/:id/results (responds)" "1" "$( [ "$RESULTS_CODE" = "200" ] || [ "$RESULTS_CODE" = "400" ] && echo 1 || echo 0 )"

# Cast vote (first time)
echo ""
echo "--- Cast Vote (first time) ---"
VOTE=$(curl -s -X POST "$BASE/voting/vote" \
  -H "Content-Type: application/json" \
  -H "X-Private-Key: $PRIV_KEY" \
  -d '{"electionId":"e2e-election","candidateId":"e2e-candidate"}')
check "POST voting/vote (first)" "200" "$(echo "$VOTE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','')=='success' and '200' or 'fail')" 2>/dev/null)"

# Wait for block to process the first vote
echo ""
echo "--- Wait for blockchain (7s) ---"
sleep 7

# Try to cast duplicate vote (should be rejected)
echo ""
echo "--- Cast Vote (duplicate - should be rejected) ---"
DUP_VOTE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/voting/vote" \
  -H "Content-Type: application/json" \
  -H "X-Private-Key: $PRIV_KEY" \
  -d '{"electionId":"e2e-election","candidateId":"e2e-candidate"}')
check "POST voting/vote (duplicate rejected)" "409" "$DUP_VOTE"

# Check has-voted endpoint
echo ""
echo "--- Check has-voted endpoint ---"
# First find voter by key
VOTER_ID=$(curl -s -X GET "$BASE/voting/voter/find-by-key" \
  -H "X-Private-Key: $PRIV_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id',''))" 2>/dev/null)
if [ -n "$VOTER_ID" ]; then
  HAS_VOTED=$(curl -s "$BASE/voting/election/e2e-election/voter/$VOTER_ID/has-voted" | python3 -c "import sys,json; d=json.load(sys.stdin); print(str(d.get('hasVoted','')).lower())" 2>/dev/null)
  check "GET has-voted endpoint" "true" "$HAS_VOTED"

  # Check voter votes endpoint
  VOTES=$(curl -s "$BASE/voting/voter/$VOTER_ID/votes" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('votes',[])))" 2>/dev/null)
  check "GET voter votes count" "1" "$VOTES"
fi

echo ""
echo "=========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "=========================================="
exit $FAIL
