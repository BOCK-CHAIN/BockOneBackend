/*
  Warnings:

  - You are about to drop the `Drive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('FILE', 'FOLDER');

-- CreateEnum
CREATE TYPE "ShareType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('UPLOAD', 'DOWNLOAD', 'DELETE', 'CREATE_FOLDER', 'RENAME', 'MOVE', 'SHARE', 'UNSHARE', 'RESTORE', 'EMPTY_TRASH');

-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('PENDING', 'UPLOADING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Drive" DROP CONSTRAINT "Drive_userId_fkey";

-- DropTable
DROP TABLE "Drive";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "firebaseUid" TEXT,
    "profilePicture" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "storageQuota" BIGINT NOT NULL DEFAULT 5368709120,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    "color" TEXT,
    "description" TEXT,
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "isInTrash" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trashedAt" TIMESTAMP(3),

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "s3Bucket" TEXT NOT NULL,
    "s3Url" TEXT,
    "folderId" TEXT,
    "userId" TEXT NOT NULL,
    "checksum" TEXT,
    "thumbnail" TEXT,
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "isInTrash" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trashedAt" TIMESTAMP(3),
    "lastAccessedAt" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shares" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "ShareType" NOT NULL DEFAULT 'PUBLIC',
    "password" TEXT,
    "allowDownload" BOOLEAN NOT NULL DEFAULT true,
    "allowPreview" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "fileId" TEXT,
    "folderId" TEXT,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastAccessedAt" TIMESTAMP(3),

    CONSTRAINT "shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "entityId" TEXT,
    "entityType" TEXT,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage_usage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalSize" BIGINT NOT NULL DEFAULT 0,
    "fileCount" INTEGER NOT NULL DEFAULT 0,
    "documentsSize" BIGINT NOT NULL DEFAULT 0,
    "imagesSize" BIGINT NOT NULL DEFAULT 0,
    "videosSize" BIGINT NOT NULL DEFAULT 0,
    "audioSize" BIGINT NOT NULL DEFAULT 0,
    "othersSize" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storage_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" BIGINT,
    "mimeType" TEXT,
    "folderId" TEXT,
    "s3Key" TEXT NOT NULL,
    "uploadUrl" TEXT NOT NULL,
    "status" "UploadStatus" NOT NULL DEFAULT 'PENDING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "upload_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_firebaseUid_key" ON "users"("firebaseUid");

-- CreateIndex
CREATE INDEX "folders_userId_idx" ON "folders"("userId");

-- CreateIndex
CREATE INDEX "folders_parentId_idx" ON "folders"("parentId");

-- CreateIndex
CREATE INDEX "folders_userId_parentId_idx" ON "folders"("userId", "parentId");

-- CreateIndex
CREATE INDEX "folders_isInTrash_idx" ON "folders"("isInTrash");

-- CreateIndex
CREATE UNIQUE INDEX "files_s3Key_key" ON "files"("s3Key");

-- CreateIndex
CREATE INDEX "files_userId_idx" ON "files"("userId");

-- CreateIndex
CREATE INDEX "files_folderId_idx" ON "files"("folderId");

-- CreateIndex
CREATE INDEX "files_userId_folderId_idx" ON "files"("userId", "folderId");

-- CreateIndex
CREATE INDEX "files_isInTrash_idx" ON "files"("isInTrash");

-- CreateIndex
CREATE INDEX "files_s3Key_idx" ON "files"("s3Key");

-- CreateIndex
CREATE UNIQUE INDEX "shares_token_key" ON "shares"("token");

-- CreateIndex
CREATE INDEX "shares_token_idx" ON "shares"("token");

-- CreateIndex
CREATE INDEX "shares_userId_idx" ON "shares"("userId");

-- CreateIndex
CREATE INDEX "shares_fileId_idx" ON "shares"("fileId");

-- CreateIndex
CREATE INDEX "activities_userId_idx" ON "activities"("userId");

-- CreateIndex
CREATE INDEX "activities_entityId_idx" ON "activities"("entityId");

-- CreateIndex
CREATE INDEX "activities_type_idx" ON "activities"("type");

-- CreateIndex
CREATE INDEX "activities_createdAt_idx" ON "activities"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "storage_usage_userId_key" ON "storage_usage"("userId");

-- CreateIndex
CREATE INDEX "upload_sessions_userId_idx" ON "upload_sessions"("userId");

-- CreateIndex
CREATE INDEX "upload_sessions_status_idx" ON "upload_sessions"("status");

-- CreateIndex
CREATE INDEX "upload_sessions_expiresAt_idx" ON "upload_sessions"("expiresAt");

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activity_file_fkey" FOREIGN KEY ("entityId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activity_folder_fkey" FOREIGN KEY ("entityId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activity_share_fkey" FOREIGN KEY ("entityId") REFERENCES "shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_usage" ADD CONSTRAINT "storage_usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload_sessions" ADD CONSTRAINT "upload_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
