import { Controller, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OpenAiService } from './open-ai.service'
import { LocalePipe } from '../../core/pipes'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { LocaleType } from '../../core/interfaces/common'
import { Get } from '@nestjs/common/decorators'

@ApiTags('OpenAI')
@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('/text')
  public async text(@Query('message') message: string) {
    return this.openAiService.execute(message)
  }

  @Get('/questions')
  public async questions(
    @Query('topic') topic: string,
    @Query('locale', new LocalePipe()) locale: LocaleType,
    @Query(
      'count',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('count', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    count: number
  ) {
    return this.openAiService.genQuestions(topic, locale, count)
  }
}
