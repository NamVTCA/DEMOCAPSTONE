import { Controller, Post, Body, UseGuards, Req, Get, Put, Param, Patch } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('bookings')
export class BookingsController {
  constructor(private bs: BookingsService) {}

  @Post('hold')
  async hold(@Body() body: any, @Req() req: Request) {
    // body: tripId, passengers, contactName/Phone/Email, selectedSeats...
    const user = (req as any).user;
    const userId = user ? (user.userId || user.sub) : undefined;
    const payload = { ...body, userId };
    return this.bs.hold(payload);
  }

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    const user = (req as any).user;
    const userId = user ? (user.userId || user.sub) : undefined;
    const payload = { ...body, userId, status: 'confirmed' };
    return this.bs.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async userBookings(@Req() req: Request) {
    const user = (req as any).user;
    const userId = user.userId || user.sub;
    return this.bs.listByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.bs.cancel(id);
  }

  // mock confirm payment for demo:
  @UseGuards(JwtAuthGuard)
  @Patch(':id/mock-confirm-payment')
  async mockConfirm(@Param('id') id: string) {
    return this.bs.mockConfirmPayment(id);
  }
}
