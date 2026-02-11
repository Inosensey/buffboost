// src/stripe/stripe.service.ts
import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { verifyPaymentDTO } from '../buffModule/buff.dto';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private configService: ConfigService,
  ) {}

  async createCheckoutSession(
    data: { priceId: string; customerEmail?: string },
    metadata?: Record<string, any>,
  ) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // mode: 'subscription', // or 'payment' for one-time
      mode: 'payment', // or 'payment' for one-time
      line_items: [
        {
          price: data.priceId, // Price ID from Stripe Dashboard
          quantity: 1,
        },
      ],
      customer_email: data.customerEmail,
      metadata,
      success_url: `${this.configService.get('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel`,
    });

    return { sessionId: session.id, url: session.url };
  }

  async getSession(data: verifyPaymentDTO) {
    return this.stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ['payment_intent', 'subscription', 'invoice'],
    });
  }
}
