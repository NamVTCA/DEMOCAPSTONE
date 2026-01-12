import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const DB_FILE = path.join(process.cwd(), 'db.json');

interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  roles?: string[];
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

interface FileRecord {
  id: string;
  userId: string;
  name: string;
  mimeType?: string;
  size?: number;
  filename: string;
  url: string;
  uploadedAt: string;
}

@Injectable()
export class DbService {
  private data: { users: UserRecord[]; files: FileRecord[] } = { users: [], files: [] };

  constructor() {
    this.ensureDbFile();
    this.load();
    this.ensureDemoUser();
  }

  private ensureDbFile() {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], files: [] }, null, 2));
    }
  }

  private load() {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      this.data = JSON.parse(raw);
    } catch (e) {
      console.error('Error loading DB file:', e);
      this.data = { users: [], files: [] };
    }
  }

  private save() {
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2));
  }

  private ensureDemoUser() {
    if (!this.data.users || this.data.users.length === 0) {
      const pwd = 'password123';
      const hash = bcrypt.hashSync(pwd, 8);
      const demo: UserRecord = {
        id: uuidv4(),
        name: 'Demo User',
        email: 'user@example.com',
        phone: '0123456789',
        avatar: null,
        roles: ['user'],
        passwordHash: hash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.data.users = [demo];
      this.save();
      console.log(`Created demo user: email=user@example.com password=${pwd}`);
    }
  }

  // Users
  findUserByEmail(email: string) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string) {
    return this.data.users.find((u) => u.id === id);
  }

  createUser(payload: { name?: string; email: string; phone?: string; passwordHash: string }) {
    const user = {
      id: uuidv4(),
      name: payload.name || 'User',
      email: payload.email,
      phone: payload.phone || '',
      avatar: null,
      roles: ['user'],
      passwordHash: payload.passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUser(id: string, patch: Partial<Omit<UserRecord, 'id' | 'passwordHash'>>) {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    this.data.users[idx] = { ...this.data.users[idx], ...patch, updatedAt: new Date().toISOString() };
    this.save();
    const { passwordHash, ...rest } = this.data.users[idx];
    return rest;
  }

  // Files
  getFilesByUser(userId: string) {
    return this.data.files.filter((f) => f.userId === userId);
  }

  addFile(record: Omit<FileRecord, 'id' | 'uploadedAt'>) {
    const r = {
      id: uuidv4(),
      ...record,
      uploadedAt: new Date().toISOString(),
    };
    this.data.files.push(r);
    this.save();
    return r;
  }

  removeFileByIdForUser(fileId: string, userId: string) {
    const idx = this.data.files.findIndex((f) => f.id === fileId && f.userId === userId);
    if (idx === -1) return null;
    const removed = this.data.files.splice(idx, 1)[0];
    this.save();
    return removed;
  }
}
