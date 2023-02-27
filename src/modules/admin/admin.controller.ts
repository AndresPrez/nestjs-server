import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { BasicAuthGuard, RolesGuard } from '@modules/auth/guards';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { UserService } from '@modules/user/user.service';
import { Roles } from '@modules/auth/auth.decorators';
import { RolesOnUsers, User } from '@prisma/client';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(private userService: UserService) { }

  @ApiSecurity('basic')
  @Roles('ADMIN')
  @UseGuards(BasicAuthGuard, RolesGuard)
  @Get('users')
  async getSecureHello(@Request() req: Express.Request): Promise<Omit<User, "password"> & { roles: RolesOnUsers[] }> {
    const user: Express.User = req.user;
    const { id, username, roles } =
      await this.userService.findUnique({ username: user.username });

    return { id, username, roles };
  }
}
