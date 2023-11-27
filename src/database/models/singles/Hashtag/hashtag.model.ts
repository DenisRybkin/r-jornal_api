import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { CreateHashtagAttributes } from './hashtag.attributes'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'Hashtag' })
export class Hashtag extends Model<Hashtag, CreateHashtagAttributes> {
  @ApiProperty({ example: 1, description: 'id of hashtag' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ description: 'text of hashtag', example: 'RESTfull api' })
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  readonly name: string

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
