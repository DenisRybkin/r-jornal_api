import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger'
import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import { Model, Repository } from 'sequelize-typescript'
import { ClassConstructor } from 'class-transformer'
import { ProcessedError500Type } from '../../interfaces/common/processed-error.type'
import {
  CheckPermissionModify,
  IModelInfo,
  IsPublic,
  RequiredRoles
} from '../../decorators'

interface IUpdateEndpointConfig<M extends Model<M, any>>
  extends IBaseSwaggerEndpoint {
  modelName: string
  model: Repository<M> | ClassConstructor<Object>
  updateDto: ClassConstructor<Object>
  modelInfo?: IModelInfo
  patch?: boolean
}

export const UpdateEndpoint = <M extends Model<M, any>>(
  config: IUpdateEndpointConfig<M>
) =>
  applyDecorators(
    ApiOperation({
      summary:
        config.operationName ??
        `${config.patch ? 'Partially' : 'Full'} update ${config.modelName}`
    }),
    ApiOkResponse({ status: 200, type: config.model }),
    ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    }),
    ApiBody({ type: config.updateDto }),
    IsPublic(config.isPublic ?? false),
    ...(config.isPublic ? [] : [ApiBearerAuth()]),
    RequiredRoles(...(config.requiredRoles ?? [])),
    CheckPermissionModify(config.modelInfo)
  )
