import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { CloudFoldersConstants } from '../constants/cloud-folders.constants'

export class ReadStaticFieldFilterDto {
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
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly originalname?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly type?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly url?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(CloudFoldersConstants, {
    message: ConstraintMessagesConstants.MustBeString
  })
  readonly folder?: CloudFoldersConstants
}
