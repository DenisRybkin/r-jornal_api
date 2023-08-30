import { Includeable } from 'sequelize'
import { Role } from '../../models/singles/Role/role.model'

export const roleInclude: Includeable = {
  model: Role,
  as: 'role'
}
