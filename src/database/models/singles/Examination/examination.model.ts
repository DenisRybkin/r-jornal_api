import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateExaminationAttributes } from './examination.attributes'
import { ApiProperty } from '@nestjs/swagger'
import { Question } from '../Question/question.model'
import { Role } from '../Role/role.model'

@Table({ tableName: 'Examination' })
export class Examination extends Model<
  Examination,
  CreateExaminationAttributes
> {
  @ApiProperty({ example: 1, description: 'id of examination' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'Examination to editor role',
    description: 'Title of examination'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly title: string

  @ApiProperty({
    example: 'To get the role of editor, take the examination',
    description: 'Description of examination'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly description: string

  @ApiProperty({
    example: 2,
    description:
      'The role id that the user will receive in case of successful completion of the exam'
  })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly certificateRoleId: number

  @ApiProperty({
    type: Role,
    description:
      'The role that the user will receive in case of successful completion of the exam'
  })
  @BelongsTo(() => Role, 'certificateRoleId')
  readonly certificateRole: Role

  @ApiProperty({
    description: 'questions of exam',
    type: () => Question,
    isArray: true
  })
  @HasMany(() => Question, 'examinationId')
  readonly questions: Question[]
}
