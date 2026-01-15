"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const tickets_service_1 = require("./tickets/tickets.service");
const company_service_1 = require("./company/company.service");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const users = app.get(users_service_1.UsersService);
        const tickets = app.get(tickets_service_1.TicketsService);
        const companyService = app.get(company_service_1.CompanyService);
        const driverEmail = 'driver@example.com';
        const existingDriver = await users.findByEmail(driverEmail);
        if (!existingDriver) {
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
        const adminEmail = 'admin@example.com';
        const existingAdmin = await users.findByEmail(adminEmail);
        if (!existingAdmin) {
            await users.createUser('System Admin', adminEmail, 'admin123', ['system-admin']);
            console.log('System admin created: admin@example.com / admin123');
        }
        else {
            console.log('System admin exists');
        }
        const companyName = 'DemoTrans';
        let company = (await companyService.listCompanies()).find((c) => c.name === companyName);
        if (!company) {
            company = await companyService.createCompany({ name: companyName, phone: '0123456789' });
            console.log('Company created', companyName);
        }
        else {
            console.log('Company exists', companyName);
        }
        const companyAdminEmail = 'companyadmin@example.com';
        const existingCompanyAdmin = await users.findByEmail(companyAdminEmail);
        if (!existingCompanyAdmin) {
            const u = await users.createUser('Company Admin', companyAdminEmail, 'company123', ['company-admin']);
            try {
                if (typeof companyService.addAdminToCompany === 'function') {
                    await companyService.addAdminToCompany(company._id.toString(), u._id.toString());
                }
                else if (typeof companyService.addDriverToCompany === 'function') {
                    await companyService.addDriverToCompany(company._id.toString(), u._id.toString());
                }
                else {
                    const c = await companyService.findById(company._id);
                    if (c) {
                        c.admins = c.admins || [];
                        if (!c.admins.includes(u._id.toString())) {
                            c.admins.push(u._id.toString());
                            await c.save();
                        }
                    }
                }
                console.log('Company admin created and added to company:', companyAdminEmail);
            }
            catch (e) {
                console.warn('Failed to add company admin to company automatically:', e);
            }
        }
        else {
            console.log('Company admin exists');
        }
        console.log('Seeding completed.');
    }
    catch (err) {
        console.error('Seed error:', err);
    }
    finally {
        await app.close();
        process.exit(0);
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map