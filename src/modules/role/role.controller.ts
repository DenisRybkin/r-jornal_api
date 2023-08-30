import { Controller } from '@nestjs/common'
import { ApiExtraModels } from '@nestjs/swagger'
import { buildBaseControllerCRUD } from 'src/core/bases/controllers'
import { Role } from 'src/database/models/singles/Role/role.model'
import {
  CreateRoleDto,
  ReadRoleFilterDto,
  UpdatePartiallyRoleDto,
  UpdateRoleDto
} from './dtos'
import { RoleService } from './role.service'
import { User } from '../../database/models/singles/User/user.model'

const BaseController = buildBaseControllerCRUD<Role>({
  privacySettings: {
    autocompleteIsPublic: true,
    getAllIsPublic: true,
    getByIdIsPublic: true,
    createIsPublic: true,
    deleteIsPublic: true,
    updateIsPublic: true
  },
  swagger: { model: Role, modelName: 'role' },
  filterDto: ReadRoleFilterDto,
  createDto: CreateRoleDto,
  updateDto: UpdateRoleDto,
  updatePartiallyDto: UpdatePartiallyRoleDto
})

@ApiExtraModels(Role, ReadRoleFilterDto, User)
@Controller('role')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class RoleController extends BaseController {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }
}
