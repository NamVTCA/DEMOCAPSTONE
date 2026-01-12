import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ValidateTicketDto } from './dto/validate-ticket.dto';
import { ConfirmTicketDto } from './dto/confirm-ticket.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@Controller('drivers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Post('validate')
  @Roles('driver')
  async validate(@Body() dto: ValidateTicketDto) {
    return this.driversService.validateTicket(dto.ticketId);
  }

  @Post('confirm-ticket')
  @Roles('driver')
  async confirm(@Body() dto: ConfirmTicketDto) {
    return this.driversService.confirmTicket(dto.ticketId);
  }
}
