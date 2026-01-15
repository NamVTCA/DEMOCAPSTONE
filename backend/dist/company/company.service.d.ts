import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Trip, TripDocument } from './schemas/trip.schema';
export declare class CompanyService {
    private companyModel;
    private tripModel;
    constructor(companyModel: Model<CompanyDocument>, tripModel: Model<TripDocument>);
    createCompany(payload: Partial<Company>): Promise<import("mongoose").Document<unknown, {}, CompanyDocument> & Company & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, CompanyDocument> & Company & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listCompanies(): Promise<(import("mongoose").FlattenMaps<CompanyDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addDriverToCompany(companyId: string, driverId: string): Promise<import("mongoose").Document<unknown, {}, CompanyDocument> & Company & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTrip(payload: Partial<Trip>): Promise<import("mongoose").Document<unknown, {}, TripDocument> & Trip & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listTripsByCompany(companyId: string): Promise<(import("mongoose").FlattenMaps<TripDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    assignDriverToTrip(tripId: string, driverId: string): Promise<import("mongoose").Document<unknown, {}, TripDocument> & Trip & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
