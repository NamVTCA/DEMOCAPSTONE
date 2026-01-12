import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

  async findByTicketId(ticketId: string) {
    return this.ticketModel.findOne({ ticketId }).exec();
  }

  async createTicket(payload: Partial<Ticket>) {
    const doc = new this.ticketModel(payload);
    return doc.save();
  }

  async confirmTicket(ticketId: string) {
    const ticket = await this.findByTicketId(ticketId);
    if (!ticket) return null;
    ticket.status = 'used';
    await ticket.save();
    return ticket;
  }
}
