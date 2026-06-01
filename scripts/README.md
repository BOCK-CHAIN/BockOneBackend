# Orventus E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-orventus-backend/scripts/test-e2e.sh

# Local (requires backend running on port 3000)
LOCAL=true bash BockOneBackend-orventus-backend/scripts/test-e2e.sh
```

Tests phone+OTP auth, user profile, vehicles, promo codes, settings, notifications, document types, and reviews.
