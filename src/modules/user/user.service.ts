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
import { CreateUserDto } from './dto'
import { UserCategoryService } from './user-category.service'
import { UserAvatarService } from './user-avatar.service'
import { GeneratorService } from '../../core/modules/shared/services/generator.service'
import { StaticFieldService } from '../static-field/static-field.service'
import { UserAchievementService } from './user-achievement.service'

@Injectable()
export class UserService extends BaseServiceCRUD<User> {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly userCategoryService: UserCategoryService,
    private readonly userAvatarService: UserAvatarService,
    private readonly userAchievementService: UserAchievementService,
    private readonly generatorService: GeneratorService,
    private readonly staticFiledService: StaticFieldService
  ) {
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

  async createFull(dto: CreateUserDto) {
    if (!dto.defaultAvatarId) {
      const defaultAvatars = await this.staticFiledService.getDefaultsAvatars()
      dto.defaultAvatarId =
        defaultAvatars.items[
          this.generatorService.integer([0, defaultAvatars.items.length])
        ].id
    }
    const createdUser = await super.create(dto as Required<CreateUserDto>)
    await Promise.all([
      this.userCategoryService.create({
        userId: createdUser.id,
        categoryId: 1
      }),
      this.userAchievementService.createDefaultUserAchievements(createdUser.id),
      this.userAchievementService.create({
        userId: createdUser.id,
        categoryId: 1,
        achievementId: 1
      })
    ])
    return createdUser
  }
}
