import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleTestAnswerAttributes } from './article-test-answer.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ExaminationQuestion } from '../ExaminationQuestion/examination-question.model'
import { ArticleTestQuestion } from '../ArticleTestQuestion/article-test-question.model'

@Table({ tableName: 'ArticleTestAnswer' })
export class ArticleTestAnswer extends Model<
  ArticleTestAnswer,
  CreateArticleTestAnswerAttributes
> {
  @ApiProperty({ example: 1, description: 'id of test answer' })
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
  @ForeignKey(() => ArticleTestQuestion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly questionId: number

  @ApiPropertyOptional({
    type: () => ArticleTestQuestion,
    description: 'question'
  })
  @BelongsTo(() => ExaminationQuestion, 'questionId')
  readonly question?: ArticleTestQuestion

  @ApiProperty({
    example: true,
    description: 'field of right of answer'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  readonly isRight: boolean
}
