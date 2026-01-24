import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { BookingsService } from '../bookings/bookings.service';
import { TripsService } from '../trips/trips.service';
export declare class AdminService {
    private users;
    private company;
    private bookings;
    private trips;
    constructor(users: UsersService, company: CompanyService, bookings: BookingsService, trips: TripsService);
    listUsers(): Promise<(import("mongoose").FlattenMaps<import("../users/schemas/user.schema").UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    listCompanies(): Promise<(import("mongoose").FlattenMaps<import("../company/schemas/company.schema").CompanyDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalCompanies: number;
        totalTrips: number;
        totalBookings: number;
        totalRevenue: number;
        activeUsers: number;
        pendingBookings: number;
    }>;
    setUserRoles(userId: string, roles: string[]): Promise<any>;
}
