import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, Length } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { IsUnique, UniqueValidator } from '../../../core/decorators'
import { User } from '../../../database/models/singles/User/user.model'

export class UpdatePartiallyUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @Length(3, 12)
  readonly nickname: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @Length(3, 15)
  readonly name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @IsEmail({}, { message: ConstraintMessagesConstants.MustBeEmail })
  @IsUnique(UniqueValidator, [User])
  readonly email: string
}
