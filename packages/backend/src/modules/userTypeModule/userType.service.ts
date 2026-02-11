import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';

// Dto's
import { CreateUserTypeDTO, UpdateUserTypeDto } from './userType.dto';

// Types
import { UserTypeSelectedPayload } from 'src/types/prismaTypes';

@Injectable()
export class UserTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserType(
    data: CreateUserTypeDTO,
  ): Promise<UserTypeSelectedPayload> {
    return this.prisma.userType.create({
      data: {
        typeName: data.typeName,
      },
      select: {
        id: true,
        typeName: true,
      },
    });
  }

  async getUserTypes(): Promise<UserTypeSelectedPayload[]> {
    return await this.prisma.userType.findMany({
      select: {
        id: true,
        typeName: true,
      },
    });
  }

  async getUserTypeById(id: string): Promise<UserTypeSelectedPayload> {
    return await this.prisma.userType.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        typeName: true,
      },
    });
  }

  async updateUserType(
    id: string,
    data: UpdateUserTypeDto,
  ): Promise<UserTypeSelectedPayload> {
    return await this.prisma.userType.update({
      where: { id },
      data,
      select: {
        id: true,
        typeName: true,
      },
    });
  }

  async deleteUserType(id: string) {
    return await this.prisma.userType.delete({
      where: { id },
    });
  }
}
