import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import {
  CreateUserDto,
  CreateUserFollowingDto,
  FollowDto,
  ReadUserFilterDto,
  ReadUserFollowerFilterDto,
  ReadUserFollowingFilterDto,
  UpdatePartiallyUserDto,
  UpdateUserDto,
  UserAvatarDto
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
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { UserAvatarService } from './user-avatar.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { Get } from '@nestjs/common/decorators'
import {
  CreateEndpoint,
  DeleteEndpoint,
  GetAllEndpoint,
  GetOneEndpoint,
  UpdatePartiallyEndpoint
} from '../../core/bases/decorators'
import { UserAvatar } from '../../database/models/related/UserAvatar/user-avatar.model'
import { Request } from 'express'
import {
  transformPagingOptions,
  transformQueriesFilter,
  transformReadFilters
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
  CreateUserDto,
  CreateUserFollowingDto,
  FollowDto,
  ReadUserFilterDto,
  ReadUserFollowerFilterDto,
  ReadUserFollowingFilterDto,
  UpdatePartiallyUserDto,
  UpdateUserDto,
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

  @GetOneEndpoint({
    operationName: 'get user details',
    model: User,
    modelName: 'user'
  })
  @Get('/get-me')
  async getMe() {
    const { id: userId } = this.asyncContext.get('user')
    return this.userService.getById(userId)
  }

  @GetOneEndpoint({
    operationName: 'Get count followers of user by userId',
    model: Number,
    isPublic: true
  })
  @Get('/follower /:userId/count')
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
    const filterOpts = await transformReadFilters(
      transformQueriesFilter<UserFollower>(query.other),
      ReadUserFollowerFilterDto
    )
    return this.userFollowerService.getAll(query.pagingOptions, {
      ...filterOpts,
      filters: {
        ...filterOpts.filters,
        userId
      }
    })
  }

  @GetOneEndpoint({
    operationName: 'Get count followings of user by userId',
    model: Number
  })
  @Get('/following/:userId/count')
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
    const filterOpts = await transformReadFilters(
      transformQueriesFilter<UserFollowing>(query.other),
      ReadUserFollowingFilterDto
    )
    return this.userFollowingService.getAll(query.pagingOptions, {
      ...filterOpts,
      filters: { ...filterOpts.filters, userId }
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
