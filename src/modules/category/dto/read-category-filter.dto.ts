import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ReadCategoryFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
