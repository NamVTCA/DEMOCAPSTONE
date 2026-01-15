import { Document } from 'mongoose';
export type TripDocument = Trip & Document;
export declare class Trip {
    companyId: string;
    origin?: string;
    destination?: string;
    departureTime?: Date;
    drivers: string[];
    seats?: number;
}
export declare const TripSchema: import("mongoose").Schema<Trip, import("mongoose").Model<Trip, any, any, any, Document<unknown, any, Trip> & Trip & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Trip, Document<unknown, {}, import("mongoose").FlatRecord<Trip>> & import("mongoose").FlatRecord<Trip> & {
    _id: import("mongoose").Types.ObjectId;
}>;
