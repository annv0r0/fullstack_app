-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "weight" INTEGER,
    "unit" TEXT,
    "price" DECIMAL(10,2),
    "available" BOOLEAN,
    "rating" INTEGER,
    "image" TEXT,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_article_key" ON "Item"("article");
