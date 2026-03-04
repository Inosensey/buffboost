// src/stripe/stripe.controller.ts
import { Controller, Post, Body, Req, Inject, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiResponse } from 'src/utils/responseShaper';
import { createCheckoutDTO, verifyPaymentDTO } from './stripe.dto';
import Stripe from 'stripe';
import { BuffService } from '../buffModule/buff.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { BuffSubscriptionStatus } from 'src/types/enum';

@Controller('stripe')
export class StripeController {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private readonly stripeService: StripeService,
    private readonly buff: BuffService,
  ) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('create-checkout')
  async createCheckout(
    @Body()
    data: createCheckoutDTO,
  ) {
    const session = await this.stripeService.createCheckoutSession(data);
    return ApiResponse.success(session, 'Stripe Session Successfully Created');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('create-subscription-checkout')
  async createSubscriptionCheckout(@Body() data: createCheckoutDTO) {
    const session =
      await this.stripeService.createSubscriptionCheckoutSession(data);
    return ApiResponse.success(session, 'Stripe Session Successfully Created');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('verify-payment')
  async verifyPayment(@Body() data: verifyPaymentDTO) {
    const session = await this.stripeService.getSession(data);
    if (session.payment_status === 'paid') {
      return ApiResponse.success(session, 'Payment is Verified');
    }

    return ApiResponse.success(false, 'Payment failed to Verify');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('cancel-subscription')
  async cancelSubscription(
    @Body() data: { stripeSubscriptionId: string; immediate: boolean },
  ) {
    const response = await this.stripeService.cancelSubscription(
      data.stripeSubscriptionId,
      data.immediate,
    );
    return ApiResponse.success(response.data, response.message);
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const signature = request.headers['stripe-signature'] as string;

    interface RequestWithRawBody extends Request {
      rawBody: Buffer;
    }
    const rawBody = (request as RequestWithRawBody).rawBody;

    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (!rawBody) {
      throw new Error('No raw body found');
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.mode === 'subscription') {
          const { userId, buffId } = session.metadata as {
            userId: string;
            buffId: string;
          };

          const subscription = await this.buff.createBuffSubscription(
            userId,
            buffId,
            session,
          );

          await this.buff.activateBuff(userId, buffId, subscription);
        } else if (session.mode === 'payment') {
          const purchasedBuffIds = JSON.parse(
            session.metadata?.purchasedBuffIds || '[]',
          ) as string[];
          await this.buff.updatePurchasedBuffStatus(purchasedBuffIds);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        const subscriptionId = invoice.parent?.subscription_details
          ?.subscription as string;

        const subscription =
          await this.buff.getBuffSubscriptionByStripeSubId(subscriptionId);

        if (subscription) {
          await this.buff.createBuffSubscriptionPayment(subscription, invoice);

          await this.buff.updateBuffSubscriptionPeriod(subscription, invoice);

          await this.buff.extendActiveBuffPeriod(subscription, invoice);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const isExpired = true;

        const stripeSubscription = event.data.object;

        const buffSubscription =
          await this.buff.getBuffSubscriptionByStripeSubId(
            stripeSubscription.id,
          );

        await this.buff.updateBuffSubscriptionStatus(
          buffSubscription,
          BuffSubscriptionStatus.CANCELED,
        );

        // Deactivate the buff
        await this.buff.updateActiveBuffStatus(buffSubscription, isExpired);
        break;
      }
    }
  }
}
