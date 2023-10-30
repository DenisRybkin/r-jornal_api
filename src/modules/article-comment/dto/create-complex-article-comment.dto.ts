import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateComplexArticleCommentDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly text: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId: number

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(1, {
    message: ConstraintMessagesConstants.MustBeNumber,
    each: true
  })
  readonly staticFieldIds: number[]
}
