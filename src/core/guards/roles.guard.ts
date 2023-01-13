import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AsyncContext } from '../modules/async-context/async-context';
import { RolesType } from '../interfaces/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ForbiddenException } from '../exceptions/build-in';
import { ErrorMessagesConstants } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RolesType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || !roles.length) return true;

    return this.matchRoles(roles, this.asyncContext.get('user')?.roleName);
  }

  private matchRoles(requireRoles: RolesType[], userRole: RolesType): boolean {
    if (requireRoles.includes(userRole)) return true;
    throw new ForbiddenException(
      ErrorMessagesConstants.Forbidden,
      'not enough rights',
    );
  }
}
