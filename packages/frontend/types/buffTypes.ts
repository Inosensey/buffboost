interface Buff {
  id: string;
  name: string;
  emoji: string;
  type: BuffType;
  description: string;
  tagline: string;
  price: number;
  category: BuffCategory;
  durationHours: number;
  isRecurring: boolean;
  recurrence: Recurrence;
  stripeProductId: string,
  stripePriceId: string,
  createdAt: string;
  updatedAt: string;
}

interface ActiveBuff {
    id: string;
    activatedAt: string;
    expiresAt: string;
    isExpired: boolean;
    nextDeliveryAt: string | null;
    deliveryCount: number;
    createdAt: string;
    updatedAt: string;
    buff: Buff
    buffSubscription: {
        stripeSubscriptionId: string,
    },
}

interface purchasedBuff {
    id: string;
    userId: string;
    buffId: string;
    paymentId: string;
    amount: number;
    currency: string;
    gateway: string;
    status: string;
    startDate: Date;
    endDate: Date | null;
    isActive: boolean;
    recurrenceCount: number;
    nextDeliveryAt: Date | null;
    buff: Buff
}

type BuffCategory = "INSTANT" | "DAILY" | "WEEKLY";

type BuffType = "instantBuffs" | "dailyBlessings";

type Recurrence = "DAILY" | "WEEKLY" | "MONTHLY";
