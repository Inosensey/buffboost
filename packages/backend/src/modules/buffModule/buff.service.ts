import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MutateBuffDto } from './buff.dto';
import {
  ActiveBuffSelectedPayload,
  BuffSubscriptionSelectedPayload,
  BuffTypeSelectedPayload,
  PurchasedBuffSelectedPayload,
} from 'src/types/prismaTypes';
import Stripe from 'stripe';
import { CheckoutItemDTO } from '../stripeModule/stripe.dto';
import { Prisma } from '@prisma/client';
// import { StripeService } from '../stripeModule/stripe.service';

@Injectable()
export class BuffService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
    // private readonly stripe: StripeService,
  ) {}

  async createBuff(data: MutateBuffDto): Promise<BuffTypeSelectedPayload> {
    const newBuff = await this.prisma.buff.create({
      data: {
        name: data.name,
        emoji: data.emoji,
        type: data.type,
        description: data.description,
        tagline: data.tagline,
        price: data.price,
        category: data.category,
        durationHours: data.durationHours,
        isRecurring: data.isRecurring,
        recurrence: data.recurrence,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        type: true,
        description: true,
        tagline: true,
        price: true,
        category: true,
        durationHours: true,
        isRecurring: true,
        recurrence: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const newStripeProduct = await this.stripeClient.products.create({
      id: `prod_${newBuff.id}`,
      name: data.name,
      description: data.description,
      metadata: { db_id: newBuff.id },
    });

    const newStripePrice = await this.stripeClient.prices.create({
      product: newStripeProduct.id,
      unit_amount: data.price * 100,
      currency: 'usd',
      metadata: { db_id: newBuff.id },
    });

    const updateNewBuff = await this.prisma.buff.update({
      where: { id: newBuff.id },
      data: {
        stripeProductId: newStripeProduct.id,
        stripePriceId: newStripePrice.id,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        type: true,
        description: true,
        tagline: true,
        price: true,
        category: true,
        durationHours: true,
        isRecurring: true,
        recurrence: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updateNewBuff;
  }

  async activateBuff(
    userId: string,
    buffId: string,
    subscriptionData: BuffSubscriptionSelectedPayload,
  ): Promise<ActiveBuffSelectedPayload> {
    return await this.prisma.activeBuff.create({
      data: {
        userId: userId,
        buffId: buffId,
        buffSubscriptionId: subscriptionData.id,
        expiresAt: subscriptionData.currentPeriodEnd,
      },
      select: {
        id: true,
        activatedAt: true,
        expiresAt: true,
        isExpired: true,
        nextDeliveryAt: true,
        deliveryCount: true,
        createdAt: true,
        updatedAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
      },
    });
  }

  async createBuffSubscription(
    userId: string,
    buffId: string,
    session: Stripe.Checkout.Session,
  ): Promise<BuffSubscriptionSelectedPayload> {
    const stripeSubscription: Stripe.Subscription =
      await this.stripeClient.subscriptions.retrieve(
        session.subscription as string,
      );

    console.log('stripeSubscription', stripeSubscription);
    console.log('stripeSubscription items', stripeSubscription.items.data);

    const firstItem = stripeSubscription.items.data[0];
    const newBuffSubscription = await this.prisma.buffSubscription.create({
      data: {
        userId,
        buffId,
        stripeSubscriptionId: session.subscription as string,
        stripeCustomerId: session.customer as string,
        status: 'ACTIVE',
        currentPeriodStart: new Date(firstItem.current_period_start * 1000),
        currentPeriodEnd: new Date(firstItem.current_period_end * 1000),
        nextPaymentDate: new Date(firstItem.current_period_end * 1000),
      },
      select: {
        id: true,
        stripeSubscriptionId: true,
        stripeCustomerId: true,
        stripePriceId: true,
        status: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
        lastPaymentDate: true,
        nextPaymentDate: true,
        lastPaymentError: true,
        failedAttempts: true,
        createdAt: true,
        updatedAt: true,
        canceledAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            totalPurchases: true,
            activeBuffs: true,
          },
        },
      },
    });
    return newBuffSubscription;
  }

  async createBuffSubscriptionPayment(
    subscription: BuffSubscriptionSelectedPayload,
    invoice: Stripe.Invoice,
  ) {
    await this.prisma.bUffSubscriptionPayment.create({
      data: {
        buffSubscriptionId: subscription.id,
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_paid / 100,
        periodStart: new Date(invoice.period_start * 1000),
        periodEnd: new Date(invoice.period_end * 1000),
      },
    });
  }

  async updateBuffSubscriptionPeriod(
    subscription: BuffSubscriptionSelectedPayload,
    invoice: Stripe.Invoice,
  ) {
    await this.prisma.buffSubscription.update({
      where: { id: subscription.id },
      data: {
        currentPeriodStart: new Date(invoice.period_start * 1000),
        currentPeriodEnd: new Date(invoice.period_end * 1000),
        nextPaymentDate: new Date(invoice.period_end * 1000),
        lastPaymentDate: new Date(),
      },
    });
  }

  async extendActiveBuffPeriod(
    subscription: BuffSubscriptionSelectedPayload,
    invoice: Stripe.Invoice,
  ) {
    await this.prisma.activeBuff.update({
      where: {
        userId_buffId: {
          userId: subscription.user.id,
          buffId: subscription.buff.id,
        },
      },
      data: {
        expiresAt: new Date(invoice.period_end * 1000),
      },
    });
  }

  async recordPurchasedBuff(
    userId: string,
    data: CheckoutItemDTO,
    tx: Prisma.TransactionClient,
  ): Promise<PurchasedBuffSelectedPayload> {
    const buffInfo = await this.getBuff(data.buffId);

    let expiresAt: Date = new Date();

    if (buffInfo.type === 'instant') {
      expiresAt = new Date(
        Date.now() + buffInfo.durationHours * 60 * 60 * 1000,
      );
    } else if (buffInfo.type === 'subscription') {
      if (buffInfo.recurrence === 'DAILY') {
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      } else if (buffInfo.recurrence === 'WEEKLY') {
        expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      } else if (buffInfo.recurrence === 'MONTHLY') {
        expiresAt = new Date(expiresAt.setMonth(expiresAt.getMonth() + 1));
      } else {
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
    }
    const newPurchasedBUff = await tx.purchasedBuff.create({
      data: {
        userId: userId,
        buffId: data.buffId,
        gateway: 'stripe',
        status: 'PENDING',
        failureReason: '',
        isActive: false,
        recurrenceCount: 0,
        nextDeliveryAt: buffInfo.isRecurring ? expiresAt : null,
      },
      select: {
        id: true,
        userId: true,
        buffId: true,
        paymentId: true,
        amount: true,
        currency: true,
        gateway: true,
        status: true,
        startDate: true,
        endDate: true,
        isActive: true,
        recurrenceCount: true,
        nextDeliveryAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
      },
    });

    return newPurchasedBUff;
  }

  async updatePurchasedBuffWithStripSession(
    id: string,
    session: Stripe.Response<Stripe.Checkout.Session>,
    tx: Prisma.TransactionClient,
  ): Promise<PurchasedBuffSelectedPayload> {
    const updatedPurchasedBuff = await tx.purchasedBuff.update({
      where: { id },
      data: {
        paymentId: session.id,
        amount: session.amount_total! / 100,
        currency: session.currency!,
      },
      select: {
        id: true,
        userId: true,
        buffId: true,
        paymentId: true,
        amount: true,
        currency: true,
        gateway: true,
        status: true,
        startDate: true,
        endDate: true,
        isActive: true,
        recurrenceCount: true,
        nextDeliveryAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
      },
    });
    return updatedPurchasedBuff;
  }

  async updatePurchasedBuffStatus(
    purchasedBuffIds: string[],
  ): Promise<PurchasedBuffSelectedPayload[]> {
    await this.prisma.purchasedBuff.updateMany({
      where: {
        id: { in: purchasedBuffIds },
      },
      data: {
        status: 'COMPLETED',
      },
    });

    const updatedPurchasedBuffs =
      await this.getBuffsByPurchaseBuffId(purchasedBuffIds);
    return updatedPurchasedBuffs;
  }

  async updateBuff(
    id: string,
    data: MutateBuffDto,
  ): Promise<BuffTypeSelectedPayload> {
    return this.prisma.buff.update({
      where: { id },
      data: {
        name: data.name,
        emoji: data.emoji,
        type: data.type,
        description: data.description,
        tagline: data.tagline,
        price: data.price,
        category: data.category,
        durationHours: data.durationHours,
        isRecurring: data.isRecurring,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        type: true,
        description: true,
        tagline: true,
        price: true,
        category: true,
        durationHours: true,
        isRecurring: true,
        recurrence: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteBuff(id: string) {
    return this.prisma.buff.delete({ where: { id } });
  }

  async getBuffsByPurchaseBuffId(
    purchaseBuffIds: string[],
  ): Promise<PurchasedBuffSelectedPayload[]> {
    return this.prisma.purchasedBuff.findMany({
      where: { id: { in: purchaseBuffIds } },
      select: {
        id: true,
        userId: true,
        buffId: true,
        paymentId: true,
        amount: true,
        currency: true,
        gateway: true,
        status: true,
        startDate: true,
        endDate: true,
        isActive: true,
        recurrenceCount: true,
        nextDeliveryAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
      },
    });
  }

  async getBuffs(): Promise<BuffTypeSelectedPayload[]> {
    return this.prisma.buff.findMany({
      select: {
        id: true,
        name: true,
        emoji: true,
        type: true,
        description: true,
        tagline: true,
        price: true,
        category: true,
        durationHours: true,
        isRecurring: true,
        recurrence: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getBuff(id: string): Promise<BuffTypeSelectedPayload> {
    return this.prisma.buff.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        emoji: true,
        type: true,
        description: true,
        tagline: true,
        price: true,
        category: true,
        durationHours: true,
        isRecurring: true,
        recurrence: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getPurchasedBuffByPaymentId(
    paymentId: string,
  ): Promise<PurchasedBuffSelectedPayload[]> {
    return await this.prisma.purchasedBuff.findMany({
      where: { paymentId },
      select: {
        id: true,
        userId: true,
        buffId: true,
        paymentId: true,
        amount: true,
        currency: true,
        gateway: true,
        status: true,
        startDate: true,
        endDate: true,
        isActive: true,
        recurrenceCount: true,
        nextDeliveryAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
      },
    });
  }

  async getBuffSubscriptionByStripeSubId(stripeSubId: string) {
    return await this.prisma.buffSubscription.findUniqueOrThrow({
      where: { stripeSubscriptionId: stripeSubId },
      select: {
        id: true,
        stripeSubscriptionId: true,
        stripeCustomerId: true,
        stripePriceId: true,
        status: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
        lastPaymentDate: true,
        nextPaymentDate: true,
        lastPaymentError: true,
        failedAttempts: true,
        createdAt: true,
        updatedAt: true,
        canceledAt: true,
        buff: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true,
            description: true,
            tagline: true,
            price: true,
            category: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            totalPurchases: true,
            activeBuffs: true,
          },
        },
      },
    });
  }
}
