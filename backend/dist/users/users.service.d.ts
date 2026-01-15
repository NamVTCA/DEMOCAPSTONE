import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(name: string, email: string, password: string, roles?: string[]): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listUsers(): Promise<(import("mongoose").FlattenMaps<UserDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateRoles(userId: string, roles: string[]): Promise<any>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        ok: boolean;
        message: string;
    } | {
        ok: boolean;
        message?: undefined;
    }>;
    updateProfile(userId: string, data: Partial<User>): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePasswordById(userId: string, newPassword: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
