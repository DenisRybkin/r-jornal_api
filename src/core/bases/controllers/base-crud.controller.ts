import { Body, Delete, Param, Patch, Post, Put } from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath
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
import { validateByDto } from 'src/core/validators'
import { buildBaseControllerRead } from './'

export function buildBaseControllerCRUD<T extends Model<T, any>>(
  config: IConfigControllerCRUD<T>
): BaseControllerCRUD<T> {
  const ControllerRead = buildBaseControllerRead<T>(config)
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
    @ApiBody({ schema: { $ref: getSchemaPath(config.createDto) } })
    @IsPublic(config.privacySettings?.createIsPublic ?? false)
    @RequiredRoles(...(config.privacySettings?.createRequireRoles ?? []))
    @Post()
    public async create(@Body() dto: InstanceType<typeof config.createDto>) {
      await validateByDto(dto as any, config.createDto, {
        skipMissingProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      return await this.service.create(dto as any)
    }

    @ApiOperation({ summary: `Full update ${config.swagger.modelName}` })
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
    @ApiBody({ schema: { $ref: getSchemaPath(config.updateDto) } })
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
      @Body() dto: InstanceType<typeof config.updateDto>
    ) {
      if ('id' in dto) delete dto.id
      await validateByDto(dto as any, config.createDto, {
        skipMissingProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      return await this.service.update(id, dto as any)
    }

    @ApiOperation({ summary: `Partially update ${config.swagger.modelName}` })
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
    @ApiBody({ schema: { $ref: getSchemaPath(config.updatePartiallyDto) } })
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
      @Body() dto: InstanceType<typeof config.updatePartiallyDto>
    ) {
      if ('id' in dto) delete dto.id
      await validateByDto(dto as any, config.createDto, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      return this.service.updatePartially(id, dto as Partial<T>)
    }

    @ApiOperation({ summary: `Delete ${config.swagger.modelName} by id` })
    @ApiOkResponse({
      status: 200,
      type: Boolean
    })
    @ApiInternalServerErrorResponse({
      status: 500,
      schema: {
        $ref: getSchemaPath(ProcessedError500Type)
      }
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
