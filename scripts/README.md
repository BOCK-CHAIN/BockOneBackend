# BockMaps E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-bockmaps-backend/scripts/test-e2e.sh

# Local (requires mapserver on port 3001, OpenResty on 8081)
LOCAL=true bash BockOneBackend-bockmaps-backend/scripts/test-e2e.sh
```

Tests mapserver auth, lists, stored addresses, contributed places, and OpenResty tile serving.
