import { Controller, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OpenAiService } from './open-ai.service'
import { IsPublic } from '../../core/decorators'
import { LocalePipe } from '../../core/pipes'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { LocaleType } from '../../core/interfaces/common'

@ApiTags('OpenAI')
@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @IsPublic()
  @Post('/text')
  public async text(@Query('message') message: string) {
    return this.openAiService.execute(message)
  }

  @IsPublic()
  @Post('/questions')
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
