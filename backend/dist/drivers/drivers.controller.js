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
exports.DriversController = void 0;
const common_1 = require("@nestjs/common");
const drivers_service_1 = require("./drivers.service");
const validate_ticket_dto_1 = require("./dto/validate-ticket.dto");
const confirm_ticket_dto_1 = require("./dto/confirm-ticket.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../common/roles.decorator");
const roles_guard_1 = require("../common/roles.guard");
let DriversController = class DriversController {
    constructor(driversService) {
        this.driversService = driversService;
    }
    async validate(dto) {
        return this.driversService.validateTicket(dto.ticketId);
    }
    async confirm(dto) {
        return this.driversService.confirmTicket(dto.ticketId);
    }
};
exports.DriversController = DriversController;
__decorate([
    (0, common_1.Post)('validate'),
    (0, roles_decorator_1.Roles)('driver'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_ticket_dto_1.ValidateTicketDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)('confirm-ticket'),
    (0, roles_decorator_1.Roles)('driver'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_ticket_dto_1.ConfirmTicketDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "confirm", null);
exports.DriversController = DriversController = __decorate([
    (0, common_1.Controller)('drivers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], DriversController);
//# sourceMappingURL=drivers.controller.js.map