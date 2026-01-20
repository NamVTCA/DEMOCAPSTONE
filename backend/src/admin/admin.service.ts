// backend/src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { BookingsService } from '../bookings/bookings.service';
import { TripsService } from '../trips/trips.service';

@Injectable()
export class AdminService {
  constructor(
    private users: UsersService,
    private company: CompanyService,
    private bookings: BookingsService,
    private trips: TripsService,
  ) {}

  async listUsers() {
    return this.users.listUsers();
  }

  async listCompanies() {
    return this.company.listCompanies();
  }

  // NEW: trả SystemStats
  async getDashboardStats() {
    // Users
    const users = await this.users.listUsers();
    const totalUsers = Array.isArray(users) ? users.length : 0;

    // Companies
    const companies = await this.company.listCompanies();
    const totalCompanies = Array.isArray(companies) ? companies.length : 0;

    // Trips: sử dụng TripsService.searchTrips để lấy total
    const tripsRes = await this.trips.searchTrips(undefined, undefined, undefined, 1, 1);
    const totalTrips = tripsRes?.total ?? 0;

    // Bookings & revenue
    const totalBookings = await this.bookings.countAll();
    const pendingBookings = await this.bookings.countPending();
    const totalRevenue = await this.bookings.sumRevenue();

    // activeUsers: dùng createdAt (timestamps) - tính users tạo trong 30 ngày gần nhất
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = (users || []).filter((u: any) => {
      if (!u?.createdAt) return false;
      return new Date(u.createdAt) >= thirtyDaysAgo;
    }).length;

    const stats = {
      totalUsers,
      totalCompanies,
      totalTrips,
      totalBookings,
      totalRevenue,
      activeUsers,
      pendingBookings,
    };

    return stats;
  }

  async setUserRoles(userId: string, roles: string[]) {
    return this.users.updateRoles(userId, roles);
  }
}
