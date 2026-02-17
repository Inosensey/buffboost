/*
  Warnings:

  - The values [in_app,both] on the enum `DeliveryMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `max_active_per_user` on the `buffs` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryMethod_new" AS ENUM ('email');
ALTER TABLE "public"."deliveries" ALTER COLUMN "delivery_method" DROP DEFAULT;
ALTER TABLE "deliveries" ALTER COLUMN "delivery_method" TYPE "DeliveryMethod_new" USING ("delivery_method"::text::"DeliveryMethod_new");
ALTER TYPE "DeliveryMethod" RENAME TO "DeliveryMethod_old";
ALTER TYPE "DeliveryMethod_new" RENAME TO "DeliveryMethod";
DROP TYPE "public"."DeliveryMethod_old";
ALTER TABLE "deliveries" ALTER COLUMN "delivery_method" SET DEFAULT 'email';
COMMIT;

-- AlterTable
ALTER TABLE "buffs" DROP COLUMN "max_active_per_user",
ADD COLUMN     "stripe_price_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "stripe_product_id" TEXT NOT NULL DEFAULT '';
