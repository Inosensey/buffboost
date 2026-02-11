// packages/backend/src/buff/dto/create-buff.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BuffCategory, Recurrence } from 'src/types/enum';

export class MutateBuffDto {
  @IsNotEmpty({ message: 'Buff name is required' })
  @IsString({ message: 'Buff name must be a string' })
  @Length(1, 100, { message: 'Buff name must be between 1 and 100 characters' })
  @Transform(({ value }) => String(value.trim()))
  name: string;

  @IsNotEmpty({ message: 'Emoji is required' })
  @IsString({ message: 'Emoji must be a string' })
  @Length(1, 10, { message: 'Emoji must be 1-10 characters' })
  @Transform(({ value }) => String(value.trim()))
  emoji: string;

  @IsNotEmpty({ message: 'Buff Type is required' })
  @IsString({ message: 'Buff Type must be a string' })
  @Transform(({ value }) => String(value.trim()))
  type: string;

  @IsNotEmpty({ message: 'Category is required' })
  @IsEnum(BuffCategory, {
    message: `Category must be one of: ${Object.values(BuffCategory).join(', ')}`,
  })
  @Transform(({ value }: { value: string }) => {
    const val = value.toLowerCase();
    if (val in BuffCategory) {
      return BuffCategory[val.toUpperCase() as keyof typeof BuffCategory];
    }
    return value;
  })
  category: BuffCategory;

  @IsString({ message: 'Description must be a string' })
  @Length(0, 500, { message: 'Description cannot exceed 500 characters' })
  @Transform(({ value }: { value: string }) => value?.trim() || '')
  description: string;

  @IsOptional()
  @IsString({ message: 'Tagline must be a string' })
  @Length(0, 100, { message: 'Tagline cannot exceed 100 characters' })
  @Transform(({ value }: { value: string }) => value?.trim())
  tagline: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  @Max(1000000, { message: 'Price cannot exceed 1,000,000' })
  @Type(() => Number)
  price: number;

  @IsNotEmpty({ message: 'Duration is required' })
  @IsNumber({}, { message: 'Duration must be a number' })
  @Min(1, { message: 'Duration must be at least 1 hour' })
  @Max(8760, { message: 'Duration cannot exceed 1 year (8760 hours)' })
  @Type(() => Number)
  durationHours: number;

  @IsNotEmpty({ message: 'Recurring flag is required' })
  @IsBoolean({ message: 'Recurring must be true or false' })
  @Transform(({ value }) => {
    if (value === 'true' || value === true || value === 1 || value === '1')
      return true;
    if (value === 'false' || value === false || value === 0 || value === '0')
      return false;
    return Boolean(value);
  })
  isRecurring: boolean;

  @IsOptional()
  @IsEnum(Recurrence, {
    message: `Recurrence must be one of: ${Object.values(Recurrence).join(', ')}`,
  })
  @Transform(({ value }: { value: string | undefined }) => {
    if (!value) return undefined;
    const val = value.toLowerCase();
    if (val in Recurrence) {
      return Recurrence[val.toUpperCase() as keyof typeof Recurrence];
    }
    return value;
  })
  recurrence?: Recurrence;
}

export class purchasedBuffDto {
  @IsNotEmpty({ message: 'User is required' })
  @IsString({ message: 'User must be a string' })
  @Transform(({ value }) => String(value.trim()))
  userId: string;

  @IsNotEmpty({ message: 'Buff is required' })
  @IsString({ message: 'Buff must be a string' })
  @Transform(({ value }) => String(value.trim()))
  buffId: string;

  @IsNotEmpty({ message: 'Payment ID is required' })
  @IsString({ message: 'Payment ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  paymentId: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Type(() => Number)
  amount: number;

  @IsNotEmpty({ message: 'Currency is required' })
  @IsString({ message: 'Currency must be a string' })
  @Transform(({ value }) => String(value.trim()))
  currency: string;

  @IsNotEmpty({ message: 'Gateway is required' })
  @IsString({ message: 'Gateway be a string' })
  @Transform(({ value }) => String(value.trim()))
  gateway: string;
}

export class verifyPaymentDTO {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  userId: string;

  @IsNotEmpty({ message: 'Buff ID is required' })
  @IsString({ message: 'Buff ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  buffId: string;

  @IsNotEmpty({ message: 'Purchase ID is required' })
  @IsString({ message: 'Purchase ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  purchaseId: string;

  @IsNotEmpty({ message: 'Payment ID is required' })
  @IsString({ message: 'Payment ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  paymentId: string;

  @IsNotEmpty({ message: 'Session ID is required' })
  @IsString({ message: 'Session ID must be a string' })
  @Transform(({ value }) => String(value.trim()))
  sessionId: string;
}
