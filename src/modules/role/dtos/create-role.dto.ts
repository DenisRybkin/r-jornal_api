import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'

export class CreateRoleDto {
  @ApiPropertyOptional({ enum: Roles })
  @IsEnum(Roles, { message: ConstraintMessagesConstants.MustBeEnum })
  readonly name: Roles

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
