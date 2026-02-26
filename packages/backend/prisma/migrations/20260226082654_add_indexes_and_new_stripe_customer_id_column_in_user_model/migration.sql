-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_customer_id" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "users_user_type_id_idx" ON "users"("user_type_id");

-- CreateIndex
CREATE INDEX "users_stripe_customer_id_idx" ON "users"("stripe_customer_id");
