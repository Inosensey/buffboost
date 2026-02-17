// src/stripe/stripe.service.ts
import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { verifyPaymentDTO } from '../buffModule/buff.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCheckoutDTO } from './stripe.dto';
import { BuffService } from '../buffModule/buff.service';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly buff: BuffService,
  ) {}

  async createCheckoutSession(data: createCheckoutDTO) {
    const newPurchasedBUff = await this.buff.recordPurchasedBuff(data);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // mode: 'subscription', // or 'payment' for onse-time
      mode: 'payment',
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      customer_email: data.email,
      metadata: {
        purchasedBuffId: newPurchasedBUff.id,
        buffBoostUserId: data.userId,
      },
      success_url: `${this.configService.get('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel`,
    });

    await this.buff.updatePurchasedBuffWithStripSession(
      newPurchasedBUff.id,
      session,
    );
    return { sessionId: session.id, url: session.url };
  }

  async createSubscriptionCheckoutSession(data: createCheckoutDTO) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      customer_email: data.email,
      metadata: {
        userId: data.userId,
        buffId: data.buffId,
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
