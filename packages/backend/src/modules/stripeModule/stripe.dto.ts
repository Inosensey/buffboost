import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CheckoutItemDTO {
  @IsNotEmpty({ message: 'Price ID is required' })
  @IsString({ message: 'Price ID must be a string' })
  @Transform(({ value }) => String(value).trim())
  priceId: string;

  @IsNotEmpty({ message: 'Buff ID is required' })
  @IsString({ message: 'Buff ID must be a string' })
  @Transform(({ value }) => String(value).trim())
  buffId: string;
}

export class recordPurchasedDTO {
  @IsArray({ message: 'Items must be an array' })
  @ArrayNotEmpty({ message: 'At least one item is required' })
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDTO)
  items: CheckoutItemDTO[];
}

export class createCheckoutDTO {
  @IsArray({ message: 'Items must be an array' })
  @ArrayNotEmpty({ message: 'At least one item is required' })
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDTO)
  items: CheckoutItemDTO[];

  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  userId: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @Transform(({ value }) => String(value.trim()))
  email: string;

  @IsNotEmpty({ message: 'Payment Model is required' })
  @IsString({ message: 'Payment Model must be a string' })
  @Transform(({ value }) => String(value.trim()))
  paymentModel: string;
}

export class verifyPaymentDTO {
  // @IsString({ message: 'User ID must be a string' })
  // @Transform(({ value }) => String(value.trim()))
  // userId: string;

  // @IsString({ message: 'Buff ID must be a string' })
  // @Transform(({ value }) => String(value.trim()))
  // buffId: string;

  // @IsString({ message: 'Purchase ID must be a string' })
  // @Transform(({ value }) => String(value.trim()))
  // purchaseId: string;

  // @IsString({ message: 'Payment ID must be a string' })
  // @Transform(({ value }) => String(value.trim()))
  // paymentId: string;

  @IsNotEmpty({ message: 'Session ID is required' })
  @IsString({ message: 'Session ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  sessionId: string;
}
