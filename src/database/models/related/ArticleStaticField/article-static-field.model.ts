import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleStaticFieldAttributes } from './article-static-field.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Article } from '../../singles/Article/article.model'
import { StaticField } from '../../singles/StaticField/static-field.model'

@Table({ tableName: 'ArticleStaticField' })
export class ArticleStaticField extends Model<
  ArticleStaticField,
  CreateArticleStaticFieldAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article category' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK of article' })
  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly articleId: number

  @ApiPropertyOptional({
    description: 'article',
    type: () => Article
  })
  @BelongsTo(() => Article, 'articleId')
  readonly article?: Article

  @ApiProperty({ example: 1, description: 'FK of article static field' })
  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly staticFieldId: number

  @ApiPropertyOptional({
    description: 'static field (preview)',
    type: StaticField
  })
  @BelongsTo(() => StaticField, 'staticFieldId')
  readonly staticField?: StaticField
}
