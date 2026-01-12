import { TicketsService } from '../tickets/tickets.service';
export declare class DriversService {
    private ticketsService;
    constructor(ticketsService: TicketsService);
    validateTicket(ticketId: string): Promise<{
        ok: boolean;
        message: string;
        ticket?: undefined;
    } | {
        ok: boolean;
        ticket: {
            id: string;
            bookingId: string;
            passengerName: string;
            seat: string;
            tripId: string;
            status: string;
            extras: any;
        };
        message?: undefined;
    }>;
    confirmTicket(ticketId: string): Promise<{
        ok: boolean;
        message: string;
        ticket?: undefined;
    } | {
        ok: boolean;
        message: string;
        ticket: {
            id: string;
            status: string;
        };
    }>;
}
