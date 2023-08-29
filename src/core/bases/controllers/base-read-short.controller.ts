import { Get, Param, Req } from '@nestjs/common/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes'
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
import { ConstraintMessagesConstants } from 'src/core/constants'
import { IsPublic } from 'src/core/decorators'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import {
  AutoCompleteType,
  ProcessedError400Type,
  ProcessedError404Type
} from 'src/core/interfaces/common'
import { PagingType } from 'src/core/interfaces/common/paging'
import { PagingOptionsType } from 'src/core/interfaces/common/paging/paging-options.interface'
import {
  BaseControllerReadShort,
  IConfigControllerReadShort
} from 'src/core/interfaces/rest/controllers'
import { ModelWithId } from 'src/core/interfaces/rest/model-with-id.interface'
import { BaseServiceReadShort } from 'src/core/interfaces/rest/services'
import {
  transformPagingOptions,
  transformQueryFilter,
  transformReadFilter
} from '../utils'

export function buildBaseControllerReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
>(config: IConfigControllerReadShort<T>): BaseControllerReadShort<T, TShort> {
  @ApiExtraModels(
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ProcessedError400Type,
    ProcessedError404Type
  )
  abstract class ControllerReadShort extends BaseControllerReadShort<
    T,
    TShort
  > {
    constructor(protected readonly service: BaseServiceReadShort<T, TShort>) {
      super(service)
    }

    @ApiOperation({
      summary: `Get all ${config.swagger.modelName} short models`
    })
    @ApiOkResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PagingType) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(config.swagger.shortModel) }
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
    @IsPublic(config.privacySettings?.getShortAllIsPublic)
    @ApiQuery({ required: false, type: getSchemaPath(config.filterDto) })
    @Get()
    public override async getAll(@Req() req: Request) {
      const query = transformPagingOptions(req.query)
      const filterOpts = await transformReadFilter(
        transformQueryFilter<T>(query.other, config.swagger.model),
        config.filterDto
      )
      return this.service.getAllShort(query.pagingOptions, filterOpts)
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
        $ref: getSchemaPath(config.swagger.shortModel)
      }
    })
    @ApiNotFoundResponse({
      status: 404,
      schema: {
        $ref: getSchemaPath(ProcessedError404Type)
      }
    })
    @IsPublic(config.privacySettings?.getShortByIdIsPublic)
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
      return this.service.getShortById(id)
    }
  }

  return ControllerReadShort as unknown as BaseControllerReadShort<T, TShort>
}
