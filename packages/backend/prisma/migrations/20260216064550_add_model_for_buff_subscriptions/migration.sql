/*
  Warnings:

  - Added the required column `failure_reason` to the `purchased_buffs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentModel" AS ENUM ('one_time', 'subscription', 'both');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'past_due', 'canceled', 'expired');

-- AlterTable
ALTER TABLE "purchased_buffs" ADD COLUMN     "failure_reason" TEXT NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;

-- CreateTable
CREATE TABLE "buff_subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "buff_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT,
    "stripe_customer_id" TEXT,
    "stripe_price_id" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'active',
    "current_period_start" TIMESTAMP(3) NOT NULL,
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "last_payment_date" TIMESTAMP(3),
    "next_payment_date" TIMESTAMP(3),
    "last_payment_error" TEXT,
    "failed_attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "canceled_at" TIMESTAMP(3),

    CONSTRAINT "buff_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_payments" (
    "id" TEXT NOT NULL,
    "buff_subscription_id" TEXT NOT NULL,
    "stripe_invoice_id" TEXT,
    "stripe_payment_intent_id" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" "PaymentStatus" NOT NULL DEFAULT 'completed',
    "failure_reason" TEXT,
    "period_start" TIMESTAMP(3) NOT NULL,
    "period_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buff_subscriptions_stripe_subscription_id_key" ON "buff_subscriptions"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "buff_subscriptions_user_id_idx" ON "buff_subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "buff_subscriptions_status_idx" ON "buff_subscriptions"("status");

-- CreateIndex
CREATE INDEX "buff_subscriptions_next_payment_date_idx" ON "buff_subscriptions"("next_payment_date");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_payments_stripe_invoice_id_key" ON "subscription_payments"("stripe_invoice_id");

-- CreateIndex
CREATE INDEX "subscription_payments_buff_subscription_id_idx" ON "subscription_payments"("buff_subscription_id");

-- AddForeignKey
ALTER TABLE "buff_subscriptions" ADD CONSTRAINT "buff_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buff_subscriptions" ADD CONSTRAINT "buff_subscriptions_buff_id_fkey" FOREIGN KEY ("buff_id") REFERENCES "buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_payments" ADD CONSTRAINT "subscription_payments_buff_subscription_id_fkey" FOREIGN KEY ("buff_subscription_id") REFERENCES "buff_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
