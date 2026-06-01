DO $$
BEGIN
	CREATE TYPE "UserRole" AS ENUM ('user', 'admin');
EXCEPTION
	WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
	CREATE TYPE "PlanType" AS ENUM ('free', 'pro', 'business');
EXCEPTION
	WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "password" TEXT,
ADD COLUMN IF NOT EXISTS "hexId" TEXT,
ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'user',
ADD COLUMN IF NOT EXISTS "profilePictureS3Key" TEXT,
ADD COLUMN IF NOT EXISTS "storageUsed" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "planType" "PlanType" NOT NULL DEFAULT 'free',
ADD COLUMN IF NOT EXISTS "passwordResetToken" TEXT,
ADD COLUMN IF NOT EXISTS "passwordResetExpiry" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "mfaEnabled" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS "users_hexId_key" ON "users"("hexId");

ALTER TABLE "files"
ADD COLUMN IF NOT EXISTS "filePath" TEXT,
ADD COLUMN IF NOT EXISTS "cloudFrontUrl" TEXT,
ADD COLUMN IF NOT EXISTS "versionCount" INTEGER NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"action" TEXT NOT NULL,
	"resourceType" TEXT NOT NULL,
	"resourceId" TEXT,
	"metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
	"ipAddress" TEXT,
	"userAgent" TEXT,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "audit_logs_userId_idx" ON "audit_logs"("userId");
CREATE INDEX IF NOT EXISTS "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");
CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs"("action");

DO $$
BEGIN
	ALTER TABLE "audit_logs"
		ADD CONSTRAINT "audit_logs_userId_fkey"
		FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
	WHEN duplicate_object THEN NULL;
END $$;
