import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdatePartiallyArticleTestDto {
  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId?: number
}
