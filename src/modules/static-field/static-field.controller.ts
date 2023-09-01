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
import { ReadStaticFieldFilterDto } from './dtos'
import {
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { StaticFieldService } from './static-field.service'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { UrlService } from '../../core/modules/shared/services/url.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProcessedError500Type } from '../../core/interfaces/common/processed-error.type'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { IsPublic } from '../../core/decorators'

const baseController = buildBaseControllerRead<StaticField>({
  filterDto: ReadStaticFieldFilterDto,
  swagger: { model: StaticField, modelName: 'StaticField' }
})

@ApiTags('StaticField')
@Controller('static-field')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class StaticFieldController extends baseController {
  constructor(
    private readonly staticFieldService: StaticFieldService,
    private readonly configService: ApiConfigService,
    private readonly urlService: UrlService
  ) {
    super(staticFieldService)
  }

  @IsPublic()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async upload(@UploadedFile() file: Express.Multer.File) {
    const { filename: name, mimetype: type, path, originalname } = file
    const { href: url } = this.urlService.createUri(
      this.configService.appConfig.baseUrl,
      path
    )
    return this.staticFieldService.create({ name, originalname, type, url })
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
