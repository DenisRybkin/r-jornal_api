import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateArticleTestUserAttributes } from './article-test-user.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ArticleTest } from '../../singles/ArticleTest/article-test.model'
import { User } from '../../singles/User/user.model'

@Table({ tableName: 'ArticleTestUser' })
export class ArticleTestUser extends Model<
  ArticleTestUser,
  CreateArticleTestUserAttributes
> {
  @ApiProperty({ example: 1, description: 'id of article article test user' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK of test' })
  @ForeignKey(() => ArticleTest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly testId: number

  @ApiPropertyOptional({
    type: () => ArticleTest,
    description: 'passing test'
  })
  @BelongsTo(() => ArticleTest, 'testId')
  readonly test?: ArticleTest

  @ApiProperty({ example: 1, description: 'FK of user, who passed test' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number

  @ApiPropertyOptional({
    type: () => ArticleTest,
    description: 'user, who passed test'
  })
  @BelongsTo(() => User, 'userId')
  readonly user?: User
}
