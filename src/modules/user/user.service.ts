import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { User } from '../../database/models/singles/User/user.model'
import { InjectModel } from '@nestjs/sequelize'
import { roleInclude } from '../../database/includes'

@Injectable()
export class UserService extends BaseServiceCRUD<User> {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    super({
      autocompleteProperty: 'nickname',
      modelRepository: userRepository,
      includes: [roleInclude]
    })
  }
}
