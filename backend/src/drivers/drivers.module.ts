import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TicketsModule } from '../tickets/tickets.module';
import { RolesGuard } from '../common/roles.guard';

@Module({
  imports: [TicketsModule],
  providers: [DriversService, RolesGuard],
  controllers: [DriversController],
})
export class DriversModule {}
