import { DriversService } from './drivers.service';
import { ValidateTicketDto } from './dto/validate-ticket.dto';
import { ConfirmTicketDto } from './dto/confirm-ticket.dto';
export declare class DriversController {
    private driversService;
    constructor(driversService: DriversService);
    validate(dto: ValidateTicketDto): Promise<{
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
    confirm(dto: ConfirmTicketDto): Promise<{
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
