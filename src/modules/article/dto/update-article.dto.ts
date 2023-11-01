import { IsInt, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdateArticleDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly body: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeNumber })
  readonly createdByUserId: number
}
