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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../common/roles.decorator");
const roles_guard_1 = require("../common/roles.guard");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        const uploadPath = (0, path_1.join)(__dirname, '..', '..', 'uploads');
        if (!fs.existsSync(uploadPath))
            fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const rand = Date.now();
        const name = `${rand}-${file.originalname.replace(/\s+/g, '-')}`;
        cb(null, name);
    }
});
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async me(req) {
        const payload = req.user;
        const id = payload.userId || payload.sub;
        const u = await this.usersService.findById(id);
        if (!u)
            return null;
        const { password, ...rest } = u.toObject();
        return rest;
    }
    async updateMe(req, body) {
        const payload = req.user;
        const id = payload.userId || payload.sub;
        const updated = await this.usersService.updateProfile(id, body);
        const { password, ...rest } = updated.toObject();
        return rest;
    }
    async profile(req) {
        const payload = req.user;
        const id = payload.userId || payload.sub;
        const u = await this.usersService.findById(id);
        if (!u)
            return null;
        const { password, ...rest } = u.toObject();
        return rest;
    }
    async updateProfile(req, body) {
        const payload = req.user;
        const id = payload.userId || payload.sub;
        const updated = await this.usersService.updateProfile(id, body);
        const { password, ...rest } = updated.toObject();
        return rest;
    }
    async uploadAvatar(req, file) {
        if (!file) {
            throw new common_1.HttpException('No file uploaded', common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = req.user;
        const id = payload.userId || payload.sub;
        const base = (process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`);
        const avatarUrl = `${base}/uploads/${file.filename}`;
        const updated = await this.usersService.updateProfile(id, { avatar: avatarUrl });
        return { avatarUrl };
    }
    async changePassword(req, body) {
        const payload = req.user;
        const id = payload.userId || payload.sub;
        if (!body?.currentPassword || !body?.newPassword) {
            return { ok: false, message: 'currentPassword and newPassword are required' };
        }
        return this.usersService.changePassword(id, body.currentPassword, body.newPassword);
    }
    async listAll() {
        return this.usersService.listUsers();
    }
    async updateRoles(id, body) {
        return this.usersService.updateRoles(id, body.roles);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "profile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', { storage })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('system-admin', 'company-admin'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('system-admin'),
    (0, common_1.Put)(':id/roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRoles", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map