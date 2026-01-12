import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { DbService } from '../db.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly db: DbService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    const user = this.db.findUserById(req.user.id);
    if (!user) return { message: 'User not found' };
    const { passwordHash, ...rest } = user as any;
    return rest;
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: any, @Body() body: any) {
    const updated = this.db.updateUser(req.user.id, {
      name: body.name,
      phone: body.phone,
      avatar: body.avatar,
    } as any);
    return updated || { message: 'Not found' };
  }
}
