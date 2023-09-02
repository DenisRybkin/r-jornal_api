import sharp from 'sharp'
import { Injectable, PipeTransform } from '@nestjs/common'
import * as path from 'path'
import { ApiConfigService } from '../../../core/modules/shared/services/api-config.service'
import { CreateStaticFieldAttributes } from '../../../database/models/singles/StaticField/static-field.attributes'
import { GeneratorService } from '../../../core/modules/shared/services/generator.service'
import { UrlService } from '../../../core/modules/shared/services/url.service'

@Injectable()
export class ImageProcessPipe
  implements
    PipeTransform<Express.Multer.File, Promise<CreateStaticFieldAttributes>>
{
  constructor(
    private readonly configService: ApiConfigService,
    private readonly generatorService: GeneratorService,
    private readonly urlService: UrlService
  ) {}

  async transform(
    image: Express.Multer.File
  ): Promise<CreateStaticFieldAttributes> {
    const name = this.generatorService.fileName('.webp')
    const pathname = this.configService.multerConfig.dest || './static/uploads'
    const { href: url } = this.urlService.createUri(
      this.configService.appConfig.baseUrl,
      `${pathname}/${name}`
    )

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 6 })
      .toFile(path.join(pathname, name))

    return {
      name,
      originalname: image.originalname,
      url,
      type: image.mimetype
    }
  }
}
