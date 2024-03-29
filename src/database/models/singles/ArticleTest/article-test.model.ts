import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleTestAttributes } from './article-test.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Article } from '../Article/article.model'
import { ArticleTestUser } from '../../related/ArticleTestUser/article-test-user.model'
import { ArticleTestQuestion } from '../ArticleTestQuestion/article-test-question.model'

@Table({ tableName: 'ArticleTest' })
export class ArticleTest extends Model<
  ArticleTest,
  CreateArticleTestAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article test' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ForeignKey(() => Article)
  @Column({ allowNull: false, type: DataType.INTEGER })
  readonly articleId: number

  @ApiPropertyOptional({
    description: 'Article',
    type: () => Article
  })
  @BelongsTo(() => Article, 'articleId')
  readonly article?: Article

  @ApiPropertyOptional({
    description: 'user, who passed test',
    type: () => ArticleTestUser,
    isArray: true
  })
  @HasMany(() => ArticleTestUser, 'testId')
  readonly usersWhoPassed?: ArticleTestUser[]

  @ApiPropertyOptional({
    description: 'questions',
    type: () => ArticleTestQuestion,
    isArray: true
  })
  @HasMany(() => ArticleTestQuestion, 'testId')
  readonly questions: ArticleTestQuestion

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
