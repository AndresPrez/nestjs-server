import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [UsersModule],
  controllers: [AdminController],
})
export class AdminModule {}
