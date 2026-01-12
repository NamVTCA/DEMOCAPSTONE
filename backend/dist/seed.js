"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const tickets_service_1 = require("./tickets/tickets.service");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const users = app.get(users_service_1.UsersService);
    const tickets = app.get(tickets_service_1.TicketsService);
    const driverEmail = 'driver@example.com';
    const existing = await users.findByEmail(driverEmail);
    if (!existing) {
        await users.createUser('Tài xế 1', driverEmail, 'password123', ['driver']);
        console.log('Driver created: driver@example.com / password123');
    }
    else {
        console.log('Driver already exists');
    }
    const sample = [
        { ticketId: 'TCK-0001', bookingId: 'BKG-1', passengerName: 'Nguyễn A', seat: '1A', tripId: 'TRIP-1' },
        { ticketId: 'TCK-0002', bookingId: 'BKG-2', passengerName: 'Trần B', seat: '2B', tripId: 'TRIP-1' },
    ];
    for (const s of sample) {
        const t = await tickets.findByTicketId(s.ticketId);
        if (!t) {
            await tickets.createTicket(s);
            console.log('Created ticket', s.ticketId);
        }
        else {
            console.log('Ticket exists', s.ticketId);
        }
    }
    await app.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=seed.js.map