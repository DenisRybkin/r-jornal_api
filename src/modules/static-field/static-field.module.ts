import { Module } from '@nestjs/common'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { MulterModule } from '@nestjs/platform-express'
import { SharedModule } from '../../core/modules/shared/shared.module'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { GeneratorService } from '../../core/modules/shared/services/generator.service'
import { MulterAdapter } from './utils/multer.adapter'
import { StaticFieldService } from './static-field.service'
import { StaticFieldController } from './static-field.controller'

@Module({
  imports: [
    SequelizeModule.forFeature([StaticField]),
    MulterModule.registerAsync({
      imports: [SharedModule],
      useFactory: (
        configService: ApiConfigService,
        generatorService: GeneratorService
      ) => MulterAdapter(configService, generatorService),
      inject: [ApiConfigService, GeneratorService]
    })
  ],
  providers: [StaticFieldService],
  controllers: [StaticFieldController]
})
export class StaticFieldModule {}
