import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// Services
import { PrismaService } from 'src/prisma/prisma.service';

// Dto's
import { CreateUserDTO, UpdateUserDto, UserCredentialsDTO } from './user.dto';

// Types
import {
  UserSelectedPayload,
  UserTypeSelectedPayload,
} from 'src/types/prismaTypes';
import { UserSessionService } from '../userSessionModule/userSession.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userSession: UserSessionService,
  ) {}

  async createUser(data: CreateUserDTO): Promise<UserSelectedPayload> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        userTypeId: data.userTypeId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        totalPurchases: true,
        activeBuffs: true,
        userType: {
          select: {
            id: true,
            typeName: true,
          },
        },
      },
    });
  }

  async getUsers(): Promise<UserSelectedPayload[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        totalPurchases: true,
        activeBuffs: true,
        userType: {
          select: {
            id: true,
            typeName: true,
          },
        },
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

  async getUserTypesById(id: string): Promise<UserTypeSelectedPayload> {
    return await this.prisma.userType.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        typeName: true,
        createdAt: true,
      },
    });
  }

  async getUserById(id: string): Promise<UserSelectedPayload> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        totalPurchases: true,
        activeBuffs: true,
        userType: {
          select: {
            id: true,
            typeName: true,
          },
        },
      },
    });
  }

  async userSignIn(
    credentials: UserCredentialsDTO,
  ): Promise<{ token: string; userId: string; userType: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
      select: {
        id: true,
        email: true,
        password: true,
        userTypeId: true,
        userType: {
          select: {
            typeName: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordIsValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create JWT token
    const token = this.generateJwtToken(user.id, user.userType.typeName);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.userSession.createSession(user.id, token, expiresAt);

    return {
      token,
      userId: user.id,
      userType: user.userType.typeName,
    };
  }

  async signOut(token: string): Promise<void> {
    await this.userSession.invalidateSession(token);
  }

  async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserSelectedPayload> {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        totalPurchases: true,
        activeBuffs: true,
        userType: {
          select: {
            id: true,
            typeName: true,
          },
        },
      },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  private generateJwtToken(userId: string, userType: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
      {
        userId,
        userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
