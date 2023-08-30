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

const BaseController = buildBaseControllerCRUD<User>({
  privacySettings: {
    autocompleteIsPublic: true,
    getAllIsPublic: true,
    getByIdIsPublic: true,
    createIsPublic: true,
    deleteIsPublic: true,
    updateIsPublic: true
  },
  swagger: { model: User, modelName: 'user' },
  filterDto: ReadUserFilterDto,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  updatePartiallyDto: UpdatePartiallyDto
})

@Controller('user')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super(userService)
  }
}
