import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateAnswerAttributes } from './examination-answer.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ExaminationQuestion } from '../ExaminationQuestion/examination-question.model'

@Table({ tableName: 'ExaminationAnswer' })
export class ExaminationAnswer extends Model<
  ExaminationAnswer,
  CreateAnswerAttributes
> {
  @ApiProperty({ example: 1, description: 'id of examination-answer' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: '1024',
    description: 'examination-answer of examination-question'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly name: string

  @ApiProperty({
    example: 1,
    description: 'FK of examination-question'
  })
  @ForeignKey(() => ExaminationQuestion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly questionId: number

  @ApiPropertyOptional({
    type: () => ExaminationQuestion,
    description: 'question'
  })
  @BelongsTo(() => ExaminationQuestion, 'questionId')
  readonly question?: ExaminationQuestion

  @ApiProperty({
    example: true,
    description: 'field of right of examination-answer'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  readonly isRight: boolean

  @ApiProperty({
    example: '2023-11-19 23:58:11.502+03',
    description: 'date of model created'
  })
  @Column({ type: DataType.DATE, allowNull: false })
  readonly createdAt: string

  @ApiProperty({
    example: '2023-11-19 23:58:11.502+03',
    description: 'date of model updated'
  })
  @Column({ type: DataType.DATE, allowNull: false })
  readonly updatedAt: string
}
