import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, MinLength, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexUpdateArticleTestAnswerDto } from './complex-update-article-test-answer.dto'

export class ComplexUpdateArticleTestQuestionDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly testId: number

  @ApiProperty({
    type: ComplexUpdateArticleTestAnswerDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly answers: ComplexUpdateArticleTestAnswerDto[]
}
