import { IsInt, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ApiProperty } from '@nestjs/swagger'

export class ReadAchievementFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name?: string

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly requiredPoints?: number

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly level: number
}
