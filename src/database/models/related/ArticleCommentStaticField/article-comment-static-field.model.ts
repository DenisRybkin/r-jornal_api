import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleCommentStaticFieldAttributes } from './article-comment-static-field.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ArticleComment } from '../../singles/ArticleComment/article-comment.model'
import { StaticField } from '../../singles/StaticField/static-field.model'

@Table({ tableName: 'ArticleCommentStaticField' })
export class ArticleCommentStaticField extends Model<
  ArticleCommentStaticField,
  CreateArticleCommentStaticFieldAttributes
> {
  @ApiProperty({ example: 1, description: 'id of test examination-answer' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK of comment' })
  @ForeignKey(() => ArticleComment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly commentId: number

  @ApiPropertyOptional({ description: 'comment', type: () => ArticleComment })
  @BelongsTo(() => ArticleComment, 'commentId')
  readonly comment?: ArticleComment

  @ApiProperty({ example: 1, description: 'FK of static field' })
  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly staticFieldId: number

  @ApiPropertyOptional({
    description: 'static field',
    type: StaticField
  })
  @BelongsTo(() => StaticField, 'staticFieldId')
  readonly staticField: StaticField
}
