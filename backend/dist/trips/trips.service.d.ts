import { Model } from 'mongoose';
import { TripDocument } from '../company/schemas/trip.schema';
export declare class TripsService {
    private tripModel;
    constructor(tripModel: Model<TripDocument>);
    searchTrips(from?: string, to?: string, date?: string, limit?: number, page?: number): Promise<{
        trips: (import("mongoose").FlattenMaps<TripDocument> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getById(id: string): Promise<import("mongoose").FlattenMaps<TripDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
