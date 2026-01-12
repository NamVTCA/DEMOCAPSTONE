import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.auth.register(body);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message || 'Error' });
    }
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    try {
      const { email, password } = body;
      const result = await this.auth.login(email, password);
      return res.json(result);
    } catch (e) {
      return res.status(401).json({ message: e.message || 'Invalid credentials' });
    }
  }
}
