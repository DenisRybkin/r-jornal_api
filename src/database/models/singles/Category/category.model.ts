import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { CreateCategoryAttributes } from './category.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CategoryAvatar } from '../../related/CategoryAvatar/category-avatar.model'

@Table({ tableName: 'Category' })
export class Category extends Model<Category, CreateCategoryAttributes> {
  @ApiProperty({ example: 1, description: 'id of category' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'JavaScript development',
    description: 'name of category'
  })
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  readonly name: string

  @ApiProperty({
    example: 'Web frontend ES6 development',
    description: 'description of category'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly description: string

  @ApiPropertyOptional({
    description: 'avatar',
    type: CategoryAvatar
  })
  @HasOne(() => CategoryAvatar, 'categoryId')
  readonly avatar: CategoryAvatar

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
