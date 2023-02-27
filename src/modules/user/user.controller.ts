import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { BasicAuthGuard, JwtAuthGuard } from '@modules/auth/guards';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { UserService } from '@modules/user/user.service';
import { RolesOnUsers, User } from '@prisma/client';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UserService) { }

  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  @ApiSecurity('basic')
  @UseGuards(BasicAuthGuard)
  @Get('user')
  async getSecureHello(@Request() req: Express.Request): Promise<Omit<User, "password"> & { roles: RolesOnUsers[] }> {
    const user: Express.User = req.user;
    const { id, username, roles } =
      await this.userService.findUnique({ username: user.username });

    return { id, username, roles };
  }
}
