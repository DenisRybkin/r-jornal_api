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
}
