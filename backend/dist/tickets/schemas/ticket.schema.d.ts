import { Document } from 'mongoose';
export type TicketDocument = Ticket & Document;
export declare class Ticket {
    ticketId: string;
    bookingId?: string;
    passengerName?: string;
    seat?: string;
    tripId?: string;
    status?: string;
    extras?: any;
}
export declare const TicketSchema: import("mongoose").Schema<Ticket, import("mongoose").Model<Ticket, any, any, any, Document<unknown, any, Ticket> & Ticket & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ticket, Document<unknown, {}, import("mongoose").FlatRecord<Ticket>> & import("mongoose").FlatRecord<Ticket> & {
    _id: import("mongoose").Types.ObjectId;
}>;
