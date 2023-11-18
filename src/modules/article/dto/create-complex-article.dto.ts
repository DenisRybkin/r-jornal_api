import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
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
  @IsArray({ message: ConstraintMessagesConstants.MustBeIntArray })
  @ArrayMinSize(1)
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  readonly categoryIds: number[]

  @ApiPropertyOptional({ isArray: true, type: Number })
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ArrayMinSize(1)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { each: true, message: ConstraintMessagesConstants.MustBeIntArray }
  )
  readonly hashtagIds?: number[]
}
