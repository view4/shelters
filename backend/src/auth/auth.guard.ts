import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(2);
    const token = request.req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      request.user = await this.authService.verifyToken(token);
      return true;
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
