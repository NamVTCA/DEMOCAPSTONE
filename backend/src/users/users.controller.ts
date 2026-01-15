import { Controller, Get, Put, Body, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get my profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const payload: any = req.user;
    const id = payload.userId || payload.sub;
    const u = await this.usersService.findById(id);
    if (!u) return null;
    const { password, ...rest } = (u as any).toObject();
    return rest;
  }

  // Update my profile
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Req() req: Request, @Body() body: any) {
    const payload: any = req.user;
    const id = payload.userId || payload.sub;
    const updated = await this.usersService.updateProfile(id, body);
    const { password, ...rest } = (updated as any).toObject();
    return rest;
  }

  // Admin: list users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('system-admin', 'company-admin')
  @Get()
  async listAll() {
    return this.usersService.listUsers();
  }

  // Admin/system: change roles for user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('system-admin')
  @Put(':id/roles')
  async updateRoles(@Param('id') id: string, @Body() body: { roles: string[] }) {
    return this.usersService.updateRoles(id, body.roles);
  }
}
