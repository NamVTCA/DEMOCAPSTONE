// backend/src/users/users.controller.ts
import { Controller, Get, Put, Body, Param, UseGuards, Req, Patch, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const rand = Date.now();
    const name = `${rand}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, name);
  }
});

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Existing APIs kept
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

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Req() req: Request, @Body() body: any) {
    const payload: any = req.user;
    const id = payload.userId || payload.sub;
    const updated = await this.usersService.updateProfile(id, body);
    const { password, ...rest } = (updated as any).toObject();
    return rest;
  }

  // ---------- New: support mobile-app (/users/profile) as alias to /users/me ----------
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request) {
    // same as /me
    const payload: any = req.user;
    const id = payload.userId || payload.sub;
    const u = await this.usersService.findById(id);
    if (!u) return null;
    const { password, ...rest } = (u as any).toObject();
    return rest;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req: Request, @Body() body: any) {
    const payload: any = req.user;
    const id = payload.userId || payload.sub;
    const updated = await this.usersService.updateProfile(id, body);
    const { password, ...rest } = (updated as any).toObject();
    return rest;
  }

  // Upload avatar (simple JSON body { avatar: string }) - you may replace with multer for multipart
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  async uploadAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    const payload: any = (req as any).user;
    const id = payload.userId || payload.sub;
    // build public URL, prefer env APP_BASE_URL
    const base = (process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`);
    const avatarUrl = `${base}/uploads/${file.filename}`;

    // update user avatar
    const updated = await this.usersService.updateProfile(id, { avatar: avatarUrl } as any);
    // return shape mobile expects
    return { avatarUrl };
  }

  // change-password: body { currentPassword, newPassword }
  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(@Req() req: Request, @Body() body: { currentPassword: string; newPassword: string }) {
    const payload: any = req.user;
    const id = payload.userId || payload.sub;
    if (!body?.currentPassword || !body?.newPassword) {
      return { ok: false, message: 'currentPassword and newPassword are required' };
    }
    return this.usersService.changePassword(id, body.currentPassword, body.newPassword);
  }

  // Admin endpoints unchanged
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('system-admin', 'company-admin')
  @Get()
  async listAll() {
    return this.usersService.listUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('system-admin')
  @Put(':id/roles')
  async updateRoles(@Param('id') id: string, @Body() body: { roles: string[] }) {
    return this.usersService.updateRoles(id, body.roles);
  }
}
