import { UnprocessableEntityException } from '../../../core/exceptions/build-in'
import { ApiConfigService } from '../../../core/modules/shared/services/api-config.service'
import { GeneratorService } from '../../../core/modules/shared/services/generator.service'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { ErrorMessagesConstants } from '../../../core/constants'

export const MulterAdapter = (
  configService: ApiConfigService,
  generatorService: GeneratorService
): MulterOptions => ({
  ...configService.multerConfig,
  storage: diskStorage({
    destination: configService.multerConfig.dest,
    filename: (_, file: Express.Multer.File, cb) =>
      cb(null, generatorService.fileName(extname(file.originalname)))
  }),
  fileFilter: (_, file: Express.Multer.File, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        new UnprocessableEntityException(
          ErrorMessagesConstants.ValidationError
        ),
        false
      )
    }

    return cb(null, true)
  },
  limits: { fileSize: Math.pow(1024, 2) }
})
