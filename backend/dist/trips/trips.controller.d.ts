import { TripsService } from './trips.service';
export declare class TripsController {
    private tripsService;
    constructor(tripsService: TripsService);
    search(q: {
        from?: string;
        to?: string;
        date?: string;
        page?: string;
        limit?: string;
    }): Promise<{
        trips: (import("mongoose").FlattenMaps<import("../company/schemas/trip.schema").TripDocument> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    get(id: string): Promise<import("mongoose").FlattenMaps<import("../company/schemas/trip.schema").TripDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
