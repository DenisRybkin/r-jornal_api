import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ReadArticleTestUserFilterDto {
  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly testId?: number

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly userId?: number
}
