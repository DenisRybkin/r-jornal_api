import { Injectable } from '@nestjs/common'
import { DocumentBuilder } from '@nestjs/swagger'
import { ApiConfigService } from './api-config.service'
import { Role } from '../../../../database/models/singles/Role/role.model'
import { User } from '../../../../database/models/singles/User/user.model'
import {
  BaseProcessedError,
  ProcessedError400Type,
  ProcessedError401Type,
  ProcessedError404Type,
  ProcessedError500Type
} from '../../../interfaces/common/processed-error.type'
import { PagingType } from '../../../interfaces/common/paging'
import { PagingOptionsType } from '../../../interfaces/common/paging/paging-options.interface'
import { AutoCompleteType } from '../../../interfaces/common'
import { LoginResponseType } from '../../../interfaces/common/login-response.type'
import {
  ValidationErrorType,
  ValidationMessageType
} from '../../../exceptions/types/validation.types'
import { StaticField } from '../../../../database/models/singles/StaticField/static-field.model'
import { UserAvatar } from '../../../../database/models/related/UserAvatar/user-avatar.model'
import { Category } from '../../../../database/models/singles/Category/category.model'
import { CategoryAvatar } from '../../../../database/models/related/CategoryAvatar/category-avatar.model'
import { UserCategory } from '../../../../database/models/related/UserCategory/user-category.model'
import { Achievement } from '../../../../database/models/singles/Achievement/achievement.model'
import { UserAchievement } from '../../../../database/models/related/UserAchievement/user-achievement.model'
import { UserFollower } from '../../../../database/models/related/UserFollower/user-follower.model'
import { UserFollowing } from '../../../../database/models/related/UserFollowing/user-following.model'

@Injectable()
export class SwaggerConfigProvider {
  constructor(private readonly configService: ApiConfigService) {}

  public documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('REST API docs of r-journal platform')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('Created by Denis Rybkin')
    .setContact(
      'Denis Rybkin',
      'https://github.com/DenisRybkin',
      'denis.rybkin.94@mail.ru'
    )
    .build()

  public docsPrefix = '/api/docs'

  private dbModels = [
    User,
    UserAvatar,
    Role,
    StaticField,
    CategoryAvatar,
    Category,
    UserCategory,
    UserAchievement,
    Achievement,
    UserFollower,
    UserFollowing
  ]
  private miscModels = [
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ValidationMessageType,
    ValidationErrorType,
    BaseProcessedError,
    ProcessedError400Type,
    ProcessedError401Type,
    ProcessedError404Type,
    ProcessedError500Type,
    LoginResponseType
  ]

  public extraModels = [...this.dbModels, ...this.miscModels]
}
