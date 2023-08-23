import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'
import { ModelWithId } from 'src/core/interfaces/rest/model-with-id.interface'

export class RoleShort implements ModelWithId {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiPropertyOptional({ enum: Roles })
  @IsOptional()
  @IsEnum(Roles, { message: ConstraintMessagesConstants.MustBeEnum })
  readonly name: Roles

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
