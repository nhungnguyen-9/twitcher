/*
  Warnings:

  - You are about to drop the column `externalUrl` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_externalUrl_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "externalUrl",
ADD COLUMN     "externalUserId" TEXT NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_externalUserId_key" ON "User"("externalUserId");
