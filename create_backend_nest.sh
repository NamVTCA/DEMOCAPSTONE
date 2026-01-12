#!/usr/bin/env bash
set -e

# Script tạo backend NestJS minimal cho DEMOCAPSTONE
# Usage: ./create_backend_nest.sh

ROOT="$(pwd)"
BACKEND_DIR="$ROOT/backend"

echo "Create backend folder: $BACKEND_DIR"
mkdir -p "$BACKEND_DIR"

cat > "$BACKEND_DIR/package.json" <<'EOF'
{
  "name": "vexe-backend-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "ts-node -r tsconfig-paths/register src/main.ts",
    "start:dev": "ts-node-dev --respawn --transpile-only --ignore-watch node_modules src/main.ts"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "bcryptjs": "^2.4.3",
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.6"
  }
}
EOF

cat > "$BACKEND_DIR/tsconfig.json" <<'EOF'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": false,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2019",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"]
}
EOF

mkdir -p "$BACKEND_DIR/src"
mkdir -p "$BACKEND_DIR/src/auth"
mkdir -p "$BACKEND_DIR/src/users"
mkdir -p "$BACKEND_DIR/src/drive"

cat > "$BACKEND_DIR/src/main.ts" <<'EOF'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  // serve uploads folder (static)
  const uploadsPath = join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  console.log(`Backend (NestJS) running at http://localhost:${port}/api`);
  console.log(`Uploads served at http://localhost:${port}/uploads/...`);
}
bootstrap();
EOF

cat > "$BACKEND_DIR/src/app.module.ts" <<'EOF'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DriveModule } from './drive/drive.module';
import { DbService } from './db.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'replace_this_secret',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UsersModule,
    DriveModule,
  ],
  providers: [DbService],
})
export class AppModule {}
EOF

cat > "$BACKEND_DIR/src/db.service.ts" <<'EOF'
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
EOF

# Auth module & files
cat > "$BACKEND_DIR/src/auth/auth.module.ts" <<'EOF'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from '../db.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, DbService],
  controllers: [AuthController],
})
export class AuthModule {}
EOF

cat > "$BACKEND_DIR/src/auth/auth.service.ts" <<'EOF'
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../db.service';

@Injectable()
export class AuthService {
  constructor(private readonly db: DbService, private readonly jwtService: JwtService) {}

  async register(payload: { name?: string; email: string; password: string; phone?: string }) {
    const exist = this.db.findUserByEmail(payload.email);
    if (exist) throw new Error('Email already in use');
    const passwordHash = bcrypt.hashSync(payload.password, 8);
    const user = this.db.createUser({ name: payload.name, email: payload.email, phone: payload.phone, passwordHash });
    const { passwordHash: ph, ...userSafe } = user as any;
    const token = this.signToken(userSafe);
    return { user: userSafe, accessToken: token };
  }

  async login(email: string, password: string) {
    const user = this.db.findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    const { passwordHash, ...userSafe } = user as any;
    const token = this.signToken(userSafe);
    return { user: userSafe, accessToken: token };
  }

  signToken(user: any) {
    const payload = { id: user.id, email: user.email, roles: user.roles || [] };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET || 'replace_this_secret', expiresIn: '7d' });
  }
}
EOF

cat > "$BACKEND_DIR/src/auth/auth.controller.ts" <<'EOF'
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.auth.register(body);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message || 'Error' });
    }
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    try {
      const { email, password } = body;
      const result = await this.auth.login(email, password);
      return res.json(result);
    } catch (e) {
      return res.status(401).json({ message: e.message || 'Invalid credentials' });
    }
  }
}
EOF

cat > "$BACKEND_DIR/src/auth/jwt.guard.ts" <<'EOF'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth || typeof auth !== 'string' || !auth.startsWith('Bearer ')) return false;
    const token = auth.slice(7);
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'replace_this_secret' });
      req.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
EOF

# Users module
cat > "$BACKEND_DIR/src/users/users.module.ts" <<'EOF'
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbService } from '../db.service';

@Module({
  controllers: [UsersController],
  providers: [DbService],
})
export class UsersModule {}
EOF

cat > "$BACKEND_DIR/src/users/users.controller.ts" <<'EOF'
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { DbService } from '../db.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly db: DbService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    const user = this.db.findUserById(req.user.id);
    if (!user) return { message: 'User not found' };
    const { passwordHash, ...rest } = user as any;
    return rest;
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: any, @Body() body: any) {
    const updated = this.db.updateUser(req.user.id, {
      name: body.name,
      phone: body.phone,
      avatar: body.avatar,
    } as any);
    return updated || { message: 'Not found' };
  }
}
EOF

# Drive module & controller
cat > "$BACKEND_DIR/src/drive/drive.module.ts" <<'EOF'
import { Module } from '@nestjs/common';
import { DriveController } from './drive.controller';
import { DbService } from '../db.service';

@Module({
  controllers: [DriveController],
  providers: [DbService],
})
export class DriveModule {}
EOF

cat > "$BACKEND_DIR/src/drive/drive.controller.ts" <<'EOF'
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DbService } from '../db.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

@Controller('api/users/drive')
export class DriveController {
  constructor(private readonly db: DbService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  list(@Req() req: any) {
    const files = this.db.getFilesByUser(req.user.id);
    return { files };
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (req, file, cb) => {
          const ext = extname(file.originalname) || '';
          const name = uuidv4() + ext;
          cb(null, name);
        },
      }),
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    const rec = this.db.addFile({
      userId: req.user.id,
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filename: file.filename,
      url,
    } as any);
    return { file: rec };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Req() req: any) {
    const removed = this.db.removeFileByIdForUser(id, req.user.id);
    if (!removed) return { message: 'File not found' };
    // delete physical file if exists
    const filepath = path.join(UPLOAD_DIR, removed.filename);
    try {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    } catch (e) {
      console.warn('Failed to unlink file', e);
    }
    return { ok: true };
  }
}
EOF

# DB initial file
cat > "$BACKEND_DIR/db.json" <<'EOF'
{
  "users": [],
  "files": []
}
EOF

cat > "$BACKEND_DIR/.gitignore" <<'EOF'
node_modules/
uploads/
dist/
.env
EOF

cat > "$BACKEND_DIR/README.md" <<'EOF'
NestJS demo backend for DEMOCAPSTONE.

Install & run:
cd backend
npm install
npm run start:dev

Server will run at http://localhost:3000
API prefix: /api

Demo user created automatically if no users:
email: user@example.com
password: password123
EOF

chmod +x "$BACKEND_DIR/create_backend_nest.sh" || true

echo "Created backend scaffold under $BACKEND_DIR"
echo "Next steps:"
echo "1) cd backend && npm install"
echo "2) npm run start:dev"
echo ""
