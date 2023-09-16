import sharp from 'sharp'
import { Injectable, PipeTransform } from '@nestjs/common'
import { ApiConfigService } from '../../../core/modules/shared/services/api-config.service'
import { CreateStaticFieldAttributes } from '../../../database/models/singles/StaticField/static-field.attributes'
import { GeneratorService } from '../../../core/modules/shared/services/generator.service'
import { UrlService } from '../../../core/modules/shared/services/url.service'

export interface UploadProcessed {
  dto: CreateStaticFieldAttributes
  buffer: Buffer
}

@Injectable()
export class ImageProcessPipe
  implements PipeTransform<Express.Multer.File, Promise<UploadProcessed>>
{
  constructor(
    private readonly configService: ApiConfigService,
    private readonly generatorService: GeneratorService,
    private readonly urlService: UrlService
  ) {}

  async transform(image: Express.Multer.File): Promise<UploadProcessed> {
    const name = this.generatorService.fileName('.webp')
    const pathname = this.configService.multerConfig.dest || './static/uploads'
    const { href: url } = this.urlService.createUri(
      this.configService.appConfig.baseUrl,
      `${pathname}/${name}`
    )

    const buffer = await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 6 })
      .toBuffer()

    return {
      dto: {
        name,
        originalname: image.originalname,
        url,
        type: image.mimetype
      },
      buffer
    }
  }
}
