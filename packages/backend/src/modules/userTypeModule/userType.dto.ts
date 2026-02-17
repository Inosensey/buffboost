import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTypeDTO {
  @IsNotEmpty()
  @IsString()
  typeName: string;
}

export class UpdateUserTypeDto {
  @IsNotEmpty()
  @IsString()
  typeName: string;
}
