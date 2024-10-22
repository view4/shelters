import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const [request, token] = await this.getToken(context);
      if (!token) throw new Error('No Valid Token');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
      request.user = payload;
      return true;
    } catch (e) {
      throw new Error('User not authorized');
      return false;
    }
  }

  BEARER = 'Bearer';
  async getToken(context: ExecutionContext): Promise<[any, string]> {
    const request = context.getArgByIndex(2);
    const [type, token] = request.req.headers.authorization?.split(' ');
    if (type !== this.BEARER) throw new Error('User not authorized');
    return [request, token];
  }
}
