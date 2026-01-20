import { BookingsService } from './bookings.service';
import { Request } from 'express';
export declare class BookingsController {
    private bs;
    constructor(bs: BookingsService);
    hold(body: any, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/booking.schema").BookingDocument> & import("./schemas/booking.schema").Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(body: any, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/booking.schema").BookingDocument> & import("./schemas/booking.schema").Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    userBookings(req: Request): Promise<(import("mongoose").FlattenMaps<import("./schemas/booking.schema").BookingDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    cancel(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/booking.schema").BookingDocument> & import("./schemas/booking.schema").Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    mockConfirm(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/booking.schema").BookingDocument> & import("./schemas/booking.schema").Booking & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
