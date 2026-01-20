import { Controller, Get, Query, Param } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get('search')
  async search(@Query() q: { from?: string; to?: string; date?: string; page?: string; limit?: string }) {
    const page = parseInt(q.page || '1', 10);
    const limit = parseInt(q.limit || '10', 10);
    return this.tripsService.searchTrips(q.from, q.to, q.date, limit, page);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.tripsService.getById(id);
  }
}
