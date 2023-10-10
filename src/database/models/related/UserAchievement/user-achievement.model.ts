import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateUserAchievementAttributes } from './user-achievement.attributes'
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath
} from '@nestjs/swagger'
import { User } from '../../singles/User/user.model'
import { Achievement } from '../../singles/Achievement/achievement.model'
import { Category } from '../../singles/Category/category.model'

@Table({ tableName: 'UserAchievement' })
export class UserAchievement extends Model<
  UserAchievement,
  CreateUserAchievementAttributes
> {
  @ApiProperty({ example: 1, description: 'id of user-achievement' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK to user' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number

  @ApiPropertyOptional({
    type: () => getSchemaPath(User),
    description: 'user'
  })
  @BelongsTo(() => User, 'userId')
  readonly user?: User

  @ApiProperty({ example: 1, description: 'FK to achievement' })
  @ForeignKey(() => Achievement)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly achievementId: number

  @BelongsTo(() => Achievement, 'achievementId')
  readonly achievement: Achievement

  @ApiProperty({
    example: 1,
    description: 'Category by achievement'
  })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly categoryId: number

  @ApiProperty({
    type: Category,
    description: 'Category by achievement'
  })
  @BelongsTo(() => Category, 'categoryId')
  readonly category?: Category

  @ApiProperty({
    example: 1,
    description: 'current points of user'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userPoints: number
}
