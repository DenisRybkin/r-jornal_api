import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import {
  ReadUserFilterDto,
  UpdateUserDto,
  UpdatePartiallyDto,
  CreateUserDto
} from './dtos'
import { UserService } from './user.service'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

const BaseController = buildBaseControllerCRUD<User>({
  privacySettings: {
    autocompleteIsPublic: true,
    getAllIsPublic: true,
    getByIdIsPublic: true,
    createIsPublic: true,
    deleteIsPublic: true,
    updateIsPublic: true,
    checkPermissionForUpdateInfo: {
      EntityClass: User,
      comparableFieldName: 'id'
    }
  },
  swagger: { model: User, modelName: 'user' },
  filterDto: ReadUserFilterDto,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  updatePartiallyDto: UpdatePartiallyDto
})

@ApiTags('User')
@Controller('user')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super(userService)
  }
}
