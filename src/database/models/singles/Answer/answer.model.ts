import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateAnswerAttributes } from './answer.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Question } from '../Question/question.model'

@Table({ tableName: 'Answer' })
export class Answer extends Model<Answer, CreateAnswerAttributes> {
  @ApiProperty({ example: 1, description: 'id of answer' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: '1024',
    description: 'answer of question'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly name: string

  @ApiProperty({
    example: 1,
    description: 'FK of question'
  })
  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly questionId: number

  @ApiPropertyOptional({
    type: () => Question,
    description: 'question'
  })
  @BelongsTo(() => Question, 'questionId')
  readonly question?: Question

  @ApiProperty({
    example: true,
    description: 'field of right of answer'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  readonly isRight: boolean
}
