import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserSessionCleanupService {
  private readonly logger = new Logger(UserSessionCleanupService.name);

  constructor(private readonly prisma: PrismaService) {}
  @Cron('0 0 * * *', {
    name: 'session-cleanup',
    timeZone: 'Asia/Singapore',
    waitForCompletion: true,
  })
  async cleanupExpiredSessions() {
    this.logger.log('Starting cleanup of expired sessions...');

    const result = await this.prisma.session.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isValid: false }],
      },
    });

    this.logger.log(`Cleaned up ${result.count} expired sessions`);
  }
}
