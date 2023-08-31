import { Get, Param, ParseIntPipe, Req } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath
} from '@nestjs/swagger'
import { Request } from 'express'
import { Model } from 'sequelize-typescript'
import { ConstraintMessagesConstants } from 'src/core/constants/constraint-messages.constants'
import { IsPublic, RequiredRoles } from 'src/core/decorators'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import {
  AutoCompleteType,
  ProcessedError400Type,
  ProcessedError404Type
} from 'src/core/interfaces/common'
import { PagingType } from 'src/core/interfaces/common/paging'
import { PagingOptionsType } from 'src/core/interfaces/common/paging/paging-options.interface'
import { BaseControllerRead } from 'src/core/interfaces/rest/controllers'
import { IConfigControllerRead } from 'src/core/interfaces/rest/controllers/controller-read.interface'
import { BaseServiceRead } from 'src/core/interfaces/rest/services'
import {
  transformPagingOptions,
  transformQueryFilter,
  transformReadFilter
} from '../utils'

export function buildBaseControllerRead<T extends Model<T, any>>(
  config: IConfigControllerRead<T>
): BaseControllerRead<T> {
  @ApiExtraModels(
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ProcessedError400Type,
    ProcessedError404Type
  )
  abstract class ControllerRead extends BaseControllerRead<T> {
    protected constructor(protected readonly service: BaseServiceRead<T>) {
      super(service)
    }

    @ApiOperation({ summary: `Get all ${config.swagger.modelName} models` })
    @ApiOkResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PagingType) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(config.swagger.model) }
              },
              pagingOptions: { $ref: getSchemaPath(PagingOptionsType) }
            }
          }
        ]
      }
    })
    @ApiBadRequestResponse({
      status: 400,
      schema: {
        $ref: getSchemaPath(ProcessedError400Type)
      }
    })
    @IsPublic(config.privacySettings?.getAllIsPublic)
    @ApiQuery({
      required: false,
      schema: { oneOf: [{ $ref: getSchemaPath(config.filterDto) }] }
    })
    @RequiredRoles(...(config.privacySettings?.getAllRequireRoles ?? []))
    @Get()
    public override async getAll(@Req() req: Request) {
      const query = transformPagingOptions(req.query)
      const filterOpts = await transformReadFilter(
        transformQueryFilter<T>(query.other, config.swagger.model),
        config.filterDto
      )
      return this.service.getAll(query.pagingOptions, filterOpts)
    }

    @ApiOperation({ summary: 'Get all models in autocomplete format' })
    @ApiOkResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PagingType) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(AutoCompleteType) }
              },
              pagingOptions: { $ref: getSchemaPath(PagingOptionsType) }
            }
          }
        ]
      }
    })
    @ApiBadRequestResponse({
      status: 400,
      schema: {
        $ref: getSchemaPath(ProcessedError400Type)
      }
    })
    @IsPublic(config.privacySettings?.autocompleteIsPublic)
    @RequiredRoles(...(config.privacySettings?.getByIdRequireRoles ?? []))
    @Get('/autocomplete')
    public override async autocomplete(@Req() req: Request) {
      const query = transformPagingOptions(req.query)
      const filterOpts = await transformReadFilter(
        transformQueryFilter<T>(query.other, config.swagger.model),
        config.filterDto
      )
      return this.service.autocomplete(query.pagingOptions, filterOpts)
    }

    @ApiOperation({ summary: 'Get model by id' })
    @ApiOkResponse({
      status: 200,
      schema: {
        $ref: getSchemaPath(config.swagger.model)
      }
    })
    @ApiNotFoundResponse({
      status: 404,
      schema: {
        $ref: getSchemaPath(ProcessedError404Type)
      }
    })
    @IsPublic(config.privacySettings?.getByIdIsPublic)
    @RequiredRoles(...(config.privacySettings?.getByIdRequireRoles ?? []))
    @Get('/:id')
    public override async getById(
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
      return this.service.getById(id)
    }
  }

  return ControllerRead as unknown as BaseControllerRead<T>
}
