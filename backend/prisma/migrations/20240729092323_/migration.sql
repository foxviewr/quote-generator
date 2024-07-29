/*
  Warnings:

  - You are about to drop the column `authorSlug` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `userUuid` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "authorSlug",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
