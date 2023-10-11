import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdatePartiallyCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
