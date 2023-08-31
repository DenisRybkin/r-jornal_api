import { IsEmail, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class LoginDto {
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @IsEmail({}, { message: ConstraintMessagesConstants.MustBeEmail })
  readonly email: string

  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly password: string
}
