import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateQuestionAttributes } from './question.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Examination } from '../Examination/examination.model'
import { Answer } from '../Answer/answer.model'

@Table({ tableName: 'Question' })
export class Question extends Model<Question, CreateQuestionAttributes> {
  @ApiProperty({ example: 1, description: 'id of quest' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'How many bits are in one kilobyte',
    description: 'name of question'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly name: string

  @ApiProperty({
    example: 'FK of exam',
    description: 'name of question'
  })
  @ForeignKey(() => Examination)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly examinationId: number

  @ApiPropertyOptional({
    description: 'examination',
    type: () => Examination
  })
  @BelongsTo(() => Examination, 'examinationId')
  readonly examination?: Examination

  @ApiPropertyOptional({
    description: 'answers of question',
    type: () => Answer,
    isArray: true
  })
  @HasMany(() => Answer, 'questionId')
  readonly answers?: Answer[]
}