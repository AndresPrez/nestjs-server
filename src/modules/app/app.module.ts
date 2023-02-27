import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
