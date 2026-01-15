// backend/src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { TicketsService } from './tickets/tickets.service';
import { CompanyService } from './company/company.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const users = app.get(UsersService);
    const tickets = app.get(TicketsService);
    const companyService = app.get(CompanyService);

    // 1) Create driver account
    const driverEmail = 'driver@example.com';
    const existingDriver = await users.findByEmail(driverEmail);
    if (!existingDriver) {
      await users.createUser('Tài xế 1', driverEmail, 'password123', ['driver']);
      console.log('Driver created: driver@example.com / password123');
    } else {
      console.log('Driver already exists');
    }

    // 2) Create sample tickets
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

    // 3) Create system admin
    const adminEmail = 'admin@example.com';
    const existingAdmin = await users.findByEmail(adminEmail);
    if (!existingAdmin) {
      await users.createUser('System Admin', adminEmail, 'admin123', ['system-admin']);
      console.log('System admin created: admin@example.com / admin123');
    } else {
      console.log('System admin exists');
    }

    // 4) Create company and company admin
    const companyName = 'DemoTrans';
    let company = (await companyService.listCompanies()).find((c: any) => c.name === companyName);

    if (!company) {
      company = await companyService.createCompany({ name: companyName, phone: '0123456789' });
      console.log('Company created', companyName);
    } else {
      console.log('Company exists', companyName);
    }

    const companyAdminEmail = 'companyadmin@example.com';
    const existingCompanyAdmin = await users.findByEmail(companyAdminEmail);
    if (!existingCompanyAdmin) {
      const u = await users.createUser('Company Admin', companyAdminEmail, 'company123', ['company-admin']);
      // Add user to company admins.
      // If you have a dedicated method like addAdminToCompany prefer that.
      // Here we reuse addDriverToCompany (as before) to push a user id into company's drivers array,
      // but ideally CompanyService should expose addAdminToCompany.
      try {
        // Prefer method if exists
        if (typeof (companyService as any).addAdminToCompany === 'function') {
          await (companyService as any).addAdminToCompany(company._id.toString(), u._id.toString());
        } else if (typeof (companyService as any).addDriverToCompany === 'function') {
          // fallback: add to drivers array or you can directly push to admins if available
          await (companyService as any).addDriverToCompany(company._id.toString(), u._id.toString());
        } else {
          // As last resort, modify company document directly
          const c = await companyService.findById(company._id);
          if (c) {
            (c as any).admins = (c as any).admins || [];
            if (!(c as any).admins.includes(u._id.toString())) {
              (c as any).admins.push(u._id.toString());
              await (c as any).save();
            }
          }
        }
        console.log('Company admin created and added to company:', companyAdminEmail);
      } catch (e) {
        console.warn('Failed to add company admin to company automatically:', e);
      }
    } else {
      console.log('Company admin exists');
    }

    console.log('Seeding completed.');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
