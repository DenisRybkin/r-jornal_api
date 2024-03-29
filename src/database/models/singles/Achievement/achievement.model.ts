import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { CreateAchievementAttributes } from './achievement.attributes'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'Achievement' })
export class Achievement extends Model<
  Achievement,
  CreateAchievementAttributes
> {
  @ApiProperty({ example: 1, description: 'id of achievement' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'The master',
    description: 'name of achievement'
  })
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  readonly name: string

  @ApiProperty({
    example: 250,
    description: 'required points to get student achievement'
  })
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  readonly requiredPoints: number

  @ApiProperty({
    example: 2,
    description: 'level of achievement'
  })
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  readonly level: number

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
