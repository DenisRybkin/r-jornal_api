import { ApiConfigService } from '../../../core/modules/shared/services/api-config.service'
import OpenAI from 'openai'

export const OpenAiFactory = (config: ApiConfigService) =>
  new OpenAI(config.openAIConfig)
