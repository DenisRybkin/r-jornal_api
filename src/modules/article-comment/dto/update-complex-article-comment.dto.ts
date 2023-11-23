import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdateComplexArticleCommentDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly text: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ArrayMinSize(1)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { each: true, message: ConstraintMessagesConstants.MustBeIntArray }
  )
  readonly staticFieldIds?: number[]
}
