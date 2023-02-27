import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersModule } from 'src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {
  LocalAuthStrategy,
  BasicAuthStrategy,
  JwtAuthStrategy,
} from 'src/modules/auth/strategies';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalAuthStrategy,
    BasicAuthStrategy,
    JwtAuthStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
