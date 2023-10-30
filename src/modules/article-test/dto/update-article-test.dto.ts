import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdateArticleTestDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly articleId: number
}
