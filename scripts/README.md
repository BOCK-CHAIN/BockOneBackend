# Golligog E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-golligog-backend/scripts/test-e2e.sh

# Local (requires backend running on port 5000)
LOCAL=true bash BockOneBackend-golligog-backend/scripts/test-e2e.sh
```

Tests auth (register/login), profile, search history, and public search endpoint.
