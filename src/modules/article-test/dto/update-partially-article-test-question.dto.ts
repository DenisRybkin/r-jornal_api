import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdatePartiallyArticleTestQuestionDto {
  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly testId?: number

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name?: string
}
