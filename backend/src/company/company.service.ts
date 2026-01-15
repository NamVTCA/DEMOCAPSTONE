import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Trip, TripDocument } from './schemas/trip.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
  ) {}

  async createCompany(payload: Partial<Company>) {
    const doc = new this.companyModel(payload);
    return doc.save();
  }

  async findById(id: string) {
    return this.companyModel.findById(id).exec();
  }

  async listCompanies() {
    return this.companyModel.find().lean().exec();
  }

  async addDriverToCompany(companyId: string, driverId: string) {
    const c = await this.findById(companyId);
    if (!c) return null;
    if (!c.drivers.includes(driverId)) c.drivers.push(driverId);
    await c.save();
    return c;
  }

  async createTrip(payload: Partial<Trip>) {
    const doc = new this.tripModel(payload);
    return doc.save();
  }

  async listTripsByCompany(companyId: string) {
    return this.tripModel.find({ companyId }).lean().exec();
  }

  async assignDriverToTrip(tripId: string, driverId: string) {
    const t = await this.tripModel.findById(tripId).exec();
    if (!t) return null;
    if (!t.drivers.includes(driverId)) t.drivers.push(driverId);
    await t.save();
    return t;
  }
}
