import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    me(req: Request): Promise<any>;
    updateMe(req: Request, body: any): Promise<any>;
    profile(req: Request): Promise<any>;
    updateProfile(req: Request, body: any): Promise<any>;
    uploadAvatar(req: Request, body: {
        avatar: string;
    }): Promise<any>;
    changePassword(req: Request, body: {
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
