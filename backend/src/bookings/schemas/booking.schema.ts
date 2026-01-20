import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  tripId: string;

  @Prop()
  userId?: string;

  @Prop({ type: [String], default: [] })
  selectedSeats: string[];

  @Prop()
  contactName?: string;

  @Prop()
  contactPhone?: string;

  @Prop()
  contactEmail?: string;

  @Prop({ default: 0 })
  totalAmount?: number;

  @Prop({ default: 'held' })
  status?: string; // held, confirmed, paid, cancelled, refunded
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
