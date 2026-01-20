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

    async countAll(): Promise<number> {
    return this.bookingModel.countDocuments().exec();
  }

  // Đếm booking đang ở trạng thái held (pending)
  async countPending(): Promise<number> {
    return this.bookingModel.countDocuments({ status: 'held' }).exec();
  }

  // Tổng doanh thu: sum totalAmount của booking có status paid hoặc confirmed
  async sumRevenue(): Promise<number> {
    const res = await this.bookingModel.aggregate([
      { $match: { status: { $in: ['paid', 'confirmed'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]).exec();
    return (res[0] && res[0].total) ? res[0].total : 0;
  }
}


