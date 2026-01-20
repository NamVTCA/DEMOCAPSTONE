import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
export declare class BookingsService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    create(payload: Partial<Booking>): Promise<import("mongoose").Document<unknown, {}, BookingDocument> & Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    hold(payload: Partial<Booking>): Promise<import("mongoose").Document<unknown, {}, BookingDocument> & Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    listByUser(userId: string): Promise<(import("mongoose").FlattenMaps<BookingDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    cancel(bookingId: string): Promise<import("mongoose").Document<unknown, {}, BookingDocument> & Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    mockConfirmPayment(bookingId: string): Promise<import("mongoose").Document<unknown, {}, BookingDocument> & Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").FlattenMaps<BookingDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
