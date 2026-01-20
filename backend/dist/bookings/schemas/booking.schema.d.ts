import { Document } from 'mongoose';
export type BookingDocument = Booking & Document;
export declare class Booking {
    tripId: string;
    userId?: string;
    selectedSeats: string[];
    contactName?: string;
    contactPhone?: string;
    contactEmail?: string;
    totalAmount?: number;
    status?: string;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking> & Booking & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>> & import("mongoose").FlatRecord<Booking> & {
    _id: import("mongoose").Types.ObjectId;
}>;
