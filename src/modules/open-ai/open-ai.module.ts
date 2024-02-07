import { Module } from '@nestjs/common'
import { OpenAiService } from './open-ai.service'
import { OpenAiController } from './open-ai.controller'
import { HttpModule } from '@nestjs/axios'
import { SharedModule } from '../../core/modules/shared/shared.module'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        baseURL:
          'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
        timeout: 15000,
        headers: {
          Authorization: `Api-key ${configService.alisaGPTConfig.secretKey}`,
          ['x-folder-id']: configService.alisaGPTConfig.idKey
        }
      }),
      inject: [ApiConfigService]
    })
  ],
  controllers: [OpenAiController],
  providers: [OpenAiService],
  exports: [OpenAiService]
})
export class OpenAiModule {}
