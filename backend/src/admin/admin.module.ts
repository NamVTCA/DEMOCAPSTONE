// backend/src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { TicketsModule } from '../tickets/tickets.module';
import { BookingsModule } from '../bookings/bookings.module';
import { TripsModule } from '../trips/trips.module';

@Module({
  imports: [UsersModule, CompanyModule, TicketsModule, BookingsModule, TripsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
