import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth || typeof auth !== 'string' || !auth.startsWith('Bearer ')) return false;
    const token = auth.slice(7);
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'replace_this_secret' });
      req.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
