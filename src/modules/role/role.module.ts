import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '../../database/models/singles/Role/role.model'
import { RoleShortController } from './role-short.controller'
import { RoleShortService } from './role-short.service'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RoleController, RoleShortController],
  providers: [RoleService, RoleShortService],
  exports: [RoleService]
})
export class RoleModule {}
