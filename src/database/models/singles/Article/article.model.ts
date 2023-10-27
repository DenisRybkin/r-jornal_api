import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleAttributes } from './article.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '../User/user.model'
import { ArticleTest } from '../ArticleTest/article-test.model'
import { ArticleComment } from '../ArticleComment/article-comment.model'
import { ArticleLike } from '../../related/ArticleLike/article-like.model'
import { ArticleRepost } from '../../related/ArticleRepost/article-repost.model'
import { ArticleCategory } from '../../related/ArticleCategory/article-category.model'
import { ArticleStaticField } from '../../related/ArticleStaticField/article-static-field.model'
import { ArticleHashtag } from '../../related/ArticleHashtag/article-hashtag.model'

@Table({ tableName: 'Article' })
export class Article extends Model<Article, CreateArticleAttributes> {
  @ApiProperty({ example: 1, description: 'id of article' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ description: 'stringify JSON of editorJS type' })
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  readonly body: string

  @ApiProperty({ example: 1, description: 'FK of author' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly createdByUserId: number

  @ApiPropertyOptional({ description: 'author', type: User })
  @BelongsTo(() => User, 'createdByUserId')
  readonly createdByUser?: User

  @ApiPropertyOptional({
    description: 'test of this article',
    type: ArticleTest
  })
  @HasOne(() => ArticleTest, 'articleId')
  readonly test?: ArticleTest

  @ApiPropertyOptional({
    type: ArticleComment,
    description: 'comments of this article',
    isArray: true
  })
  @HasMany(() => ArticleComment, 'articleId')
  readonly comments?: ArticleComment[]

  @ApiPropertyOptional({
    type: ArticleComment,
    description: 'likes of this article',
    isArray: true
  })
  @HasMany(() => ArticleLike, 'articleId')
  readonly likes?: ArticleLike[]

  @ApiPropertyOptional({
    type: ArticleRepost,
    description: 'reposts of this article',
    isArray: true
  })
  @HasMany(() => ArticleRepost, 'articleId')
  readonly reposts?: ArticleRepost[]

  @ApiPropertyOptional({
    type: ArticleRepost,
    description: 'categories of this article',
    isArray: true
  })
  @HasMany(() => ArticleRepost, 'articleId')
  readonly categories?: ArticleCategory

  @ApiPropertyOptional({
    type: ArticleStaticField,
    description: 'preview of this article'
  })
  @HasOne(() => ArticleStaticField, 'articleId')
  readonly preview?: ArticleStaticField

  @ApiPropertyOptional({
    type: ArticleHashtag,
    description: 'hashtags',
    isArray: true
  })
  @HasMany(() => ArticleHashtag, 'articleId')
  readonly hashtags?: ArticleHashtag
}
