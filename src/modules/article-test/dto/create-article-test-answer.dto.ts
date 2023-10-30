import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateArticleTestAnswerDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty()
  @IsBoolean({ message: ConstraintMessagesConstants.MustBeBoolean })
  readonly isRight: boolean

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly questionId: number
}
