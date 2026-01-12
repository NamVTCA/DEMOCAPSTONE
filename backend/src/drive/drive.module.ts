import { Module } from '@nestjs/common';
import { DriveController } from './drive.controller';
import { DbService } from '../db.service';

@Module({
  controllers: [DriveController],
  providers: [DbService],
})
export class DriveModule {}
