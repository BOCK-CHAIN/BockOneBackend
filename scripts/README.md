# BockDocs E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-bockdocs-backend/scripts/test-e2e.sh

# Local (requires backend running on port 3005)
LOCAL=true bash BockOneBackend-bockdocs-backend/scripts/test-e2e.sh
```

Tests document CRUD, sharing, and public access flows.
