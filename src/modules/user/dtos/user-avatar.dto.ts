import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserAvatarDto {
  @ApiProperty()
  @IsInt()
  readonly staticFieldId: number
}
