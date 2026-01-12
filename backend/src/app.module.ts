import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { TicketsModule } from './tickets/tickets.module';
import { HealthController } from './health/health.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/OnlineBusTicketPlatform'),
    AuthModule,
    UsersModule,
    DriversModule,
    TicketsModule,
  ],
  controllers: [HealthController]
})
export class AppModule {}
