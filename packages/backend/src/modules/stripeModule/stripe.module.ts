// src/stripe/stripe.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { BuffService } from '../buffModule/buff.service';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [StripeController],
  providers: [
    StripeService,
    BuffService,
    {
      provide: 'STRIPE_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Stripe(configService.get<string>('STRIPE_SECRET_KEY')!, {});
      },
      inject: [ConfigService],
    },
  ],
  exports: [StripeService, BuffService, 'STRIPE_CLIENT'],
})
export class StripeModule {}
