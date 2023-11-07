import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateComplexArticleDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly body: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly previewId?: number

  @ApiProperty({ isArray: true, type: Number })
  @MinLength(1, { each: true })
  readonly categoryIds: number[]

  @ApiPropertyOptional({ isArray: true, type: Number })
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ArrayMinSize(1)
  readonly hashtagIds?: number[]
}
