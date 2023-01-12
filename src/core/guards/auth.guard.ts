import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException } from '../exceptions/build-in';
import {
  InternalConfigurationConstants,
  ErrorMessagesConstants,
} from '../constants';
import { IS_PUBLIC_KEY } from '../decorators/public-controller.decorator';
import { AsyncContext } from '../modules/async-context/async-context';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getClass(),
    );

    if (isPublic) return true;

    try {
      const authHeader = request.headers.authorization;
      const [tokenType, token] = authHeader?.split(' ') || [];

      if (tokenType != InternalConfigurationConstants.TokenType || !token)
        throw new UnauthorizedException(
          ErrorMessagesConstants.Unauthorized,
          'Token not passed',
        );

      const payload = await this.jwtService.signAsync(token);
      this.asyncContext.set('user', payload);

      return true;
    } catch (exception) {
      if (exception instanceof UnauthorizedException) throw exception;

      throw new UnauthorizedException(
        ErrorMessagesConstants.Unauthorized,
        'Token verification failed',
      );
    }
  }
}
