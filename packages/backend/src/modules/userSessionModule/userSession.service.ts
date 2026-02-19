// src/modules/user/session.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: string, token: string, expiresAt: Date) {
    return this.prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
        isValid: true,
      },
    });
  }

  async validateSession(token: string): Promise<boolean> {
    const session = await this.prisma.session.findUnique({
      where: { token },
    });

    if (!session) return false;
    if (!session.isValid) return false;
    if (session.expiresAt < new Date()) return false;

    return true;
  }

  async invalidateSession(token: string): Promise<void> {
    await this.prisma.session.update({
      where: { token },
      data: { isValid: false },
    });
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { userId, isValid: true },
      data: { isValid: false },
    });
  }
}
