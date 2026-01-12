import { Injectable } from '@nestjs/common';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class DriversService {
  constructor(private ticketsService: TicketsService) {}

  async validateTicket(ticketId: string) {
    const ticket = await this.ticketsService.findByTicketId(ticketId);
    if (!ticket) return { ok: false, message: 'Không tìm thấy vé' };
    if (ticket.status !== 'unused') return { ok: false, message: 'Vé đã sử dụng hoặc không hợp lệ' };
    return { ok: true, ticket: {
      id: ticket.ticketId,
      bookingId: ticket.bookingId,
      passengerName: ticket.passengerName,
      seat: ticket.seat,
      tripId: ticket.tripId,
      status: ticket.status,
      extras: ticket.extras
    }};
  }

  async confirmTicket(ticketId: string) {
    const ticket = await this.ticketsService.findByTicketId(ticketId);
    if (!ticket) return { ok: false, message: 'Không tìm thấy vé' };
    if (ticket.status !== 'unused') return { ok: false, message: 'Vé không thể xác nhận' };
    const confirmed = await this.ticketsService.confirmTicket(ticketId);
    return { ok: true, message: 'Ticket confirmed', ticket: { id: confirmed.ticketId, status: confirmed.status } };
  }
}
