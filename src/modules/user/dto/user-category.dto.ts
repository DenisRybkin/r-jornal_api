import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UserCategoryDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  categoryId: number
}
