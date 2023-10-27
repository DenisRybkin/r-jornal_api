import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleRepostAttributes } from './article-repost.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '../../singles/User/user.model'
import { Article } from '../../singles/Article/article.model'

@Table({ tableName: 'ArticleRepost' })
export class ArticleRepost extends Model<
  ArticleRepost,
  CreateArticleRepostAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article repost' })
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

  @ApiProperty({ example: 1, description: 'FK of user reposted' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number

  @ApiPropertyOptional({ description: 'author', type: User })
  @BelongsTo(() => User, 'userId')
  readonly user?: User
}
