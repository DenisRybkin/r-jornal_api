import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ReadStaticFieldFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name?: string

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly originalname?: string

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly type?: string

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly url?: string
}
