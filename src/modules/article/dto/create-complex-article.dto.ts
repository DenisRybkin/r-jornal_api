import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexCreateArticleTestQuestionDto } from '../../article-test/dto'
import { Type } from 'class-transformer'

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
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { each: true, message: ConstraintMessagesConstants.MustBeIntArray }
  )
  readonly categoryIds: number[]

  @ApiPropertyOptional({ isArray: true, type: Number })
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { each: true, message: ConstraintMessagesConstants.MustBeIntArray }
  )
  readonly hashtagIds?: number[]

  @ApiPropertyOptional({
    type: ComplexCreateArticleTestQuestionDto,
    isArray: true
  })
  @IsOptional()
  @IsArray({ message: ConstraintMessagesConstants.MustBeArray })
  @ValidateNested({
    each: true,
    message: 'invalid ComplexCreateArticleTestQuestionDto'
  })
  @Type(() => ComplexCreateArticleTestQuestionDto)
  readonly questions?: ComplexCreateArticleTestQuestionDto[]
}
