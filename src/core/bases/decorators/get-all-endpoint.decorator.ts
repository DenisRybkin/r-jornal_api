import { applyDecorators } from '@nestjs/common'
import { Model, Repository } from 'sequelize-typescript'
import { ClassConstructor } from 'class-transformer'
import { ModelWithId } from '../../interfaces/rest/model-with-id.interface'
import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath
} from '@nestjs/swagger'
import { PagingType } from '../../interfaces/common/paging'
import { PagingOptionsType } from '../../interfaces/common/paging/paging-options.interface'
import { ProcessedError400Type } from '../../interfaces/common'
import { IsPublic, RequiredRoles } from '../../decorators'
import { FilterQueries } from './utils/filters-query.decorator.util'

interface IGetAllEndpointConfig<M extends Model<M, any>>
  extends IBaseSwaggerEndpoint {
  isShort?: boolean
  modelName?: string
  model: Repository<M> | ClassConstructor<ModelWithId>
  filterDto?: ClassConstructor<ModelWithId>
}

export const GetAllEndpoint = <M extends Model<M, any>>(
  config: IGetAllEndpointConfig<M>
) =>
  applyDecorators(
    ApiOperation({
      summary:
        config.operationName ??
        `Get all ${config.modelName} ${config.isShort && 'short'} models`
    }),
    ApiOkResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PagingType) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(config.model) }
              },
              pagingOptions: { $ref: getSchemaPath(PagingOptionsType) }
            }
          }
        ]
      }
    }),
    ApiBadRequestResponse({
      status: 400,
      type: ProcessedError400Type
    }),
    ...FilterQueries(PagingOptionsType),
    ...FilterQueries(config.filterDto),
    IsPublic(config.isPublic ?? false),
    RequiredRoles(...(config.requiredRoles ?? []))
  )
