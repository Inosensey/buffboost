// src/stripe/stripe.service.ts
import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CheckoutItemDTO,
  createCheckoutDTO,
  verifyPaymentDTO,
} from './stripe.dto';
import { BuffService } from '../buffModule/buff.service';
import { PurchasedBuffSelectedPayload } from 'src/types/prismaTypes';
import { Prisma } from '@prisma/client';
import { UserService } from '../userModule/user.service';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly buff: BuffService,
    private readonly user: UserService,
  ) {}

  async createStripeCustomer(email: string, buffBoostUserId: string) {
    return await this.stripe.customers.create({
      email: email,
      metadata: {
        buffBoostUserId,
      },
    });
  }
  async getOrCreateStripeCustomer(
    userId: string,
    email: string,
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (user?.stripeCustomerId) {
      return user.stripeCustomerId as string;
    }

    const newStripeCustomer = await this.createStripeCustomer(email, userId);

    // Save to database
    await this.prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: newStripeCustomer.id },
    });

    return newStripeCustomer.id;
  }

  async createPurchasedBuffs(
    items: CheckoutItemDTO[],
    userId: string,
    tx: Prisma.TransactionClient,
  ) {
    const newPurchasedBuffs = await Promise.all(
      items.map((item: CheckoutItemDTO) =>
        this.buff.recordPurchasedBuff(userId, item, tx),
      ),
    );

    return newPurchasedBuffs;
  }

  async updatePurchasedBuffs(
    buffs: PurchasedBuffSelectedPayload[],
    session: Stripe.Response<Stripe.Checkout.Session>,
    tx: Prisma.TransactionClient,
  ) {
    const updatedPurchasedBuffs = await Promise.all(
      buffs.map((buff: PurchasedBuffSelectedPayload) =>
        this.buff.updatePurchasedBuffWithStripSession(buff.id, session, tx),
      ),
    );

    return updatedPurchasedBuffs;
  }

  async createCheckoutSession(data: createCheckoutDTO) {
    const stripeCustomerId = await this.getOrCreateStripeCustomer(
      data.userId,
      data.email,
    );

    const sessionRes = await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const newPurchasedBuffs = await this.createPurchasedBuffs(
          data.items,
          data.userId,
          tx,
        );

        const session = await this.stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: data.items.map((item) => {
            return {
              price: item.priceId,
              quantity: 1,
            };
          }),
          customer: stripeCustomerId,
          metadata: {
            purchasedBuffIds: JSON.stringify(
              newPurchasedBuffs.map((buff) => buff.id),
            ),
            buffBoostUserId: data.userId,
          },
          success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
        });

        await this.updatePurchasedBuffs(newPurchasedBuffs, session, tx);
        return { sessionId: session.id, url: session.url };
      },
    );
    return sessionRes;
  }

  async createSubscriptionCheckoutSession(data: createCheckoutDTO) {
    const stripeCustomerId = await this.getOrCreateStripeCustomer(
      data.userId,
      data.email,
    );
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: data.items.map((item) => {
        return {
          price: item.priceId,
          quantity: 1,
        };
      }),
      customer: stripeCustomerId,
      metadata: {
        userId: data.userId,
        buffId: data.items[0].buffId,
      },
      success_url: `${this.configService.get('FRONTEND_URL')}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/subscription/cancel`,
    });

    return { sessionId: session.id, url: session.url };
  }

  async getSession(data: verifyPaymentDTO) {
    return this.stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ['payment_intent', 'subscription', 'invoice'],
    });
  }

  async handleOneTimePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    // Find the checkout session
    const session = await this.stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
    });

    if (session.data.length > 0) {
      const checkoutSession = session.data[0];
      // Get user from metadata
      const userId = checkoutSession.metadata?.buffBoostUserId;
      const purchasedBuffId = checkoutSession.metadata?.buffBoostUserId;

      if (userId) {
        await this.prisma.purchasedBuff.updateMany({
          where: {
            id: purchasedBuffId,
          },
          data: {
            status: 'FAILED',
            failureReason:
              paymentIntent.last_payment_error?.message || 'Payment failed',
          },
        });

        console.log(`One-time payment failed for user ${userId}`);
      }
    }
  }

  async handleSubscriptionPaymentFailed(invoice: Stripe.Invoice) {
    const subscriptionLine = invoice.lines?.data[0];
    const subscriptionId = subscriptionLine?.subscription;

    if (!subscriptionId || typeof subscriptionId !== 'string') {
      console.log('No valid subscription found in invoice');
      return;
    }

    const subscription = await this.prisma.buffSubscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: true },
    });

    if (!subscription) return;

    await this.prisma.buffSubscription.update({
      where: { id: subscription.id },
      data: {
        status: 'PAST_DUE',
        lastPaymentError:
          invoice.last_finalization_error?.message || 'Payment failed',
        failedAttempts: {
          increment: 1,
        },
      },
    });

    console.log(
      `💳 Subscription ${subscription.id} payment failed: ${invoice.last_finalization_error?.message}`,
    );
  }

  async handleInvoicePaid(invoice: Stripe.Invoice) {
    const subscriptionId = invoice.lines?.data[0]?.subscription as string;

    if (!subscriptionId) {
      console.log('No subscription found in invoice');
      return;
    }
    const subscription = await this.prisma.buffSubscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: true },
    });

    if (!subscription) return;

    // Reactivate if it was PAST_DUE
    await this.prisma.buffSubscription.update({
      where: { id: subscriptionId },
      data: {
        status: 'ACTIVE',
        failedAttempts: 0,
        lastPaymentError: null,
        currentPeriodStart: new Date(invoice.period_start * 1000),
        currentPeriodEnd: new Date(invoice.period_end * 1000),
      },
    });

    await this.prisma.activeBuff.update({
      where: {
        userId_buffId: {
          userId: subscription.userId,
          buffId: subscription.buffId,
        },
      },
      data: {
        expiresAt: new Date(invoice.period_end * 1000),
      },
    });

    console.log(`✅ Subscription ${subscription.id} payment recovered!`);
  }
}
