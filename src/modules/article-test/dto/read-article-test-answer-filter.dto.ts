import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ReadArticleTestAnswerFilterDto {
  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly questionId?: number

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name?: string

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeBoolean })
  readonly isRight: number
}
