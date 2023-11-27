import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateUserFollowingAttributes } from './user-following.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '../../singles/User/user.model'

@Table({ tableName: 'UserFollowing' })
export class UserFollowing extends Model<
  UserFollowing,
  CreateUserFollowingAttributes
> {
  @ApiProperty({ example: 1, description: 'id of user-follower' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK to author' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number

  @ApiPropertyOptional({
    type: () => User,
    description: 'author'
  })
  @BelongsTo(() => User, 'userId')
  readonly user?: User

  @ApiProperty({ example: 1, description: 'FK to follower' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly followingUserId: number

  @ApiPropertyOptional({
    type: () => User,
    description: 'following'
  })
  @BelongsTo(() => User, 'followingUserId')
  readonly following?: User

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
