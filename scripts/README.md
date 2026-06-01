# BockDrive E2E Tests

```bash
# Remote (ALB)
bash BockOneBackend-bockdrive-backend/scripts/test-e2e.sh

# Local (requires backend running on port 3004)
LOCAL=true bash BockOneBackend-bockdrive-backend/scripts/test-e2e.sh
```

Tests file upload/download (S3), folders, star/trash/restore, and sharing.
