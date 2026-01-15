import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [UsersModule, CompanyModule, TicketsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
