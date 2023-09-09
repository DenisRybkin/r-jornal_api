import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdatePartiallyCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string
}
