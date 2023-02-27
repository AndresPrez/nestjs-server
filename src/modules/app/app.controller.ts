import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AppService } from '@modules/app/app.service';

@ApiTags('Server')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiSecurity('bearer')
  @Get('greet')
  @UseGuards(JwtAuthGuard)
  getSecureHello(@Request() req: Express.Request): string {
    const user: Express.User = req.user;
    return this.appService.greetUser({ username: user.username });
  }
}
