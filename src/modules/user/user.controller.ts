import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import {
  ReadUserFilterDto,
  UpdateUserDto,
  UpdatePartiallyDto,
  CreateUserDto
} from './dtos'
import { UserService } from './user.service'
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { UserAvatarDto } from './dtos'
import { UserAvatarService } from './user-avatar.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { ProcessedError500Type } from '../../core/interfaces/common/processed-error.type'

const BaseController = buildBaseControllerCRUD<User>({
  privacySettings: {
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

@ApiExtraModels(
  ReadUserFilterDto,
  CreateUserDto,
  UpdateUserDto,
  UpdatePartiallyDto,
  UserAvatarDto
)
@ApiTags('User')
@Controller('user')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
    private readonly userAvatarService: UserAvatarService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(userService)
  }

  @ApiOperation({ summary: `Create avatar of user` })
  @ApiOkResponse({
    status: 200,
    schema: { $ref: getSchemaPath(UserAvatarDto) }
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @ApiBody({ schema: { $ref: getSchemaPath(UserAvatarDto) } })
  @Post('/avatar')
  async create(@Body() dto: UserAvatarDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.userAvatarService.create(userId, dto.staticFieldId)
  }

  @ApiOperation({ summary: 'update staticFieldId (update avatar)' })
  @ApiOkResponse({
    status: 200,
    schema: { $ref: getSchemaPath(UserAvatarDto) }
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @ApiBody({ schema: { $ref: getSchemaPath(UserAvatarDto) } })
  @Patch('/avatar')
  async update(@Body() dto: UserAvatarDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.userAvatarService.update(userId, dto.staticFieldId)
  }

  @ApiOperation({ summary: `Delete avatar of user by id` })
  @ApiOkResponse({
    status: 200,
    type: Boolean
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @Delete('/avatar/:id')
  public async delete(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    id: number
  ) {
    const countDeleted = await this.userAvatarService.delete(id)
    return countDeleted >= 1
  }
}
