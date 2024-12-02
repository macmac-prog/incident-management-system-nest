/*
  Warnings:

  - You are about to drop the column `userId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_userId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_TeamToUserLogin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TeamToUserLogin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TeamToUserLogin_B_index" ON "_TeamToUserLogin"("B");

-- AddForeignKey
ALTER TABLE "_TeamToUserLogin" ADD CONSTRAINT "_TeamToUserLogin_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUserLogin" ADD CONSTRAINT "_TeamToUserLogin_B_fkey" FOREIGN KEY ("B") REFERENCES "UserLogin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
