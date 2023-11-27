import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleTestQuestionAttributes } from './article-test-question.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ArticleTest } from '../ArticleTest/article-test.model'
import { ArticleTestAnswer } from '../ArticleTestAnswer/article-test-answer.model'

@Table({ tableName: 'ArticleTestQuestion' })
export class ArticleTestQuestion extends Model<
  ArticleTestQuestion,
  CreateArticleTestQuestionAttributes
> {
  @ApiProperty({ example: 1, description: 'id of test examination-question' })
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
    example: 1,
    description: 'FK of ArticleTest'
  })
  @ForeignKey(() => ArticleTest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly testId: number

  @ApiPropertyOptional({
    description: 'test of this examination-question',
    type: () => ArticleTest
  })
  @BelongsTo(() => ArticleTest, 'testId')
  readonly test?: ArticleTest

  @ApiPropertyOptional({
    description: 'answers of examination-question',
    type: () => ArticleTestAnswer,
    isArray: true
  })
  @HasMany(() => ArticleTestAnswer, 'questionId')
  readonly answers?: ArticleTestAnswer[]

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
