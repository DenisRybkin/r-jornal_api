import { Injectable, Logger } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { UserAchievement } from '../../database/models/related/UserAchievement/user-achievement.model'
import { InjectModel } from '@nestjs/sequelize'
import { EarnUserPointsStrategyConstants } from './constants/user-point.constants'
import { AchievementsHelper } from '../achievement/utils/achievements.helper'
import { achievementInclude } from '../../database/includes/user'
import { InternalServerErrorException } from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'
import { CategoryService } from '../category/category.service'
import { defaultPagingOptions } from '../../core/bases/utils'
import { Transaction } from 'sequelize'

@Injectable()
export class UserAchievementService extends BaseServiceCRUD<UserAchievement> {
  constructor(
    @InjectModel(UserAchievement)
    private readonly userAchievementRepository: typeof UserAchievement,
    private readonly achievementsHelper: AchievementsHelper,
    private readonly categoriesService: CategoryService
  ) {
    super(
      {
        autocompleteProperty: 'userId',
        modelRepository: userAchievementRepository,
        includes: [achievementInclude]
      },
      new Logger(UserAchievementService.name)
    )
  }
  public async getByUserIdAndCategoryId(
    userId: number,
    categoryId: number,
    transaction?: Transaction
  ) {
    return await this.getOne(
      { categoryId, userId },
      [achievementInclude],
      null,
      transaction
    )
  }

  public async updateUserPoints(
    userId: number,
    categoryId: number,
    strategy: EarnUserPointsStrategyConstants,
    transaction?: Transaction
  ) {
    const userAchievement = await this.getByUserIdAndCategoryId(
      userId,
      categoryId,
      transaction
    )
    const achievement = userAchievement.achievement
    if (!achievement)
      throw new InternalServerErrorException(
        ErrorMessagesConstants.InternalError,
        'Cannot find achievement'
      )
    const [updatedUserAchievement] = await Promise.all([
      userAchievement.increment('userPoints', { by: strategy, transaction }),
      this.achievementsHelper.checkDiscrepancyBigWay(
        userAchievement.userPoints + strategy,
        achievement.level
      )
        ? this.assignFollowingAchievement(userAchievement, transaction)
        : Promise.resolve()
    ])
    return updatedUserAchievement
  }

  public async assignFollowingAchievement(
    userAchievement: UserAchievement,
    transaction?: Transaction
  ) {
    //TODO: notify client through websockets or firebase
    await userAchievement.increment('achievementId', { by: 1, transaction })
  }

  public async createDefaultUserAchievements(
    userId: number,
    transaction?: Transaction
  ) {
    const categories = await this.categoriesService.getAll(
      {
        ...defaultPagingOptions,
        pageSize: 20
      },
      null,
      transaction
    )
    return await this.userAchievementRepository.bulkCreate(
      categories.items.map(item => ({
        userId,
        achievementId: 1,
        categoryId: item.id
      })),
      { transaction }
    )
  }
}
