import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    me(req: Request): Promise<any>;
    updateMe(req: Request, body: any): Promise<any>;
    listAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateRoles(id: string, body: {
        roles: string[];
    }): Promise<any>;
}
