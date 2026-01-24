import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    users(): Promise<(import("mongoose").FlattenMaps<import("../users/schemas/user.schema").UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    companies(): Promise<(import("mongoose").FlattenMaps<import("../company/schemas/company.schema").CompanyDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    dashboard(): Promise<{
        totalUsers: number;
        totalCompanies: number;
        totalTrips: number;
        totalBookings: number;
        totalRevenue: number;
        activeUsers: number;
        pendingBookings: number;
    }>;
    updateRoles(id: string, body: {
        roles: string[];
    }): Promise<any>;
}
