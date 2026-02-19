// users.module.ts
import { Module } from '@nestjs/common';
import { UserSessionService } from './userSession.service';

@Module({
  controllers: [],
  providers: [UserSessionService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
