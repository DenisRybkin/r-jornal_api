import { Body, Delete, Param, Patch, Post, Put } from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger'
import { Model } from 'sequelize-typescript'
import { ConstraintMessagesConstants } from 'src/core/constants'
import {
  CheckPermissionUpdate,
  IsPublic,
  RequiredRoles
} from 'src/core/decorators'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import { ProcessedError500Type } from 'src/core/interfaces/common/processed-error.type'
import {
  BaseControllerCRUD,
  IConfigControllerCRUD
} from 'src/core/interfaces/rest/controllers'
import { BaseServiceCRUD } from 'src/core/interfaces/rest/services'
import { buildBaseControllerRead } from './'
import { MakeNullishOptional } from 'sequelize/types/utils'

export function buildBaseControllerCRUD<T extends Model<T, any>>(
  config: IConfigControllerCRUD<T>
): BaseControllerCRUD<T> {
  const ControllerRead = buildBaseControllerRead<T>(config)

  class CreateDto extends config.createDto {}
  class UpdateDto extends config.updateDto {}
  class UpdatePartially extends config.updatePartiallyDto {}

  // eslint-disable-next-line
  //@ts-ignore
  class ControllerCRUD extends ControllerRead implements BaseControllerCRUD<T> {
    constructor(protected readonly service: BaseServiceCRUD<T>) {
      super(service)
    }

    @ApiOperation({ summary: `Create new ${config.swagger.modelName} model` })
    @ApiOkResponse({
      status: 200,
      type: config.swagger.model
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    })
    @ApiBody({ type: config.createDto })
    @IsPublic(config.privacySettings?.createIsPublic ?? false)
    @RequiredRoles(...(config.privacySettings?.createRequireRoles ?? []))
    @Post()
    public async create(@Body() dto: CreateDto) {
      return await this.service.create(
        dto as MakeNullishOptional<T['_creationAttributes']>
      )
    }

    @ApiOperation({ summary: `Full update ${config.swagger.modelName}` })
    @ApiOkResponse({
      status: 200,
      type: config.swagger.model
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    })
    @ApiBody({ type: config.updateDto })
    @IsPublic(config.privacySettings?.updateIsPublic ?? false)
    @RequiredRoles(...(config.privacySettings?.updateRequireRoles ?? []))
    @CheckPermissionUpdate(config.privacySettings?.checkPermissionForUpdateInfo)
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
      @Body() dto: UpdateDto
    ) {
      if ('id' in dto) delete dto.id
      return await this.service.update(id, dto as T)
    }

    @ApiOperation({ summary: `Partially update ${config.swagger.modelName}` })
    @ApiOkResponse({
      status: 200,
      type: config.swagger.model
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    })
    @ApiBody({ type: config.updatePartiallyDto })
    @IsPublic(config.privacySettings?.updateIsPublic ?? false)
    @RequiredRoles(...(config.privacySettings?.updateRequireRoles ?? []))
    @CheckPermissionUpdate(config.privacySettings?.checkPermissionForUpdateInfo)
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
      @Body() dto: UpdatePartially
    ) {
      if ('id' in dto) delete dto.id
      return this.service.updatePartially(id, dto as Partial<T>)
    }

    @ApiOperation({ summary: `Delete ${config.swagger.modelName} by id` })
    @ApiOkResponse({
      status: 200,
      type: Boolean
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    })
    @IsPublic(config.privacySettings?.deleteIsPublic ?? false)
    @RequiredRoles(...(config.privacySettings?.deleteRequireRoles ?? []))
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
      return countDeleted >= 1
    }
  }

  return ControllerCRUD as unknown as BaseControllerCRUD<T>
}
