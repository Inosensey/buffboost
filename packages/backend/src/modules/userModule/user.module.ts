// users.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSessionService } from '../userSessionModule/userSession.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserSessionService],
  exports: [UserService],
})
export class UserModule {}
