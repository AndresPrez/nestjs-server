import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller'
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule { }
