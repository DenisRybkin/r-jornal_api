import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { Roles } from '../../../../core/interfaces/common'
import { CreateRoleAttributes } from './role.attributes'

@Table({ tableName: 'Role' })
export class Role extends Model<Role, CreateRoleAttributes> {
  @ApiProperty({ example: 1, description: 'id of role' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'admin',
    description: 'name of role',
    enum: Roles
  })
  @Column({
    type: DataType.ENUM({ values: Object.values(Roles) }),
    unique: true,
    allowNull: false,
    defaultValue: Roles.User
  })
  readonly name: Roles

  @ApiProperty({
    example: 'Administration of platform',
    description: 'description of model'
  })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
    validate: { len: [5, 50] }
  })
  readonly description: string | null

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
