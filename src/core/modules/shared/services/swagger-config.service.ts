import { Injectable } from '@nestjs/common'
import { DocumentBuilder } from '@nestjs/swagger'
import { ApiConfigService } from './api-config.service'
import { Role } from '../../../../database/models/singles/Role/role.model'
import { User } from '../../../../database/models/singles/User/user.model'
import {
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
  ValidationError,
  ValidationMessage
} from '../../../exceptions/types/validation.types'

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

  private dbModels = [Role, User]
  private miscModels = [
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ValidationMessage,
    ValidationError,
    ProcessedError400Type,
    ProcessedError401Type,
    ProcessedError404Type,
    ProcessedError500Type,
    LoginResponseType
  ]

  public extraModels = [...this.dbModels, ...this.miscModels]
}
