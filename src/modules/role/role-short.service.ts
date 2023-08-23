import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { BaseServiceReadShort } from 'src/core/bases/services'
import { AsyncContext } from 'src/core/modules/async-context/async-context'
import { Role } from '../../database/models/singles/Role/role.model'
import { RoleShort } from './dtos/role-short.dto'
import { role2roleShortMapper } from './utils/role2role-short.mapper'

@Injectable()
export class RoleShortService extends BaseServiceReadShort<Role, RoleShort> {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
    protected readonly asyncContext: AsyncContext<string, any>
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: roleRepository,
      mapper: role2roleShortMapper
    })
  }
}
