import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateArticleDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly body: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeNumber })
  readonly createdByUserId: number
}
