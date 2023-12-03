import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexCreateArticleTestAnswerDto } from './complex-create-article-test-answer.dto'
import { Type } from 'class-transformer'

export class ComplexCreateArticleTestQuestionDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty({
    type: ComplexCreateArticleTestAnswerDto,
    isArray: true
  })
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ValidateNested({
    each: true,
    message: 'invalid ComplexCreateArticleTestAnswerDto'
  })
  @Type(() => ComplexCreateArticleTestAnswerDto)
  readonly answers: ComplexCreateArticleTestAnswerDto[]
}
