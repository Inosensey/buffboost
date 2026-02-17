import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class createCheckoutDTO {
  @IsNotEmpty({ message: 'Price ID is required' })
  @IsString({ message: 'Price ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  priceId: string;

  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  userId: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @Transform(({ value }) => String(value.trim()))
  email: string;

  @IsNotEmpty({ message: 'Buff ID is required' })
  @IsString({ message: 'Buff ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  buffId: string;

  @IsNotEmpty({ message: 'Payment Model is required' })
  @IsString({ message: 'Payment Model must be a string' })
  @Transform(({ value }) => String(value.trim()))
  paymentModel: string;
}
