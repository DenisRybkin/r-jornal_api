import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import {
  CreateUserDto,
  ReadUserFilterDto,
  UpdatePartiallyUserDto,
  UpdateUserDto,
  UserAvatarDto,
  ReadUserFollowingFilterDto,
  ReadUserFollowerFilterDto,
  CreateUserFollowingDto,
  FollowDto
} from './dto'
import { UserService } from './user.service'
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { UserAvatarService } from './user-avatar.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { ProcessedError400Type } from '../../core/interfaces/common'
import { Get } from '@nestjs/common/decorators'
import {
  CreateEndpoint,
  DeleteEndpoint,
  GetAllEndpoint,
  GetByIdEndpoint,
  UpdatePartiallyEndpoint
} from '../../core/bases/decorators'
import { UserAvatar } from '../../database/models/related/UserAvatar/user-avatar.model'
import { Request } from 'express'
import {
  transformPagingOptions,
  transformQueryFilter,
  transformReadFilter
} from '../../core/bases/utils'
import { UserFollower } from '../../database/models/related/UserFollower/user-follower.model'
import { UserFollowingService } from './user-following.service'
import { UserFollowerService } from './user-follower.service'
import { UserFollowing } from '../../database/models/related/UserFollowing/user-following.model'

const BaseController = buildBaseControllerCRUD<User>({
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    checkPermissionForUpdateInfo: {
      EntityClass: User,
      comparableFieldName: 'id'
    }
  },
  swagger: { model: User, modelName: 'user' },
  filterDto: ReadUserFilterDto,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  updatePartiallyDto: UpdatePartiallyUserDto
})

@ApiExtraModels(
  ReadUserFilterDto,
  CreateUserDto,
  UpdateUserDto,
  UpdatePartiallyUserDto,
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
    private readonly userFollowerService: UserFollowerService,
    private readonly userFollowingService: UserFollowingService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(userService)
  }

  @ApiOperation({ summary: `get user details` })
  @ApiOkResponse({
    status: 200,
    schema: { $ref: getSchemaPath(User) }
  })
  @ApiInternalServerErrorResponse({
    status: 400,
    schema: {
      $ref: getSchemaPath(ProcessedError400Type)
    }
  })
  @Get('/get-me')
  async getMe() {
    const { id: userId } = this.asyncContext.get('user')
    return this.userService.getById(userId)
  }

  @GetByIdEndpoint({
    operationName: 'Get count followers of user by userId',
    model: Number
  })
  @Get('/followers/:userId/count')
  async getFollowersCount(
    @Param(
      'userId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('userId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    userId: number
  ) {
    return this.userFollowerService.count(userId)
  }

  @GetAllEndpoint({
    operationName: 'Get all followers of user by userId',
    model: UserFollower,
    filterDto: ReadUserFollowerFilterDto
  })
  @Get('/follower/:userId')
  async getFollowersByUserId(
    @Param(
      'userId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('userId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    userId: number,
    @Req() req: Request
  ) {
    const query = transformPagingOptions(req.query, UserFollower)
    const filterOpts = await transformReadFilter(
      transformQueryFilter<UserFollower>(query.other, UserFollower),
      ReadUserFollowerFilterDto
    )
    return this.userFollowerService.getAll(query.pagingOptions, {
      ...filterOpts,
      userId
    })
  }

  @GetByIdEndpoint({
    operationName: 'Get count followers of user by userId',
    model: Number
  })
  @Get('/followings/:userId/count')
  async getFollowingsCount(
    @Param(
      'userId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('userId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    userId: number
  ) {
    return this.userFollowingService.count(userId)
  }

  @GetAllEndpoint({
    operationName: 'Get all followings of user by userId',
    model: UserFollower,
    filterDto: ReadUserFollowerFilterDto
  })
  @Get('/following/:userId')
  async getFollowingsByUserId(
    @Param(
      'userId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('userId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    userId: number,
    @Req() req: Request
  ) {
    const query = transformPagingOptions(req.query, UserFollowing)
    const filterOpts = await transformReadFilter(
      transformQueryFilter<UserFollowing>(query.other, UserFollowing),
      ReadUserFollowingFilterDto
    )
    return this.userFollowingService.getAll(query.pagingOptions, {
      ...filterOpts,
      userId
    })
  }

  @CreateEndpoint({
    operationName: 'Follow to user endpoint',
    createDto: CreateUserFollowingDto,
    modelName: 'user following',
    model: FollowDto
  })
  @Post('/follow')
  async follow(@Body() dto: CreateUserFollowingDto) {
    const currentUserId = this.asyncContext.get('user').id
    const [userFollowing, userFollower] = await Promise.all([
      this.userFollowingService.create({
        userId: currentUserId,
        followingUserId: dto.followingUserId
      }),
      this.userFollowerService.create({
        userId: dto.followingUserId,
        followerUserId: currentUserId
      })
    ])

    return { userFollowing, userFollower }
  }

  @DeleteEndpoint({ operationName: 'Unfollow from the user by userId' })
  @Delete('/unfollow/:userId')
  async unfollow(
    @Param(
      'userId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('userId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    userId: number
  ) {
    const currentUserId = this.asyncContext.get('user').id
    const [userFollowing, userFollower] = await Promise.all([
      this.userFollowingService.delete({
        userId: currentUserId,
        followingUserId: userId
      }),
      this.userFollowerService.delete({
        userId: userId,
        followerUserId: currentUserId
      })
    ])

    return userFollowing + userFollower >= 2
  }

  @CreateEndpoint({
    operationName: 'Create avatar of user',
    model: UserAvatar,
    createDto: UserAvatarDto
  })
  @Post('/avatar')
  async createAvatar(@Body() dto: UserAvatarDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.userAvatarService.create(userId, dto.staticFieldId)
  }

  @UpdatePartiallyEndpoint({
    operationName: 'update staticFieldId (update avatar)',
    model: UserAvatar,
    updateDto: UserAvatarDto
  })
  @Patch('/avatar')
  async updateAvatar(@Body() dto: UserAvatarDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.userAvatarService.update(userId, dto.staticFieldId)
  }

  @DeleteEndpoint({
    operationName: 'Delete avatar of user by id'
  })
  @Delete('/avatar/:id')
  public async deleteAvatar(
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
