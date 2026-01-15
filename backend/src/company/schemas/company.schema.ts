import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  address?: string;

  @Prop()
  phone?: string;

  // store user ids
  @Prop({ type: [String], default: [] })
  drivers: string[];

  @Prop({ type: [String], default: [] })
  admins: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
