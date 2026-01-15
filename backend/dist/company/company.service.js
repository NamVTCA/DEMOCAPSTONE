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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const company_schema_1 = require("./schemas/company.schema");
const trip_schema_1 = require("./schemas/trip.schema");
let CompanyService = class CompanyService {
    constructor(companyModel, tripModel) {
        this.companyModel = companyModel;
        this.tripModel = tripModel;
    }
    async createCompany(payload) {
        const doc = new this.companyModel(payload);
        return doc.save();
    }
    async findById(id) {
        return this.companyModel.findById(id).exec();
    }
    async listCompanies() {
        return this.companyModel.find().lean().exec();
    }
    async addDriverToCompany(companyId, driverId) {
        const c = await this.findById(companyId);
        if (!c)
            return null;
        if (!c.drivers.includes(driverId))
            c.drivers.push(driverId);
        await c.save();
        return c;
    }
    async createTrip(payload) {
        const doc = new this.tripModel(payload);
        return doc.save();
    }
    async listTripsByCompany(companyId) {
        return this.tripModel.find({ companyId }).lean().exec();
    }
    async assignDriverToTrip(tripId, driverId) {
        const t = await this.tripModel.findById(tripId).exec();
        if (!t)
            return null;
        if (!t.drivers.includes(driverId))
            t.drivers.push(driverId);
        await t.save();
        return t;
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __param(1, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CompanyService);
//# sourceMappingURL=company.service.js.map