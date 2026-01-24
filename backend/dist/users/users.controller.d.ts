import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    me(req: any): Promise<any>;
    updateMe(req: any, body: any): Promise<any>;
    profile(req: any): Promise<any>;
    updateProfile(req: any, body: any): Promise<any>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
        avatarUrl: string;
    }>;
    changePassword(req: any, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        ok: boolean;
        message?: undefined;
    } | {
        ok: boolean;
        message: string;
    }>;
    listAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateRoles(id: string, body: {
        roles: string[];
    }): Promise<any>;
}
