import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdateComplexArticleDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly body: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly previewId?: number

  @ApiPropertyOptional({ isArray: true, type: Number })
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { each: true, message: ConstraintMessagesConstants.MustBeIntArray }
  )
  readonly categoryIds?: number[]

  @ApiPropertyOptional({ isArray: true, type: Number })
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { each: true, message: ConstraintMessagesConstants.MustBeIntArray }
  )
  readonly hashtagIds?: number[]
}
