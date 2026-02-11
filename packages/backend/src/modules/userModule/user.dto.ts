import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  userTypeId: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  userTypeId: string;
}

export class UserCredentialsDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
