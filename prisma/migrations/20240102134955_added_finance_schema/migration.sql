-- CreateTable
CREATE TABLE "Finance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "tags" TEXT,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);
