import { CompanyService } from './company.service';
export declare class CompanyController {
    private cs;
    constructor(cs: CompanyService);
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/company.schema").CompanyDocument> & import("./schemas/company.schema").Company & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    list(): Promise<(import("mongoose").FlattenMaps<import("./schemas/company.schema").CompanyDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addDriver(id: string, body: {
        driverId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/company.schema").CompanyDocument> & import("./schemas/company.schema").Company & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTrip(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/trip.schema").TripDocument> & import("./schemas/trip.schema").Trip & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listTrips(id: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/trip.schema").TripDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    assignDriver(tripId: string, body: {
        driverId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/trip.schema").TripDocument> & import("./schemas/trip.schema").Trip & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
