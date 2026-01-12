"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("../tickets/tickets.service");
let DriversService = class DriversService {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    async validateTicket(ticketId) {
        const ticket = await this.ticketsService.findByTicketId(ticketId);
        if (!ticket)
            return { ok: false, message: 'Không tìm thấy vé' };
        if (ticket.status !== 'unused')
            return { ok: false, message: 'Vé đã sử dụng hoặc không hợp lệ' };
        return { ok: true, ticket: {
                id: ticket.ticketId,
                bookingId: ticket.bookingId,
                passengerName: ticket.passengerName,
                seat: ticket.seat,
                tripId: ticket.tripId,
                status: ticket.status,
                extras: ticket.extras
            } };
    }
    async confirmTicket(ticketId) {
        const ticket = await this.ticketsService.findByTicketId(ticketId);
        if (!ticket)
            return { ok: false, message: 'Không tìm thấy vé' };
        if (ticket.status !== 'unused')
            return { ok: false, message: 'Vé không thể xác nhận' };
        const confirmed = await this.ticketsService.confirmTicket(ticketId);
        return { ok: true, message: 'Ticket confirmed', ticket: { id: confirmed.ticketId, status: confirmed.status } };
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map