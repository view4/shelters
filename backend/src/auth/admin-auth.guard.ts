import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ROLES } from './schemas/const';

@Injectable()
export class AdminAuthGuard extends AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First verify authentication (calls parent AuthGuard logic)
    const isAuthenticated = await super.canActivate(context);
    
    if (!isAuthenticated) {
      return false;
    }

    // Get the user from the request (set by AuthGuard)
    const request = context.getArgByIndex(2);
    const user = request.user;

    // Check if user has admin role
    if (!user || !user.roles || !user.roles.includes(ROLES.ADMIN)) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
