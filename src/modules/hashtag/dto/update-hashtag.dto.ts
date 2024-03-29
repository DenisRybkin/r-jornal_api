import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateHashtagDto {
  @ApiProperty()
  @IsString()
  readonly name: string
}
