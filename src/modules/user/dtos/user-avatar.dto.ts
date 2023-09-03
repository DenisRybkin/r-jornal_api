import { IsInt } from 'class-validator'

export class CreateUserAvatarDto {
  @IsInt()
  readonly staticFieldId: number
}
