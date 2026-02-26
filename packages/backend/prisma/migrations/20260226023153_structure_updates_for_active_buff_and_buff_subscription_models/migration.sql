/*
  Warnings:

  - You are about to drop the column `purchase_id` on the `active_buffs` table. All the data in the column will be lost.
  - Added the required column `buff_subscription_id` to the `active_buffs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "active_buffs" DROP CONSTRAINT "active_buffs_purchase_id_fkey";

-- AlterTable
ALTER TABLE "active_buffs" DROP COLUMN "purchase_id",
ADD COLUMN     "buff_subscription_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "active_buffs" ADD CONSTRAINT "active_buffs_buff_subscription_id_fkey" FOREIGN KEY ("buff_subscription_id") REFERENCES "buff_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
