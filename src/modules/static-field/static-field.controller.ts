import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { buildBaseControllerRead } from '../../core/bases/controllers'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { ImageUploadDto, ReadStaticFieldFilterDto } from './dtos'
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { StaticFieldService } from './static-field.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProcessedError500Type } from '../../core/interfaces/common/processed-error.type'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { ImageProcessPipe } from './pipes/image-process.pipe'
import { CreateStaticFieldAttributes } from '../../database/models/singles/StaticField/static-field.attributes'

const baseController = buildBaseControllerRead<StaticField>({
  filterDto: ReadStaticFieldFilterDto,
  swagger: { model: StaticField, modelName: 'StaticField' }
})

@ApiTags('StaticField')
@Controller('static-field')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class StaticFieldController extends baseController {
  constructor(private readonly staticFieldService: StaticFieldService) {
    super(staticFieldService)
  }

  @ApiOperation({ summary: `Upload image & create StaticField model` })
  @ApiOkResponse({
    status: 200,
    schema: { $ref: getSchemaPath(StaticField) }
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @ApiBody({
    description: 'Image form-data',
    type: ImageUploadDto
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async upload(
    @UploadedFile(ImageProcessPipe) dto: CreateStaticFieldAttributes
  ) {
    return this.staticFieldService.create(dto)
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
    const countDeleted = await this.staticFieldService.delete(id)
    return countDeleted == 1
  }
}
