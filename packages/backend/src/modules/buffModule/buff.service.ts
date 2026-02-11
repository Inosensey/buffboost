import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MutateBuffDto, verifyPaymentDTO } from './buff.dto';
import {
  ActiveBuffSelectedPayload,
  BuffTypeSelectedPayload,
  PurchasedBuffSelectedPayload,
} from 'src/types/prismaTypes';
import Stripe from 'stripe';
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
    data: verifyPaymentDTO,
  ): Promise<ActiveBuffSelectedPayload> {
    const buffInfo = await this.getBuff(data.buffId);

    // Calculate expiry based on buff configuration
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
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      } else {
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
    }

    return await this.prisma.activeBuff.create({
      data: {
        userId: data.userId,
        buffId: data.buffId,
        purchaseId: data.purchaseId,
        activatedAt: new Date(),
        expiresAt: expiresAt,
        isExpired: false,
        nextDeliveryAt: buffInfo.isRecurring ? expiresAt : null,
        deliveryCount: 0,
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

  async recordPurchasedBuff(
    data: verifyPaymentDTO,
    session: Stripe.Response<Stripe.Checkout.Session>,
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
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      } else {
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
    }
    const newPurchasedBUff = await this.prisma.purchasedBuff.create({
      data: {
        userId: data.userId,
        buffId: data.buffId,
        paymentId: data.paymentId,
        amount: session.amount_total! / 100,
        currency: session.currency!,
        gateway: 'stripe',
        status: 'COMPLETED',
        startDate: new Date(),
        endDate: expiresAt,
        isActive: true,
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
        recurrence: data.recurrence,
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
}
