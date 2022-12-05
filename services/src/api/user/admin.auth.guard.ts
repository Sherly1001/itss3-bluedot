import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest();
    const dbUser = await this.userService.getUser(user.userId);
    return dbUser?.data?.isAdmin == true;
  }
}
