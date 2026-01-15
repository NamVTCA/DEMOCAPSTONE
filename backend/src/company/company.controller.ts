import { Controller, Post, Body, UseGuards, Get, Param, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('companies')
export class CompanyController {
  constructor(private cs: CompanyService) {}

  // Create company (system-admin or company-admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('system-admin')
  @Post()
  async create(@Body() body: any) {
    return this.cs.createCompany(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('system-admin', 'company-admin')
  @Get()
  async list() {
    return this.cs.listCompanies();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company-admin')
  @Post(':id/add-driver')
  async addDriver(@Param('id') id: string, @Body() body: { driverId: string }) {
    return this.cs.addDriverToCompany(id, body.driverId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company-admin')
  @Post(':id/trips')
  async createTrip(@Param('id') id: string, @Body() body: any) {
    // ensure companyId set
    const p = { ...body, companyId: id };
    return this.cs.createTrip(p);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company-admin')
  @Get(':id/trips')
  async listTrips(@Param('id') id: string) {
    return this.cs.listTripsByCompany(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company-admin')
  @Put('trips/:tripId/assign-driver')
  async assignDriver(@Param('tripId') tripId: string, @Body() body: { driverId: string }) {
    return this.cs.assignDriverToTrip(tripId, body.driverId);
  }
}
