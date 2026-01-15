import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ required: true })
  companyId: string;

  @Prop()
  origin?: string;

  @Prop()
  destination?: string;

  @Prop()
  departureTime?: Date;

  @Prop({ type: [String], default: [] })
  drivers: string[];

  @Prop({ default: 0 })
  seats?: number;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
