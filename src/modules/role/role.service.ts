import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Role } from '../../database/models/singles/Role/role.model';
import { RolesType } from '../../core/interfaces/common';
import { Nullable } from '../../core/types';
import { BadRequestException } from '../../core/exceptions/build-in';
import { ErrorMessagesConstants } from '../../core/constants';
import { ApiServiceRead } from '../../core/bases/api-service-read.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RoleService extends ApiServiceRead<Role, {}> {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
    @InjectConnection() connection: Sequelize,
  ) {
    super(connection, Role, 'name');
  }

  public async getByName(
    name: RolesType,
    rejectOnEmpty: Nullable<Error> = null,
  ) {
    return this.roleRepository.findOne({
      where: { name },
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(
          ErrorMessagesConstants.BadRequest,
          'No such role',
        ),
    });
  }
}
