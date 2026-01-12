import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { TicketsService } from './tickets/tickets.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const users = app.get(UsersService);
  const tickets = app.get(TicketsService);

  // create driver if not exists
  const driverEmail = 'driver@example.com';
  const existing = await users.findByEmail(driverEmail);
  if (!existing) {
    await users.createUser('Tài xế 1', driverEmail, 'password123', ['driver']);
    console.log('Driver created: driver@example.com / password123');
  } else {
    console.log('Driver already exists');
  }

  // create sample tickets
  const sample = [
    { ticketId: 'TCK-0001', bookingId: 'BKG-1', passengerName: 'Nguyễn A', seat: '1A', tripId: 'TRIP-1' },
    { ticketId: 'TCK-0002', bookingId: 'BKG-2', passengerName: 'Trần B', seat: '2B', tripId: 'TRIP-1' },
  ];

  for (const s of sample) {
    const t = await tickets.findByTicketId(s.ticketId);
    if (!t) {
      await tickets.createTicket(s);
      console.log('Created ticket', s.ticketId);
    } else {
      console.log('Ticket exists', s.ticketId);
    }
  }

  await app.close();
  process.exit(0);
}

bootstrap();
