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
import { Category } from '../../database/models/singles/Category/category.model'
import { CategoryAvatar } from '../../database/models/related/CategoryAvatar/category-avatar.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      UserAvatar,
      UserCategory,
      /* TODO: вынести в модуль категорий */ Category,
      UserCategory,
      CategoryAvatar
    ]),
    RoleModule,
    StaticFieldModule
  ],
  controllers: [UserController],
  providers: [UserService, UserAvatarService],
  exports: [UserService, UserAvatarService]
})
export class UserModule {}
