#!/usr/bin/env bash
set -euo pipefail

# Script tạo backend NestJS + MongoDB
ROOT_DIR="$(pwd)"
BACKEND_DIR="${ROOT_DIR}/backend"

if [ -d "${BACKEND_DIR}" ]; then
  echo "Error: ${BACKEND_DIR} already exists. Remove it or choose another location."
  exit 1
fi

mkdir -p "${BACKEND_DIR}"
cd "${BACKEND_DIR}"

echo "Creating backend scaffold in ${BACKEND_DIR} ..."

# package.json
cat > package.json <<'JSON'
{
  "name": "vexe-backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node dist/main.js",
    "start:dev": "nest start --watch",
    "build": "nest build",
    "seed": "ts-node -r tsconfig-paths/register src/seed.ts",
    "lint": "eslint . --ext .ts"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/mongoose": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "bcrypt": "^5.1.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "mongoose": "^7.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.5.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/bcrypt": "^5.0.0",
    "@types/node": "^18.0.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.0",
    "tsconfig-paths": "^4.2.0"
  }
}
JSON

# tsconfig.json
cat > tsconfig.json <<'TS'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
TS

# nest-cli.json
cat > nest-cli.json <<'NC'
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}
NC

# .env.example
cat > .env.example <<'ENV'
PORT=3000
MONGO_URI=mongodb://mongo:27017/vexe
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=3600s
ENV

# docker-compose.yml
cat > docker-compose.yml <<'DC'
version: '3.8'
services:
  mongo:
    image: mongo:6.0
    container_name: vexe-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
DC

# create src dirs
mkdir -p src/{auth,users,drivers,tickets,common}
mkdir -p src/users/schemas
mkdir -p src/tickets/schemas
mkdir -p src/auth/dto
mkdir -p src/drivers/dto

# main.ts
cat > src/main.ts <<'MAIN'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API is running on http://localhost:${port}`);
}
bootstrap();
MAIN

# app.module.ts
cat > src/app.module.ts <<'APP'
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { TicketsModule } from './tickets/tickets.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/vexe'),
    AuthModule,
    UsersModule,
    DriversModule,
    TicketsModule,
  ],
})
export class AppModule {}
APP

# seed.ts
cat > src/seed.ts <<'SEED'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { TicketsService } from './tickets/tickets.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const users = app.get(UsersService);
  const tickets = app.get(TicketsService);

  // create driver if not exists
  const driverEmail = 'driver@example.com';
  const existing = await users.findByEmail(driverEmail);
  if (!existing) {
    await users.createUser('Tài xế 1', driverEmail, 'password123', ['driver']);
    console.log('Driver created: driver@example.com / password123');
  } else {
    console.log('Driver already exists');
  }

  // create sample tickets
  const sample = [
    { ticketId: 'TCK-0001', bookingId: 'BKG-1', passengerName: 'Nguyễn A', seat: '1A', tripId: 'TRIP-1' },
    { ticketId: 'TCK-0002', bookingId: 'BKG-2', passengerName: 'Trần B', seat: '2B', tripId: 'TRIP-1' },
  ];

  for (const s of sample) {
    const t = await tickets.findByTicketId(s.ticketId);
    if (!t) {
      await tickets.createTicket(s);
      console.log('Created ticket', s.ticketId);
    } else {
      console.log('Ticket exists', s.ticketId);
    }
  }

  await app.close();
  process.exit(0);
}

bootstrap();
SEED

# common/roles.decorator.ts
cat > src/common/roles.decorator.ts <<'RD'
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
RD

# common/roles.guard.ts
cat > src/common/roles.guard.ts <<'RG'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.roles) return false;
    return required.some((r) => user.roles.includes(r));
  }
}
RG

#
# USERS
#
cat > src/users/schemas/user.schema.ts <<'US'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
US

cat > src/users/users.module.ts <<'UM'
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
UM

cat > src/users/users.service.ts <<'USV'
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
}
USV

#
# AUTH
#
cat > src/auth/dto/register.dto.ts <<'RD'
import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['user', 'driver'])
  role?: string;
}
RD

cat > src/auth/dto/login.dto.ts <<'LD'
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
LD

cat > src/auth/auth.service.ts <<'AS'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id, email: user.email, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string, role: string = 'user') {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    const user = await this.usersService.createUser(name, email, password, [role]);
    return user;
  }
}
AS

cat > src/auth/jwt.strategy.ts <<'JS'
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'replace_with_secret',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
JS

cat > src/auth/jwt-auth.guard.ts <<'JG'
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
JG

cat > src/auth/auth.controller.ts <<'AC'
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto.name, dto.email, dto.password, dto.role || 'user');
    const { password, ...rest } = user.toObject();
    return rest;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const validated = await this.authService.validateUser(dto.email, dto.password);
    if (!validated) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(validated);
  }
}
AC

cat > src/auth/auth.module.ts <<'AM'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'replace_with_secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
AM

#
# TICKETS
#
cat > src/tickets/schemas/ticket.schema.ts <<'TS'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, unique: true })
  ticketId: string;

  @Prop()
  bookingId?: string;

  @Prop()
  passengerName?: string;

  @Prop()
  seat?: string;

  @Prop()
  tripId?: string;

  @Prop({ default: 'unused' })
  status?: string;

  @Prop({ type: Object, default: {} })
  extras?: any;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
TS

cat > src/tickets/tickets.module.ts <<'TM'
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { TicketsService } from './tickets.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
TM

cat > src/tickets/tickets.service.ts <<'TSV'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

  async findByTicketId(ticketId: string) {
    return this.ticketModel.findOne({ ticketId }).exec();
  }

  async createTicket(payload: Partial<Ticket>) {
    const doc = new this.ticketModel(payload);
    return doc.save();
  }

  async confirmTicket(ticketId: string) {
    const ticket = await this.findByTicketId(ticketId);
    if (!ticket) return null;
    ticket.status = 'used';
    await ticket.save();
    return ticket;
  }
}
TSV

#
# DRIVERS
#
cat > src/drivers/dto/validate-ticket.dto.ts <<'VD'
import { IsString } from 'class-validator';

export class ValidateTicketDto {
  @IsString()
  ticketId: string;
}
VD

cat > src/drivers/dto/confirm-ticket.dto.ts <<'CD'
import { IsString } from 'class-validator';

export class ConfirmTicketDto {
  @IsString()
  ticketId: string;
}
CD

cat > src/drivers/drivers.service.ts <<'DS'
import { Injectable } from '@nestjs/common';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class DriversService {
  constructor(private ticketsService: TicketsService) {}

  async validateTicket(ticketId: string) {
    const ticket = await this.ticketsService.findByTicketId(ticketId);
    if (!ticket) return { ok: false, message: 'Không tìm thấy vé' };
    if (ticket.status !== 'unused') return { ok: false, message: 'Vé đã sử dụng hoặc không hợp lệ' };
    return { ok: true, ticket: {
      id: ticket.ticketId,
      bookingId: ticket.bookingId,
      passengerName: ticket.passengerName,
      seat: ticket.seat,
      tripId: ticket.tripId,
      status: ticket.status,
      extras: ticket.extras
    }};
  }

  async confirmTicket(ticketId: string) {
    const ticket = await this.ticketsService.findByTicketId(ticketId);
    if (!ticket) return { ok: false, message: 'Không tìm thấy vé' };
    if (ticket.status !== 'unused') return { ok: false, message: 'Vé không thể xác nhận' };
    const confirmed = await this.ticketsService.confirmTicket(ticketId);
    return { ok: true, message: 'Ticket confirmed', ticket: { id: confirmed.ticketId, status: confirmed.status } };
  }
}
DS

cat > src/drivers/drivers.controller.ts <<'DC'
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ValidateTicketDto } from './dto/validate-ticket.dto';
import { ConfirmTicketDto } from './dto/confirm-ticket.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@Controller('drivers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Post('validate')
  @Roles('driver')
  async validate(@Body() dto: ValidateTicketDto) {
    return this.driversService.validateTicket(dto.ticketId);
  }

  @Post('confirm-ticket')
  @Roles('driver')
  async confirm(@Body() dto: ConfirmTicketDto) {
    return this.driversService.confirmTicket(dto.ticketId);
  }
}
DC

cat > src/drivers/drivers.module.ts <<'DM'
import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TicketsModule } from '../tickets/tickets.module';
import { RolesGuard } from '../common/roles.guard';

@Module({
  imports: [TicketsModule],
  providers: [DriversService, RolesGuard],
  controllers: [DriversController],
})
export class DriversModule {}
DM

#
# DONE creating files
#

echo "All files created. Installing npm dependencies (this may take a while)..."

# install deps
npm install

echo "Installation finished."

cat <<'USAGE'

Backend scaffold created in ./backend

Next steps (from project root):
1. Start Mongo (docker compose):
   cd backend
   docker compose up -d

   or run a local Mongo and update MONGO_URI in .env

2. Create .env in backend/ (or copy .env.example)
   cp .env.example .env
   # Edit .env to set a strong JWT_SECRET if needed

3. Run dev server:
   npm run start:dev

4. Seed sample data (driver + tickets):
   npm run seed

Example:
  cd backend
  cp .env.example .env
  docker compose up -d
  npm run start:dev
  # in another shell:
  npm run seed

Endpoints:
- POST /auth/register  { name, email, password, role? }
- POST /auth/login     { email, password } -> { accessToken }
- POST /drivers/validate  (Bearer token of driver) { ticketId }
- POST /drivers/confirm-ticket (Bearer token of driver) { ticketId }

If you want, I can:
- Push this backend into your repository under folder `backend/` (create a branch & PR),
- Or adjust endpoints/schemas to match FE exactly (names/fields/response shapes).

USAGE

echo "Done."
