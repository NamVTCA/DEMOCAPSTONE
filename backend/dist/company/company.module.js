"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const company_schema_1 = require("./schemas/company.schema");
const trip_schema_1 = require("./schemas/trip.schema");
const company_service_1 = require("./company.service");
const company_controller_1 = require("./company.controller");
const users_module_1 = require("../users/users.module");
let CompanyModule = class CompanyModule {
};
exports.CompanyModule = CompanyModule;
exports.CompanyModule = CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: company_schema_1.Company.name, schema: company_schema_1.CompanySchema },
                { name: trip_schema_1.Trip.name, schema: trip_schema_1.TripSchema },
            ]),
            users_module_1.UsersModule,
        ],
        providers: [company_service_1.CompanyService],
        controllers: [company_controller_1.CompanyController],
        exports: [company_service_1.CompanyService],
    })
], CompanyModule);
//# sourceMappingURL=company.module.js.map