// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiResponse } from 'src/utils/responseShaper';
import { verifyPaymentDTO } from '../buffModule/buff.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout')
  async createCheckout(@Body() data: { priceId: string; email?: string }) {
    const session = await this.stripeService.createCheckoutSession(data, {
      userId: '123',
    });
    return ApiResponse.success(session, 'Stripe Session Successfully Created');
  }

  @Post('verify-payment')
  async verifyPayment(@Body() data: verifyPaymentDTO) {
    const session = await this.stripeService.getSession(data);
    if (session.payment_status === 'paid') {
      return ApiResponse.success(true, 'Payment is Verified');
    }

    return ApiResponse.success(false, 'Payment failed to Verify');
  }
}
