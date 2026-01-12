import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, unique: true })
  ticketId: string;

  @Prop()
  bookingId?: string;

  @Prop()
  passengerName?: string;

  @Prop()
  seat?: string;

  @Prop()
  tripId?: string;

  @Prop({ default: 'unused' })
  status?: string;

  @Prop({ type: Object, default: {} })
  extras?: any;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
