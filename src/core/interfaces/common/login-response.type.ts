import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseType {
  @ApiProperty()
  access: string
}
