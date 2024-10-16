/*
  Warnings:

  - You are about to drop the column `blocking_id` on the `Block` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blocker_id,blocked_id]` on the table `Block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingress_id]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blocker_id` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blocking_id_fkey";

-- DropIndex
DROP INDEX "Block_blocked_id_blocking_id_key";

-- DropIndex
DROP INDEX "Block_blocking_id_idx";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blocking_id",
ADD COLUMN     "blocker_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "is_chat_delayed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_chat_followers_only" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "ingress_id" DROP NOT NULL,
ALTER COLUMN "is_chat_enabled" SET DEFAULT true,
ALTER COLUMN "is_live" SET DEFAULT false,
ALTER COLUMN "server_url" DROP NOT NULL,
ALTER COLUMN "stream_key" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Block_blocker_id_idx" ON "Block"("blocker_id");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blocker_id_blocked_id_key" ON "Block"("blocker_id", "blocked_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_user_id_key" ON "Stream"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_ingress_id_key" ON "Stream"("ingress_id");

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
