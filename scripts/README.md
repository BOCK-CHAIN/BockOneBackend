# Krysonix E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-krysonix-backend/scripts/test-e2e.sh

# Local (requires backend running on port 5000)
LOCAL=true bash BockOneBackend-krysonix-backend/scripts/test-e2e.sh
```

Tests video upload to S3, listing, likes, comments, and S3 cleanup on delete.
