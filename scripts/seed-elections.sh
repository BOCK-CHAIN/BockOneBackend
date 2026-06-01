#!/usr/bin/env bash
# Seed BockVote with test elections, candidates, and voters
set -euo pipefail

ALB="${ALB:-k8s-bock-bockunif-74a0f2b9e1-623548045.ap-south-1.elb.amazonaws.com}"
if [ "${LOCAL:-}" = "true" ]; then
  HOST="http://localhost:9000"
else
  HOST="http://$ALB"
fi
BASE="$HOST/api/vote"

# Fixed private keys for reproducible test identities
ADMIN_KEY="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
VOTER1_KEY="0xdeadbeefcafebabedeadbeefcafebabedeadbeefcafebabedeadbeefcafebabe01"
VOTER2_KEY="0xdeadbeefcafebabedeadbeefcafebabedeadbeefcafebabedeadbeefcafebabe02"
VOTER3_KEY="0xdeadbeefcafebabedeadbeefcafebabedeadbeefcafebabedeadbeefcafebabe03"

now=$(date +%s)
one_hour=$((60 * 60))
one_day=$((24 * one_hour))

echo "=========================================="
echo "  Seeding BockVote Elections"
echo "=========================================="
echo ""

# ─── Helper ────────────────────────────────────────
call() {
  local label="$1" method="$2" url="$3" key="$4" body="$5"
  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" \
    -H "Content-Type: application/json" \
    -H "X-Private-Key: $key" \
    -d "$body" 2>/dev/null)
  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo "  ✅ $label"
  else
    echo "  ❌ $label (HTTP $http_code)"
  fi
}

call_admin() {
  local label="$1" method="$2" url="$3" key="$4" body="$5"
  local http_code
  http_code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" \
    -H "Content-Type: application/json" \
    -H "X-Admin-Key: $key" \
    -d "$body" 2>/dev/null)
  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo "  ✅ $label"
  else
    echo "  ❌ $label (HTTP $http_code)"
  fi
}

# ─── 1. Register voters (with their OWN keys) ──────
echo "--- Registering Voters ---"
call "Register Voter 1" POST "$BASE/voting/register/voter" "$VOTER1_KEY" \
  '{"voterId":"voter-alice","ipfsDocHash":"QmAlice"}'
call "Register Voter 2" POST "$BASE/voting/register/voter" "$VOTER2_KEY" \
  '{"voterId":"voter-bob","ipfsDocHash":"QmBob"}'
call "Register Voter 3" POST "$BASE/voting/register/voter" "$VOTER3_KEY" \
  '{"voterId":"voter-charlie","ipfsDocHash":"QmCharlie"}'

# ─── 2. Create elections ────────────────────────────
echo ""
echo "--- Creating Elections ---"
# Active election (started 2 days ago, ends 2 days from now)
call "Active Election" POST "$BASE/voting/election/create" "$ADMIN_KEY" \
  "$(cat <<EOF
{"electionId":"elec-community","title":"Community Council 2026","description":"Vote for your community council representative","startTime":$((now - 2*one_day)),"endTime":$((now + 2*one_day))}
EOF
)"

# Upcoming election (starts 3 days from now)
call "Upcoming Election" POST "$BASE/voting/election/create" "$ADMIN_KEY" \
  "$(cat <<EOF
{"electionId":"elec-school","title":"School Board Election","description":"Elect the new school board members","startTime":$((now + 3*one_day)),"endTime":$((now + 10*one_day))}
EOF
)"

# Completed election (ended 1 day ago)
call "Completed Election" POST "$BASE/voting/election/create" "$ADMIN_KEY" \
  "$(cat <<EOF
{"electionId":"elec-treasurer","title":"Treasurer Election","description":"Annual treasurer election","startTime":$((now - 10*one_day)),"endTime":$((now - 1*one_day))}
EOF
)"

# ─── 3. Register candidates ─────────────────────────
echo ""
echo "--- Registering Candidates ---"
# Community Council candidates
call "Candidate 1 for Community" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-community-1","electionId":"elec-community","ipfsProfileHash":"Alice Johnson"}'
call "Candidate 2 for Community" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-community-2","electionId":"elec-community","ipfsProfileHash":"Bob Smith"}'
call "Candidate 3 for Community" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-community-3","electionId":"elec-community","ipfsProfileHash":"Charlie Brown"}'

# School Board candidates
call "Candidate 1 for School" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-school-1","electionId":"elec-school","ipfsProfileHash":"Diana Prince"}'
call "Candidate 2 for School" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-school-2","electionId":"elec-school","ipfsProfileHash":"Evan Wright"}'

# Treasurer candidates
call "Candidate 1 for Treasurer" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-treasurer-1","electionId":"elec-treasurer","ipfsProfileHash":"Fiona Green"}'
call "Candidate 2 for Treasurer" POST "$BASE/voting/register/candidate" "$ADMIN_KEY" \
  '{"candidateId":"cand-treasurer-2","electionId":"elec-treasurer","ipfsProfileHash":"George Clark"}'

# ─── 4. Wait for blockchain ─────────────────────────
echo ""
echo "--- Waiting for blockchain (7s) ---"
sleep 7

# ─── 5. Approve all voters and candidates ───────────
echo ""
echo "--- Approving ---"
call_admin "Approve Voter 1" POST "$BASE/voting/approve/voter" "$ADMIN_KEY" \
  '{"id":"voter-alice","approve":true}'
call_admin "Approve Voter 2" POST "$BASE/voting/approve/voter" "$ADMIN_KEY" \
  '{"id":"voter-bob","approve":true}'
call_admin "Approve Voter 3" POST "$BASE/voting/approve/voter" "$ADMIN_KEY" \
  '{"id":"voter-charlie","approve":true}'

call_admin "Approve Candidate 1 (Community)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-community-1","electionId":"elec-community","approve":true}'
call_admin "Approve Candidate 2 (Community)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-community-2","electionId":"elec-community","approve":true}'
call_admin "Approve Candidate 3 (Community)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-community-3","electionId":"elec-community","approve":true}'
call_admin "Approve Candidate 1 (School)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-school-1","electionId":"elec-school","approve":true}'
call_admin "Approve Candidate 2 (School)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-school-2","electionId":"elec-school","approve":true}'
call_admin "Approve Candidate 1 (Treasurer)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-treasurer-1","electionId":"elec-treasurer","approve":true}'
call_admin "Approve Candidate 2 (Treasurer)" POST "$BASE/voting/approve/candidate" "$ADMIN_KEY" \
  '{"id":"cand-treasurer-2","electionId":"elec-treasurer","approve":true}'

# ─── 6. Wait for approvals ─────────────────────────
echo ""
echo "--- Waiting for blockchain (7s) ---"
sleep 7

# ─── 7. Cast some votes (active election only) ────
echo ""
echo "--- Casting Votes ---"
call "Vote Alice -> Candidate 1 (Community)" POST "$BASE/voting/vote" "$VOTER1_KEY" \
  '{"electionId":"elec-community","candidateId":"cand-community-1"}'
call "Vote Bob -> Candidate 2 (Community)" POST "$BASE/voting/vote" "$VOTER2_KEY" \
  '{"electionId":"elec-community","candidateId":"cand-community-2"}'

echo ""
echo "=========================================="
echo "  Seeding complete!"
echo "=========================================="
echo ""
echo "Elections created:"
echo "  - Community Council 2026 (active)"
echo "  - School Board Election (upcoming)"
echo "  - Treasurer Election (completed)"
echo ""
echo "Voters: alice, bob, charlie"
echo "Run with: LOCAL=true bash scripts/seed-elections.sh"
