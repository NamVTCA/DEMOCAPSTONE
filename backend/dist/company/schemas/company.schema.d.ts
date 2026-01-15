import { Document } from 'mongoose';
export type CompanyDocument = Company & Document;
export declare class Company {
    name: string;
    address?: string;
    phone?: string;
    drivers: string[];
    admins: string[];
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, Document<unknown, any, Company> & Company & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, Document<unknown, {}, import("mongoose").FlatRecord<Company>> & import("mongoose").FlatRecord<Company> & {
    _id: import("mongoose").Types.ObjectId;
}>;
