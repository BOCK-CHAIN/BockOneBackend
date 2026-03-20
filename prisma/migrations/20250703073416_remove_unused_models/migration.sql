/*
  Warnings:

  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storage_usage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_userId_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activity_file_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activity_folder_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activity_share_fkey";

-- DropForeignKey
ALTER TABLE "shares" DROP CONSTRAINT "shares_fileId_fkey";

-- DropForeignKey
ALTER TABLE "shares" DROP CONSTRAINT "shares_userId_fkey";

-- DropForeignKey
ALTER TABLE "storage_usage" DROP CONSTRAINT "storage_usage_userId_fkey";

-- DropTable
DROP TABLE "activities";

-- DropTable
DROP TABLE "shares";

-- DropTable
DROP TABLE "storage_usage";

-- DropEnum
DROP TYPE "ActivityType";

-- DropEnum
DROP TYPE "ShareType";
