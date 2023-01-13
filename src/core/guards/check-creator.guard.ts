import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectConnection } from '@nestjs/sequelize';
import { Request } from 'express';
import { Model, Sequelize } from 'sequelize-typescript';
import { ErrorMessagesConstants } from '../constants';
import { AsyncContext } from '../modules/async-context/async-context';
import { MODEL_KEY } from '../decorators';
import { ForbiddenException, NotFoundException } from '../exceptions/build-in';

@Injectable()
export class CheckCreatorGuard implements CanActivate {
  constructor(
    @InjectConnection() private readonly connection: Sequelize,
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const EntityClass = this.reflector.get<new () => Model>(
      MODEL_KEY,
      context.getHandler,
    );

    const entityId = Number(request.params.id);

    const model = await this.connection
      .getRepository(EntityClass)
      .findByPk(entityId, {
        rejectOnEmpty: new NotFoundException(
          ErrorMessagesConstants.NotFound,
          `No such ${EntityClass.name}`,
        ),
      });

    try {
      const { id } = this.asyncContext.get('user');
      const isCreator = id == (model as any).createdByUserId;

      if (!isCreator)
        throw new ForbiddenException(
          ErrorMessagesConstants.Forbidden,
          'You must be the creator',
        );

      return true;
    } catch (exception) {
      throw new ForbiddenException(
        ErrorMessagesConstants.Forbidden,
        'You must be the creator',
      );
    }
  }
}
