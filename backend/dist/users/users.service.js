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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(name, email, password, roles = ['user']) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const created = new this.userModel({ name, email, password: hash, roles });
        return created.save();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async listUsers() {
        return this.userModel.find().select('-password').lean().exec();
    }
    async updateRoles(userId, roles) {
        const u = await this.findById(userId);
        if (!u)
            return null;
        u.roles = roles;
        await u.save();
        const { password, ...rest } = u.toObject();
        return rest;
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.findById(userId);
        if (!user)
            return { ok: false, message: 'User not found' };
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match)
            return { ok: false, message: 'Current password incorrect' };
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        return { ok: true };
    }
    async updateProfile(userId, data) {
        const user = await this.findById(userId);
        if (!user)
            return null;
        const allowed = ['name', 'email', 'extras', 'phone', "avatar"];
        allowed.forEach((k) => {
            if (data[k] !== undefined)
                user[k] = data[k];
        });
        await user.save();
        return user;
    }
    async updatePasswordById(userId, newPassword) {
        const user = await this.findById(userId);
        if (!user)
            return null;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        return user.save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map