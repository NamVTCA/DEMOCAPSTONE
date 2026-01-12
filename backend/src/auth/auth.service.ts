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
  // `user` should already be sanitized by validateUser (password removed)
  const payload = { sub: user._id, email: user.email, roles: user.roles };
  const accessToken = this.jwtService.sign(payload);

  // make sure we return sanitized user object (no password)
  // If caller passed a Mongoose doc (result of validateUser), it may already be a plain object.
  // Normalize to plain object:
  const userObj = typeof user.toObject === 'function' ? user.toObject() : user;

  // ensure password is removed just in case
  if (userObj && userObj.password) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (userObj as any).password;
  }

  return {
    accessToken,
    user: userObj,
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
