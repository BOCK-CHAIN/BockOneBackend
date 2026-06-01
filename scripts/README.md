# BockVote E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-bockvote-backend/scripts/test-e2e.sh

# Local (requires backend running on port 9000)
LOCAL=true bash BockOneBackend-bockvote-backend/scripts/test-e2e.sh
```

Tests election creation, candidate/voter registration, approvals, voting, and results via blockchain-based voting API.
