import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateQuestionAttributes } from './examination-question.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Examination } from '../Examination/examination.model'
import { ExaminationAnswer } from '../ExaminationAnswer/examination-answer.model'

@Table({ tableName: 'ExaminationQuestion' })
export class ExaminationQuestion extends Model<
  ExaminationQuestion,
  CreateQuestionAttributes
> {
  @ApiProperty({ example: 1, description: 'id of examination-question' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'How many bits are in one kilobyte',
    description: 'name of examination-question'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly name: string

  @ApiProperty({
    example: 'FK of exam',
    description: 'name of examination-question'
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
    description: 'answers of examination-question',
    type: () => ExaminationAnswer,
    isArray: true
  })
  @HasMany(() => ExaminationAnswer, 'questionId')
  readonly answers?: ExaminationAnswer[]

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
