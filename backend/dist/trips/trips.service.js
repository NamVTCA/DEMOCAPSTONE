"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trip_schema_1 = require("../company/schemas/trip.schema");
let TripsService = class TripsService {
    constructor(tripModel) {
        this.tripModel = tripModel;
    }
    async searchTrips(from, to, date, limit = 50, page = 1) {
        const q = {};
        if (from)
            q.origin = new RegExp(from, 'i');
        if (to)
            q.destination = new RegExp(to, 'i');
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
    async getById(id) {
        return this.tripModel.findById(id).lean().exec();
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TripsService);
//# sourceMappingURL=trips.service.js.map