import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../../database/models/singles/User/user.model'
import { RoleModule } from '../role/role.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserAvatar } from '../../database/models/related/UserAvatar/user-avatar.model'
import { UserAvatarService } from './user-avatar.service'
import { StaticFieldModule } from '../static-field/static-field.module'
import { UserCategory } from '../../database/models/related/UserCategory/user-category.model'
import { UserShortService } from './user-short.service'
import { UserShortController } from './user-short.controller'
import { UserAchievement } from '../../database/models/related/UserAchievement/user-achievement.model'
import { Achievement } from '../../database/models/singles/Achievement/achievement.model'
import { AchievementsHelper } from '../achievement/utils/achievements.helper'
import { UserAchievementService } from './user-achievement.service'
import { UserCategoryService } from './user-category.service'
import { CategoryModule } from '../category/category.module'
import { UserFollowing } from '../../database/models/related/UserFollowing/user-following.model'
import { UserFollower } from '../../database/models/related/UserFollower/user-follower.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      UserAvatar,
      UserCategory,
      UserCategory,
      UserAchievement,
      Achievement,
      UserFollowing,
      UserFollower
    ]),
    RoleModule,
    StaticFieldModule,
    CategoryModule
  ],
  controllers: [UserController, UserShortController],
  providers: [
    UserService,
    UserAvatarService,
    UserCategoryService,
    UserShortService,
    UserAchievementService,
    AchievementsHelper
  ],
  exports: [
    UserService,
    UserShortService,
    UserCategoryService,
    UserAvatarService,
    UserAchievementService
  ]
})
export class UserModule {}
