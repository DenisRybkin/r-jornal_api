import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleRepostAttributes } from './article-category.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Article } from '../../singles/Article/article.model'
import { Category } from '../../singles/Category/category.model'

@Table({ tableName: 'ArticleCategory' })
export class ArticleCategory extends Model<
  ArticleCategory,
  CreateArticleRepostAttributes
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

  @ApiProperty({ example: 1, description: 'FK of article category' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly categoryId: number

  @ApiPropertyOptional({ description: 'category', type: Category })
  @BelongsTo(() => Category, 'categoryId')
  readonly category?: Category

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
