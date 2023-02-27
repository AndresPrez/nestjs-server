import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';

describe('AuthService', () => {
  let authservice: AuthService;
  let userservice: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
    }).compile();

    authservice = module.get<AuthService>(AuthService);
    userservice = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authservice).toBeDefined();
    expect(userservice).toBeDefined();
  });
});
