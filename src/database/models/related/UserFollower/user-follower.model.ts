import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateUserFollowerAttributes } from './user-following.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '../../singles/User/user.model'

@Table({ tableName: 'UserFollower' })
export class UserFollower extends Model<
  UserFollower,
  CreateUserFollowerAttributes
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
  readonly followerUserId: number

  @ApiPropertyOptional({
    type: () => User,
    description: 'follower'
  })
  @BelongsTo(() => User, 'followerUserId')
  readonly follower?: User
}
