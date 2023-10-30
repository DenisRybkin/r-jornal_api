import { IsInt } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class ReadArticleTestFilterDto {
  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId?: number
}
