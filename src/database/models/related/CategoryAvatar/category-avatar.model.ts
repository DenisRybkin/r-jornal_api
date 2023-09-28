import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateCategoryAvatarAttributes } from './category-avatar.attributes'
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath
} from '@nestjs/swagger'
import { StaticField } from '../../singles/StaticField/static-field.model'
import { Category } from '../../singles/Category/category.model'

@Table({ tableName: 'CategoryAvatar' })
export class CategoryAvatar extends Model<
  CategoryAvatar,
  CreateCategoryAvatarAttributes
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
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly categoryId: number

  @ApiPropertyOptional({
    type: () => Category,
    description: 'category'
  })
  @BelongsTo(() => Category, 'categoryId')
  readonly category?: Category

  @ApiProperty({ example: 1, description: 'FK to static-field' })
  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly staticFieldId: number

  @ApiPropertyOptional({
    type: () => StaticField,
    description: 'avatar (static-field)'
  })
  @BelongsTo(() => StaticField, 'staticFieldId')
  readonly staticField?: StaticField
}
