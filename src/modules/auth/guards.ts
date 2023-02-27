import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { difference, size } from 'lodash';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

const API_KEY = 'anykey';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['authorization'];
    return apiKey === API_KEY;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  hasMissingRoles(userRoles: string[], guardRoles: string[]): boolean {
    const missingRoles = difference(guardRoles, userRoles);
    if (Boolean(size(missingRoles))) {
      this.logger.log(
        `User has missing roles: ${JSON.stringify(missingRoles)}`,
      );
      return true;
    } else {
      return false;
    }
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const guardRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!guardRoles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userRoles: string[] = user.userRoles
      ? user.userRoles.map((role: any) => role.name)
      : [];

    return !this.hasMissingRoles(userRoles, guardRoles);
  }
}
