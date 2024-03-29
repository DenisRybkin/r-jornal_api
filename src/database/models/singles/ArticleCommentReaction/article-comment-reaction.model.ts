import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ArticleComment } from '../ArticleComment/article-comment.model'
import { User } from '../User/user.model'
import { CreateArticleCommentReactionAttributes } from './article-comment-reaction.attributes'

@Table({ tableName: 'ArticleCommentReaction' })
export class ArticleCommentReaction extends Model<
  ArticleCommentReaction,
  CreateArticleCommentReactionAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article comment reaction' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK of author' })
  @ForeignKey(() => ArticleComment)
  @Column({ allowNull: false, type: DataType.INTEGER })
  readonly commentId: number

  @ApiPropertyOptional({
    description: 'comment',
    type: () => ArticleComment
  })
  @BelongsTo(() => ArticleComment, 'commentId')
  readonly comment?: ArticleComment

  @ApiProperty({ example: 1, description: 'FK of author' })
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  readonly userId: number

  @ApiPropertyOptional({
    description: 'user, who reacted',
    type: User
  })
  @BelongsTo(() => User, 'userId')
  readonly user?: User

  @ApiProperty({
    description: 'symbol like emoji',
    example: '😂'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly value: string

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
