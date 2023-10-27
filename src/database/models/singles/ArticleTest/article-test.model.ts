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
    type: () => ArticleTestUser
  })
  @HasMany(() => ArticleTestUser, 'testId')
  readonly usersWhoPassed?: ArticleTestUser
}
