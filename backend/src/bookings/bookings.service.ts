import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(payload: Partial<Booking>) {
    const doc = new this.bookingModel(payload);
    return doc.save();
  }

  async hold(payload: Partial<Booking>) {
    // create booking with status 'held'
    const doc = new this.bookingModel({ ...payload, status: 'held' });
    return doc.save();
  }

  async listByUser(userId: string) {
    return this.bookingModel.find({ userId }).lean().exec();
  }

  async cancel(bookingId: string) {
    const b = await this.bookingModel.findById(bookingId).exec();
    if (!b) return null;
    b.status = 'cancelled';
    await b.save();
    return b;
  }

  async mockConfirmPayment(bookingId: string) {
    const b = await this.bookingModel.findById(bookingId).exec();
    if (!b) return null;
    b.status = 'paid';
    await b.save();
    return b;
  }

  async findById(id: string) {
    return this.bookingModel.findById(id).lean().exec();
  }
}
