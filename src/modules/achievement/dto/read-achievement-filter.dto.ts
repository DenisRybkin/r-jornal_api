import { IsInt, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class ReadAchievementFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly requiredPoints?: number

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly level: number
}
