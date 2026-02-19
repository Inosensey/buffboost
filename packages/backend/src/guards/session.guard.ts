import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/modules/userSessionModule/userSession.service';
import { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly userSessionService: UserSessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies?.token as string;

    if (!token) return false;

    return this.userSessionService.validateSession(token);
  }
}
