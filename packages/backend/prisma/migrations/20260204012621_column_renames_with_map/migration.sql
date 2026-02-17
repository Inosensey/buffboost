/*
  Warnings:

  - You are about to drop the column `buffId` on the `purchased_buffs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `purchased_buffs` table. All the data in the column will be lost.
  - You are about to drop the column `activeBuffs` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalPurchases` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userTypeId` on the `users` table. All the data in the column will be lost.
  - Added the required column `buff_id` to the `purchased_buffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `purchased_buffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchased_buffs" DROP CONSTRAINT "purchased_buffs_buffId_fkey";

-- DropForeignKey
ALTER TABLE "purchased_buffs" DROP CONSTRAINT "purchased_buffs_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userTypeId_fkey";

-- DropIndex
DROP INDEX "purchased_buffs_buffId_idx";

-- DropIndex
DROP INDEX "purchased_buffs_userId_idx";

-- AlterTable
ALTER TABLE "purchased_buffs" DROP COLUMN "buffId",
DROP COLUMN "userId",
ADD COLUMN     "buff_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "activeBuffs",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "totalPurchases",
DROP COLUMN "updatedAt",
DROP COLUMN "userTypeId",
ADD COLUMN     "active_buffs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "total_purchases" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_type_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "purchased_buffs_user_id_idx" ON "purchased_buffs"("user_id");

-- CreateIndex
CREATE INDEX "purchased_buffs_buff_id_idx" ON "purchased_buffs"("buff_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_buffs" ADD CONSTRAINT "purchased_buffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_buffs" ADD CONSTRAINT "purchased_buffs_buff_id_fkey" FOREIGN KEY ("buff_id") REFERENCES "buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
