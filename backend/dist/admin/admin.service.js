"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const company_service_1 = require("../company/company.service");
const bookings_service_1 = require("../bookings/bookings.service");
const trips_service_1 = require("../trips/trips.service");
let AdminService = class AdminService {
    constructor(users, company, bookings, trips) {
        this.users = users;
        this.company = company;
        this.bookings = bookings;
        this.trips = trips;
    }
    async listUsers() {
        return this.users.listUsers();
    }
    async listCompanies() {
        return this.company.listCompanies();
    }
    async getDashboardStats() {
        const users = await this.users.listUsers();
        const totalUsers = Array.isArray(users) ? users.length : 0;
        const companies = await this.company.listCompanies();
        const totalCompanies = Array.isArray(companies) ? companies.length : 0;
        const tripsRes = await this.trips.searchTrips(undefined, undefined, undefined, 1, 1);
        const totalTrips = tripsRes?.total ?? 0;
        const totalBookings = await this.bookings.countAll();
        const pendingBookings = await this.bookings.countPending();
        const totalRevenue = await this.bookings.sumRevenue();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = (users || []).filter((u) => {
            if (!u?.createdAt)
                return false;
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
    async setUserRoles(userId, roles) {
        return this.users.updateRoles(userId, roles);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        company_service_1.CompanyService,
        bookings_service_1.BookingsService,
        trips_service_1.TripsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map