import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { BaseServiceCRUD } from 'src/core/bases/services'
import { AsyncContext } from 'src/core/modules/async-context/async-context'
import { ErrorMessagesConstants } from '../../core/constants'
import { BadRequestException } from '../../core/exceptions/build-in'
import { Roles } from '../../core/interfaces/common'
import { Nullable } from '../../core/types'
import { Role } from '../../database/models/singles/Role/role.model'

@Injectable()
export class RoleService extends BaseServiceCRUD<Role> {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
    protected readonly asyncContext: AsyncContext<string, any>
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: roleRepository
    })
  }

  public async getByName(name: Roles, rejectOnEmpty: Nullable<Error> = null) {
    return this.roleRepository.findOne({
      where: { name },
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(
          ErrorMessagesConstants.BadRequest,
          'No such role'
        )
    })
  }
}
