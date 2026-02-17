import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './prisma/prisma.module';
import { UserModule } from './modules/userModule/user.module';
import { UserTypeModule } from './modules/userTypeModule/userType.module';
import { BuffModule } from './modules/buffModule/buff.module';
import { StripeModule } from './modules/stripeModule/stripe.module';
import { ConfigModule } from '@nestjs/config';
// import { StripeController } from './modules/stripeModule/stripe.controller';
// import { StripeService } from './modules/stripeModule/stripe.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StripeModule,
    DatabaseModule,
    UserModule,
    UserTypeModule,
    BuffModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
