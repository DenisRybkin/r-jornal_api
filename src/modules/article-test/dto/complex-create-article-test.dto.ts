import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
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
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ValidateNested({
    each: true,
    message: 'invalid ComplexCreateArticleTestQuestionDto'
  })
  @Type(() => ComplexCreateArticleTestQuestionDto)
  readonly questions: ComplexCreateArticleTestQuestionDto[]
}
