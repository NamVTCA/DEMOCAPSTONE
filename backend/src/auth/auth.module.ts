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
