import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdatePartiallyArticleTestAnswerDto {
  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name?: string

  @ApiPropertyOptional()
  @IsBoolean({ message: ConstraintMessagesConstants.MustBeBoolean })
  readonly isRight?: boolean

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly questionId?: number
}
