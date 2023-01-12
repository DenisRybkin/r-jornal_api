import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { BaseUniqueValidator } from './bases/base-unique.validator';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator extends BaseUniqueValidator {
  constructor(@InjectConnection() protected readonly connection: Sequelize) {
    super(connection);
  }
}
