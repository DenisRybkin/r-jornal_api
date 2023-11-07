import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString
} from 'class-validator'
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
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ArrayMinSize(1)
  readonly staticFieldIds: number[]
}
