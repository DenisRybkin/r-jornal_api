import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { CreateRoleAttributes } from './role.attributes';
import { RolesType } from '../../../../core/interfaces/common';

@Table({ tableName: 'roles', createdAt: true, updatedAt: true })
export class Role extends Model<Role, CreateRoleAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  readonly id: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(RolesType) }),
    unique: true,
    allowNull: false,
    defaultValue: RolesType.User,
  })
  readonly name: RolesType;

  @Column({ type: DataType.STRING, defaultValue: null, validate: { max: 64 } })
  readonly description: string | null;
}
