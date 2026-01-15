import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
export declare class AdminService {
    private users;
    private company;
    constructor(users: UsersService, company: CompanyService);
    listUsers(): Promise<(import("mongoose").FlattenMaps<import("../users/schemas/user.schema").UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    listCompanies(): Promise<(import("mongoose").FlattenMaps<import("../company/schemas/company.schema").CompanyDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    setUserRoles(userId: string, roles: string[]): Promise<any>;
}
