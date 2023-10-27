import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleHashtagAttributes } from './article-hashtag.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Hashtag } from '../../singles/Hashtag/hashtag.model'
import { Article } from '../../singles/Article/article.model'

@Table({ tableName: 'ArticleHashtag' })
export class ArticleHashtag extends Model<
  ArticleHashtag,
  CreateArticleHashtagAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article hashtag' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK of hashtag' })
  @ForeignKey(() => Hashtag)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly hashtagId: number

  @ApiPropertyOptional({
    type: Hashtag,
    description: 'hashtag'
  })
  @BelongsTo(() => Hashtag, 'hashtagId')
  readonly hashtag?: Hashtag

  @ApiProperty({ example: 1, description: 'FK of article' })
  @ForeignKey(() => Hashtag)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly articleId: number

  @ApiPropertyOptional({
    type: () => Article,
    description: 'article'
  })
  @BelongsTo(() => Article, 'articleId')
  readonly article?: Article
}
