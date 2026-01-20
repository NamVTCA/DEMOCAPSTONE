import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from '../company/schemas/trip.schema';

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

  async searchTrips(from?: string, to?: string, date?: string, limit = 50, page = 1) {
    const q: any = {};
    if (from) q.origin = new RegExp(from, 'i');
    if (to) q.destination = new RegExp(to, 'i');
    // date handling: if provided, try to match departure day (simplified)
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      q.departureTime = { $gte: d, $lt: next };
    }
    const total = await this.tripModel.countDocuments(q).exec();
    const trips = await this.tripModel.find(q).skip((page - 1) * limit).limit(limit).lean().exec();
    return { trips, total, page, limit };
  }

  async getById(id: string) {
    return this.tripModel.findById(id).lean().exec();
  }
}
