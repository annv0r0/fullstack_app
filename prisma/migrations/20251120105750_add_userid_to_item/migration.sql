-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Item_userId_idx" ON "Item"("userId");
