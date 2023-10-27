import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleLikeAttributes } from './article-like.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Article } from '../../singles/Article/article.model'
import { User } from '../../singles/User/user.model'

@Table({ tableName: 'ArticleLike' })
export class ArticleLike extends Model<
  ArticleLike,
  CreateArticleLikeAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article like' })
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

  @ApiProperty({ example: 1, description: 'FK of user liked' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number

  @ApiPropertyOptional({ description: 'author', type: User })
  @BelongsTo(() => User, 'userId')
  readonly user?: User
}
