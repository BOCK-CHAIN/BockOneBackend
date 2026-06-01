# BockFoods E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-bockfoods-backend/scripts/test-e2e.sh

# Local (requires backend running on port 3003)
LOCAL=true bash BockOneBackend-bockfoods-backend/scripts/test-e2e.sh
```

Tests auth, user profile, restaurant/menu/category browsing, grocery stores, cart, and orders.
