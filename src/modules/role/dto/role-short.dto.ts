import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'
import { ModelWithId } from 'src/core/interfaces/rest/model-with-id.interface'

export class RoleShort implements ModelWithId {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiProperty({ enum: Roles })
  @IsEnum(Roles, { message: ConstraintMessagesConstants.MustBeEnum })
  readonly name: Roles

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
