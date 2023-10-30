import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexCreateArticleTestAnswerDto } from './complex-create-article-test-answer.dto'

export class ComplexCreateArticleTestQuestionDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty({
    type: ComplexCreateArticleTestAnswerDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly answers: ComplexCreateArticleTestAnswerDto[]
}
