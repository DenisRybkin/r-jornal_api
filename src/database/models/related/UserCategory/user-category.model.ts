import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateUserCategoryAttributes } from './user-category.attributes'
import { ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { Category } from '../../singles/Category/category.model'
import { User } from '../../singles/User/user.model'

@Table({ tableName: 'UserCategory' })
export class UserCategory extends Model<
  UserCategory,
  CreateUserCategoryAttributes
> {
  @ApiProperty({ example: 1, description: 'id of category-avatar' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK to category' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly categoryId: number

  @ApiProperty({
    type: () => getSchemaPath(Category),
    description: 'category'
  })
  @BelongsTo(() => Category, 'categoryId')
  readonly category: Category

  @ApiProperty({ example: 1, description: 'FK to user' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number

  @ApiProperty({
    type: () => getSchemaPath(User),
    description: 'user'
  })
  @BelongsTo(() => User, 'userId')
  readonly user: User
}
