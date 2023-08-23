import { Body, Delete, Param, Patch, Post, Put } from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath
} from '@nestjs/swagger'
import { Model } from 'sequelize-typescript'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { IsPublic } from 'src/core/decorators'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import { ProcessedError500Type } from 'src/core/interfaces/common/processed-error.type'
import {
  BaseControllerCRUD,
  IConfigControllerCRUD
} from 'src/core/interfaces/rest/controllers'
import { BaseServiceCRUD } from 'src/core/interfaces/rest/services'
import { validateByDto } from 'src/core/validators'
import { buildBaseControllerRead } from './'

export function buildBaseControllerCRUD<T extends Model<T, any>>(
  config: IConfigControllerCRUD<T>
): BaseControllerCRUD<T> {
  const ControllerRead = buildBaseControllerRead<T>(config)

  @ApiExtraModels(ProcessedError500Type)
  // eslint-disable-next-line
  //@ts-ignore
  class ControllerCRUD extends ControllerRead implements BaseControllerCRUD<T> {
    constructor(protected readonly service: BaseServiceCRUD<T>) {
      super(service)
    }

    @ApiOperation({ summary: `Create new ${config.swagger.modelName} model` })
    @ApiOkResponse({
      status: 200,
      schema: { $ref: getSchemaPath(config.swagger.model) }
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      schema: {
        $ref: getSchemaPath(ProcessedError500Type)
      }
    })
    @IsPublic(config.privacySettings?.createIsPublic)
    @Post()
    public async create(@Body() dto: T) {
      validateByDto(dto as any, config.createDto, {
        skipMissingProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      return this.service.create(dto as any)
    }

    @ApiOperation({ summary: 'Full update model' })
    @ApiOkResponse({
      status: 200,
      schema: { $ref: getSchemaPath(config.swagger.model) }
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      schema: {
        $ref: getSchemaPath(ProcessedError500Type)
      }
    })
    @IsPublic(config.privacySettings?.updateIsPublic)
    @Put('/:id')
    public async update(
      @Param(
        'id',
        new ParseIntPipe({
          exceptionFactory: PipeExceptionFactory('id', [
            ConstraintMessagesConstants.MustBeInteger
          ])
        })
      )
      id: number,
      @Body() dto: T
    ) {
      if ('id' in dto) delete dto.id
      validateByDto(dto as any, config.createDto, {
        skipMissingProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      return this.service.update(id, dto)
    }

    @ApiOperation({ summary: 'Partially update model' })
    @ApiOkResponse({
      status: 200,
      schema: { $ref: getSchemaPath(config.swagger.model) }
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      schema: {
        $ref: getSchemaPath(ProcessedError500Type)
      }
    })
    @IsPublic(config.privacySettings?.updateIsPublic)
    @Patch('/:id')
    public async updatePartially(
      @Param(
        'id',
        new ParseIntPipe({
          exceptionFactory: PipeExceptionFactory('id', [
            ConstraintMessagesConstants.MustBeInteger
          ])
        })
      )
      id: number,
      @Body() dto: Partial<T>
    ) {
      if ('id' in dto) delete dto.id
      validateByDto(dto as any, config.createDto, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      return this.service.updatePartially(id, dto)
    }

    @ApiOperation({ summary: 'Delete model by id' })
    @ApiOkResponse({
      status: 200,
      type: 'boolean'
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      schema: {
        $ref: getSchemaPath(ProcessedError500Type)
      }
    })
    @IsPublic(config.privacySettings?.deleteIsPublic)
    @Delete('/:id')
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
      const countDeleted = await this.service.delete(id)
      return countDeleted == 1
    }
  }

  return ControllerCRUD as unknown as BaseControllerCRUD<T>
}
