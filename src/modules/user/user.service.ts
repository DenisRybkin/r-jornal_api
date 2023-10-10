import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { User } from '../../database/models/singles/User/user.model'
import { InjectModel } from '@nestjs/sequelize'
import {
  achievementsInclude,
  avatarInclude,
  roleInclude,
  categoriesInclude,
  defaultAvatarInclude
} from '../../database/includes/user'
import { Nullable } from '../../core/types'
import { Includeable } from 'sequelize'
import { NotFoundException } from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'

@Injectable()
export class UserService extends BaseServiceCRUD<User> {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    super({
      autocompleteProperty: 'nickname',
      modelRepository: userRepository,
      includes: [
        roleInclude,
        avatarInclude,
        defaultAvatarInclude,
        categoriesInclude,
        achievementsInclude
      ]
    })
  }

  async getByEmail(
    email: string,
    rejectOnEmpty: Nullable<Error> = null,
    include: Includeable[] = []
  ) {
    return this.userRepository.findOne({
      where: { email },
      include,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessagesConstants.NotFound, 'No such user')
    })
  }
}
