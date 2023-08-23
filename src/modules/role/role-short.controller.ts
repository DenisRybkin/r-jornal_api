import { Controller } from '@nestjs/common'
import { ApiExtraModels } from '@nestjs/swagger'
import { buildBaseControllerReadShort } from 'src/core/bases/controllers'
import { Role } from 'src/database/models/singles/Role/role.model'
import { ReadRoleFilterDto } from './dtos/read-filter.dto'
import { RoleShort } from './dtos/role-short.dto'
import { RoleShortService } from './role-short.service'

const BaseController = buildBaseControllerReadShort<Role, RoleShort>({
  privacySettings: {
    autocompleteIsPublic: true,
    getShortAllIsPublic: true,
    getShortByIdIsPublic: true
  },
  swagger: { model: Role, modelName: 'role', shortModel: RoleShort },
  filterDto: ReadRoleFilterDto
})

@ApiExtraModels(Role, ReadRoleFilterDto)
@Controller('role-short')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class RoleShortController extends BaseController {
  constructor(private readonly roleService: RoleShortService) {
    super(roleService)
  }
}
