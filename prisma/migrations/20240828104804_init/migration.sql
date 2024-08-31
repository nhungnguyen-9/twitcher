-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "imageUrl" TEXT,
    "externalUrl" TEXT,
    "bio" TEXT,
    "social" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" BIGSERIAL NOT NULL,
    "followerId" BIGINT NOT NULL,
    "followingId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" BIGSERIAL NOT NULL,
    "blockedId" BIGINT NOT NULL,
    "blockingId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "category" TEXT,
    "ingressID" TEXT NOT NULL,
    "serverUrl" TEXT NOT NULL,
    "streamKey" TEXT NOT NULL,
    "isLive" BOOLEAN NOT NULL,
    "isChatEnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_username" ON "User"("username");

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "Block_blockedId_idx" ON "Block"("blockedId");

-- CreateIndex
CREATE INDEX "Block_blockingId_idx" ON "Block"("blockingId");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockedId_blockingId_key" ON "Block"("blockedId", "blockingId");

-- CreateIndex
CREATE INDEX "Stream_userId_idx" ON "Stream"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_streamKey_key" ON "Stream"("streamKey");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockingId_fkey" FOREIGN KEY ("blockingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
