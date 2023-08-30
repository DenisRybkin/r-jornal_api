import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../../database/models/singles/User/user.model'
import { RoleModule } from '../role/role.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [SequelizeModule.forFeature([User]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
