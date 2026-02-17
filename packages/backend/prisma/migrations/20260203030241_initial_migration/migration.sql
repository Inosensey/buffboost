-- CreateEnum
CREATE TYPE "BuffCategory" AS ENUM ('instant', 'daily', 'weekly');

-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('daily', 'weekly', 'monthly');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('email', 'in_app', 'both');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('pending', 'sent', 'failed', 'opened');

-- CreateTable
CREATE TABLE "UserType" (
    "id" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userTypeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "totalPurchases" INTEGER NOT NULL DEFAULT 0,
    "activeBuffs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buffs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "category" "BuffCategory" NOT NULL DEFAULT 'instant',
    "duration_hours" INTEGER NOT NULL DEFAULT 24,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrence" "Recurrence" DEFAULT 'daily',
    "max_active_per_user" INTEGER NOT NULL DEFAULT 3,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchased_buffs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "buffId" TEXT NOT NULL,
    "payment_id" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "gateway" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'completed',
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "recurrence_count" INTEGER NOT NULL DEFAULT 0,
    "next_delivery_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchased_buffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_buffs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "buff_id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "activated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_expired" BOOLEAN NOT NULL DEFAULT false,
    "next_delivery_at" TIMESTAMP(3),
    "delivery_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "active_buffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "buff_id" TEXT NOT NULL,
    "delivered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_method" "DeliveryMethod" NOT NULL DEFAULT 'email',
    "status" "DeliveryStatus" NOT NULL DEFAULT 'sent',
    "email_id" TEXT,
    "opened_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserType_typeName_key" ON "UserType"("typeName");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_expires_at_idx" ON "sessions"("expires_at");

-- CreateIndex
CREATE INDEX "sessions_is_valid_idx" ON "sessions"("is_valid");

-- CreateIndex
CREATE UNIQUE INDEX "buffs_name_key" ON "buffs"("name");

-- CreateIndex
CREATE INDEX "buffs_category_idx" ON "buffs"("category");

-- CreateIndex
CREATE INDEX "buffs_is_recurring_idx" ON "buffs"("is_recurring");

-- CreateIndex
CREATE UNIQUE INDEX "purchased_buffs_payment_id_key" ON "purchased_buffs"("payment_id");

-- CreateIndex
CREATE INDEX "purchased_buffs_userId_idx" ON "purchased_buffs"("userId");

-- CreateIndex
CREATE INDEX "purchased_buffs_buffId_idx" ON "purchased_buffs"("buffId");

-- CreateIndex
CREATE INDEX "purchased_buffs_status_idx" ON "purchased_buffs"("status");

-- CreateIndex
CREATE INDEX "purchased_buffs_is_active_idx" ON "purchased_buffs"("is_active");

-- CreateIndex
CREATE INDEX "purchased_buffs_next_delivery_at_idx" ON "purchased_buffs"("next_delivery_at");

-- CreateIndex
CREATE INDEX "active_buffs_user_id_idx" ON "active_buffs"("user_id");

-- CreateIndex
CREATE INDEX "active_buffs_buff_id_idx" ON "active_buffs"("buff_id");

-- CreateIndex
CREATE INDEX "active_buffs_expires_at_idx" ON "active_buffs"("expires_at");

-- CreateIndex
CREATE INDEX "active_buffs_is_expired_idx" ON "active_buffs"("is_expired");

-- CreateIndex
CREATE UNIQUE INDEX "active_buffs_user_id_buff_id_key" ON "active_buffs"("user_id", "buff_id");

-- CreateIndex
CREATE INDEX "deliveries_purchase_id_idx" ON "deliveries"("purchase_id");

-- CreateIndex
CREATE INDEX "deliveries_user_id_idx" ON "deliveries"("user_id");

-- CreateIndex
CREATE INDEX "deliveries_delivered_at_idx" ON "deliveries"("delivered_at");

-- CreateIndex
CREATE INDEX "deliveries_status_idx" ON "deliveries"("status");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_buffs" ADD CONSTRAINT "purchased_buffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_buffs" ADD CONSTRAINT "purchased_buffs_buffId_fkey" FOREIGN KEY ("buffId") REFERENCES "buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_buffs" ADD CONSTRAINT "active_buffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_buffs" ADD CONSTRAINT "active_buffs_buff_id_fkey" FOREIGN KEY ("buff_id") REFERENCES "buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_buffs" ADD CONSTRAINT "active_buffs_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchased_buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchased_buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_buff_id_fkey" FOREIGN KEY ("buff_id") REFERENCES "buffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
