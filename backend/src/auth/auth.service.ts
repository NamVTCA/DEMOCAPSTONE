import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../db.service';

@Injectable()
export class AuthService {
  constructor(private readonly db: DbService, private readonly jwtService: JwtService) {}

  async register(payload: { name?: string; email: string; password: string; phone?: string }) {
    const exist = this.db.findUserByEmail(payload.email);
    if (exist) throw new Error('Email already in use');
    const passwordHash = bcrypt.hashSync(payload.password, 8);
    const user = this.db.createUser({ name: payload.name, email: payload.email, phone: payload.phone, passwordHash });
    const { passwordHash: ph, ...userSafe } = user as any;
    const token = this.signToken(userSafe);
    return { user: userSafe, accessToken: token };
  }

  async login(email: string, password: string) {
    const user = this.db.findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    const { passwordHash, ...userSafe } = user as any;
    const token = this.signToken(userSafe);
    return { user: userSafe, accessToken: token };
  }

  signToken(user: any) {
    const payload = { id: user.id, email: user.email, roles: user.roles || [] };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET || 'replace_this_secret', expiresIn: '7d' });
  }
}
