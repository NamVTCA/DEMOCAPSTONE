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
