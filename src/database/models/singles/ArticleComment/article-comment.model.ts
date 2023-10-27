import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleCommentAttributes } from './article-comment.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Article } from '../Article/article.model'
import { User } from '../User/user.model'
import { ArticleCommentStaticField } from '../../related/ArticleCommentStaticField/article-comment-static-field.model'
import { ArticleCommentReaction } from '../ArticleCommentReaction/article-comment-reaction.model'

@Table({ tableName: 'ArticleComment' })
export class ArticleComment extends Model<
  ArticleComment,
  CreateArticleCommentAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article comment' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 'Nice article!!', description: 'text of comment' })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly text: string

  @ApiProperty({ example: 1, description: 'FK of article' })
  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly articleId: number

  @ApiPropertyOptional({
    type: () => Article,
    description: 'article'
  })
  @BelongsTo(() => Article, 'articleId')
  readonly article?: Article

  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly createdByUserId: number

  @ApiPropertyOptional({
    type: User,
    description: 'author'
  })
  @BelongsTo(() => User, 'articleId')
  readonly createdByUser?: User

  @ApiPropertyOptional({
    isArray: true,
    description: 'attachments',
    type: ArticleCommentStaticField
  })
  @HasMany(() => ArticleCommentStaticField, 'commentId')
  readonly attachments?: ArticleCommentStaticField[]

  @ApiPropertyOptional({
    isArray: true,
    description: 'reactions',
    type: ArticleCommentReaction
  })
  @HasMany(() => ArticleCommentReaction, 'commentId')
  readonly reactions?: ArticleCommentReaction[]
}
