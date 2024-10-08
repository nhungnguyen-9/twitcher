/*
  Warnings:

  - You are about to drop the column `blockedId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `blockingId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `ingressID` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `isChatEnabled` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `isLive` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `serverUrl` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `streamKey` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `externalUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blocked_id,blocking_id]` on the table `Block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[follower_id,following_id]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stream_key]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blocked_id` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocking_id` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_id` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingress_id` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_chat_enabled` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_live` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server_url` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stream_key` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockedId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockingId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- DropIndex
DROP INDEX "Block_blockedId_blockingId_key";

-- DropIndex
DROP INDEX "Block_blockedId_idx";

-- DropIndex
DROP INDEX "Block_blockingId_idx";

-- DropIndex
DROP INDEX "Follow_followerId_followingId_key";

-- DropIndex
DROP INDEX "Follow_followerId_idx";

-- DropIndex
DROP INDEX "Follow_followingId_idx";

-- DropIndex
DROP INDEX "Stream_streamKey_key";

-- DropIndex
DROP INDEX "Stream_userId_idx";

-- DropIndex
DROP INDEX "User_externalUserId_key";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blockedId",
DROP COLUMN "blockingId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "blocked_id" BIGINT NOT NULL,
ADD COLUMN     "blocking_id" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "createdAt",
DROP COLUMN "followerId",
DROP COLUMN "followingId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "follower_id" BIGINT NOT NULL,
ADD COLUMN     "following_id" BIGINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "category",
DROP COLUMN "createdAt",
DROP COLUMN "ingressID",
DROP COLUMN "isChatEnabled",
DROP COLUMN "isLive",
DROP COLUMN "serverUrl",
DROP COLUMN "streamKey",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ingress_id" TEXT NOT NULL,
ADD COLUMN     "is_chat_enabled" BOOLEAN NOT NULL,
ADD COLUMN     "is_live" BOOLEAN NOT NULL,
ADD COLUMN     "server_url" TEXT NOT NULL,
ADD COLUMN     "stream_key" TEXT NOT NULL,
ADD COLUMN     "thumbnail_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "externalUserId",
DROP COLUMN "imageUrl",
DROP COLUMN "social",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "external_user_id" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "role_id" BIGINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamCategory" (
    "stream_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "StreamCategory_pkey" PRIMARY KEY ("stream_id","category_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" BIGSERIAL NOT NULL,
    "stream_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Block_blocked_id_idx" ON "Block"("blocked_id");

-- CreateIndex
CREATE INDEX "Block_blocking_id_idx" ON "Block"("blocking_id");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blocked_id_blocking_id_key" ON "Block"("blocked_id", "blocking_id");

-- CreateIndex
CREATE INDEX "Follow_follower_id_idx" ON "Follow"("follower_id");

-- CreateIndex
CREATE INDEX "Follow_following_id_idx" ON "Follow"("following_id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_follower_id_following_id_key" ON "Follow"("follower_id", "following_id");

-- CreateIndex
CREATE INDEX "Stream_user_id_idx" ON "Stream"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_stream_key_key" ON "Stream"("stream_key");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_external_user_id_key" ON "User"("external_user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamCategory" ADD CONSTRAINT "StreamCategory_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamCategory" ADD CONSTRAINT "StreamCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blocking_id_fkey" FOREIGN KEY ("blocking_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
