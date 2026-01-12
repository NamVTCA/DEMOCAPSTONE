import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto.name, dto.email, dto.password, dto.role || 'user');
    const { password, ...rest } = user.toObject();
    return rest;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const validated = await this.authService.validateUser(dto.email, dto.password);
    if (!validated) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(validated);
  }
}
