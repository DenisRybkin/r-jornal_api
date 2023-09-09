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

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserAvatar, UserCategory, UserCategory]),
    RoleModule,
    StaticFieldModule
  ],
  controllers: [UserController, UserShortController],
  providers: [UserService, UserAvatarService, UserShortService],
  exports: [UserService, UserAvatarService]
})
export class UserModule {}
