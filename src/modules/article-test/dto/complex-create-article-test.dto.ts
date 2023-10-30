import { ApiProperty } from '@nestjs/swagger'
import { IsInt, MinLength, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexCreateArticleTestQuestionDto } from './complex-create-article-test-question.dto'

export class ComplexCreateArticleTestDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId: number

  @ApiProperty({
    type: ComplexCreateArticleTestQuestionDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly questions: ComplexCreateArticleTestQuestionDto[]
}
