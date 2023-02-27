import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { state } from 'src/state';

@Injectable()
export class AppService {
  getHello(): string {
    const startTime = moment().from(state.startTime, true);
    return `Server is operational since ${startTime} [${state.startTime}]`;
  }

  greetUser(user: { username: string }): string {
    return `Hello ${user.username}!`;
  }
}
