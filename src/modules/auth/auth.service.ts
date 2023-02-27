import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUnique({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user && isPasswordCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Express.User) {
    const loggedUser = { id: user.id, username: user.username };
    this.logger.log(`User '${loggedUser.username}' successfully logged in.`);
    return {
      access_token: this.jwtService.sign(loggedUser),
    };
  }
}
