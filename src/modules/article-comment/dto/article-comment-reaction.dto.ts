import { IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ArticleCommentReactionDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @MaxLength(2)
  readonly value: string
}
