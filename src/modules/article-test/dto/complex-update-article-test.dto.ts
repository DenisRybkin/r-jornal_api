import { ApiProperty } from '@nestjs/swagger'
import { IsInt, MinLength, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexUpdateArticleTestQuestionDto } from './complex-update-article-test-question.dto'

export class ComplexUpdateArticleTestDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId: number

  @ApiProperty({
    type: ComplexUpdateArticleTestQuestionDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly questions: ComplexUpdateArticleTestQuestionDto[]
}
