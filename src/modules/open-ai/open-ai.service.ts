import { Injectable } from '@nestjs/common'
import { OpenAiFactory } from './utils/open-ai.factory'
import OpenAI from 'openai'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { LocaleType } from '../../core/interfaces/common'
import { genTemplateForQuestions } from './utils/query.templates'

@Injectable()
export class OpenAiService {
  private client: OpenAI

  constructor(
    private readonly configService: ApiConfigService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    this.client = OpenAiFactory(configService)
  }

  async execute(text: string) {
    return this.client.completions
      .create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: text,
        max_tokens: 300,
        temperature: 0,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      })
      .catch(console.error)
  }

  async genQuestions(topic: string, locale: LocaleType, count?: number) {
    return this.execute(genTemplateForQuestions(topic, locale, count))
  }
}
