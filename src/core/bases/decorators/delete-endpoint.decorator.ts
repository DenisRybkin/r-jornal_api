import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger'
import { ProcessedError500Type } from '../../interfaces/common/processed-error.type'
import {
  CheckPermissionModify,
  IModelInfo,
  IsPublic,
  RequiredRoles
} from '../../decorators'

interface IDeleteEndpointConfig extends IBaseSwaggerEndpoint {
  modelName?: string
  modelInfo?: IModelInfo
}

export const DeleteEndpoint = (config: IDeleteEndpointConfig) =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: config.operationName ?? `Delete ${config.modelName}`
      }),
      ApiOkResponse({ status: 200, type: Boolean }),
      ApiInternalServerErrorResponse({
        status: 500,
        type: ProcessedError500Type
      }),
      IsPublic(config.isPublic ?? false),
      ...(config.isPublic ? [] : [ApiBearerAuth()]),
      RequiredRoles(...(config.requiredRoles ?? [])),
      CheckPermissionModify(config.modelInfo)
    ]
  )
