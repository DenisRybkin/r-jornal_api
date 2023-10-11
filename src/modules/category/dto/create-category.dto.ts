import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateCategoryDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
