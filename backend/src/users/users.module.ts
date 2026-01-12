import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbService } from '../db.service';

@Module({
  controllers: [UsersController],
  providers: [DbService],
})
export class UsersModule {}
