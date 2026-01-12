import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
export declare class TicketsService {
    private ticketModel;
    constructor(ticketModel: Model<TicketDocument>);
    findByTicketId(ticketId: string): Promise<import("mongoose").Document<unknown, {}, TicketDocument> & Ticket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTicket(payload: Partial<Ticket>): Promise<import("mongoose").Document<unknown, {}, TicketDocument> & Ticket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    confirmTicket(ticketId: string): Promise<import("mongoose").Document<unknown, {}, TicketDocument> & Ticket & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
