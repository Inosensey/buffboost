import { Prisma } from '@prisma/client';

export type UserSelectedPayload = Prisma.UserGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    username: true;
    email: true;
    totalPurchases: true;
    activeBuffs: true;
    userType: {
      select: {
        id: true;
        typeName: true;
      };
    };
  };
}>;

export type UserTypeSelectedPayload = Prisma.UserTypeGetPayload<{
  select: {
    id: true;
    typeName: true;
  };
}>;

export type BuffTypeSelectedPayload = Prisma.BuffGetPayload<{
  select: {
    id: true;
    name: true;
    emoji: true;
    type: true;
    description: true;
    tagline: true;
    price: true;
    category: true;
    durationHours: true;
    isRecurring: true;
    recurrence: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type ActiveBuffSelectedPayload = Prisma.ActiveBuffGetPayload<{
  select: {
    id: true;
    activatedAt: true;
    expiresAt: true;
    isExpired: true;
    nextDeliveryAt: true;
    deliveryCount: true;
    createdAt: true;
    updatedAt: true;
    buff: {
      select: {
        id: true;
        name: true;
        emoji: true;
        type: true;
        description: true;
        tagline: true;
        price: true;
        category: true;
      };
    };
  };
}>;

export type PurchasedBuffSelectedPayload = Prisma.PurchasedBuffGetPayload<{
  select: {
    id: true;
    userId: true;
    buffId: true;
    paymentId: true;
    amount: true;
    currency: true;
    gateway: true;
    status: true;
    startDate: true;
    endDate: true;
    isActive: true;
    recurrenceCount: true;
    nextDeliveryAt: true;
    buff: {
      select: {
        id: true;
        name: true;
        emoji: true;
        type: true;
        description: true;
        tagline: true;
        price: true;
        category: true;
      };
    };
  };
}>;
