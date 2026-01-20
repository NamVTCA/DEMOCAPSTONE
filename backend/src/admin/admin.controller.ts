// backend/src/admin/admin.controller.ts
import { Controller, UseGuards, Get, Body, Put, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('system-admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  async users() {
    return this.adminService.listUsers();
  }

  @Get('companies')
  async companies() {
    return this.adminService.listCompanies();
  }

  // NEW: Dashboard endpoint
  @Get('dashboard')
  async dashboard() {
    return this.adminService.getDashboardStats();
  }

  @Put('users/:id/roles')
  async updateRoles(@Param('id') id: string, @Body() body: { roles: string[] }) {
    return this.adminService.setUserRoles(id, body.roles);
  }
}
