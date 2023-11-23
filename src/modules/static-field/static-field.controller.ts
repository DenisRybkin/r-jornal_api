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
import { ImageUploadDto, ReadStaticFieldFilterDto } from './dto'
import { ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { StaticFieldService } from './static-field.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { ImageProcessPipe, UploadProcessed } from './pipes/image-process.pipe'
import { Get } from '@nestjs/common/decorators'
import { EditorImageDto } from './dto/editor-image.dto'
import { CloudFoldersConstants } from './constants/cloud-folders.constants'
import {
  CreateEndpoint,
  DeleteEndpoint,
  GetAllEndpoint
} from '../../core/bases/decorators'

const baseController = buildBaseControllerRead<StaticField>({
  filterDto: ReadStaticFieldFilterDto,
  swagger: { model: StaticField, modelName: 'StaticField' }
})

@ApiExtraModels(ImageUploadDto, ReadStaticFieldFilterDto, EditorImageDto)
@ApiTags('StaticField')
@Controller('static-field')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class StaticFieldController extends baseController {
  constructor(private readonly staticFieldService: StaticFieldService) {
    super(staticFieldService)
  }

  @CreateEndpoint({
    operationName: 'Upload image & create StaticField model',
    model: StaticField,
    createDto: ImageUploadDto
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async upload(@UploadedFile(ImageProcessPipe) image: UploadProcessed) {
    const { Location } = await this.staticFieldService.upload(
      image.buffer,
      image.dto
    )
    return this.staticFieldService.create({ ...image.dto, url: Location })
  }

  @CreateEndpoint({
    operationName:
      'Upload image from editor js plugin & create StaticField model',
    model: EditorImageDto,
    createDto: ImageUploadDto
  })
  @ApiConsumes('multipart/form-data')
  @Post('editor-js')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadFromEditor(
    @UploadedFile(ImageProcessPipe) image: UploadProcessed
  ) {
    const { Location } = await this.staticFieldService.upload(
      image.buffer,
      image.dto,
      CloudFoldersConstants.EDITORJS
    )

    const staticField = await this.staticFieldService.create({
      ...image.dto,
      url: Location
    })

    return {
      success: 1,
      file: staticField
    }
  }

  @DeleteEndpoint({
    operationName: 'Delete static field by id'
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

  @GetAllEndpoint({
    operationName: 'Endpoint for get default avatars',
    model: StaticField
  })
  @Get('default-avatars')
  public async getDefaultAvatar() {
    return this.staticFieldService.getDefaultsAvatars()
  }

  @GetAllEndpoint({
    operationName: 'Endpoint for get previews',
    model: StaticField
  })
  @Get('previews')
  public async getPreviews() {
    return this.staticFieldService.getPreviews()
  }
}
