import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id, email: user.email, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string, role: string = 'user') {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    const user = await this.usersService.createUser(name, email, password, [role]);
    return user;
  }
}
