import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(name: string, email: string, password: string, roles: string[] = ['user']) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const created = new this.userModel({ name, email, password: hash, roles });
    return created.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async listUsers() {
    return this.userModel.find().select('-password').lean().exec();
  }

  async updateRoles(userId: string, roles: string[]) {
    const u = await this.findById(userId);
    if (!u) return null;
    u.roles = roles;
    await u.save();
    const { password, ...rest } = (u as any).toObject();
    return rest;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.findById(userId);
    if (!user) return { ok: false, message: 'User not found' };
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return { ok: false, message: 'Current password incorrect' };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return { ok: true };
  }

  async updateProfile(userId: string, data: Partial<User>) {
    const user = await this.findById(userId);
    if (!user) return null;
    // Only allow certain fields
    const allowed = ['name', 'email', 'extras', 'phone', "avatar"];
    allowed.forEach((k) => {
      if ((data as any)[k] !== undefined) (user as any)[k] = (data as any)[k];
    });
    await user.save();
    return user;
  }

  async updatePasswordById(userId: string, newPassword: string) {
    const user = await this.findById(userId);
    if (!user) return null;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    return user.save();
  }
}
