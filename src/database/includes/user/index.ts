import { Includeable } from 'sequelize'
import { Role } from '../../models/singles/Role/role.model'
import { UserAvatar } from '../../models/related/UserAvatar/user-avatar.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'
import { UserCategory } from '../../models/related/UserCategory/user-category.model'
import { Category } from '../../models/singles/Category/category.model'
import { avatarInclude as categoryAvatarInclude } from '../category'

export const roleInclude: Includeable = {
  model: Role,
  as: 'role'
}
export const avatarInclude: Includeable = {
  model: UserAvatar,
  as: 'userAvatar',
  include: [StaticField]
}

export const defaultAvatarInclude: Includeable = {
  model: StaticField,
  as: 'defaultAvatar'
}

export const categoryInclude: Includeable = {
  model: UserCategory,
  as: 'userCategory',
  include: [
    {
      model: Category,
      as: 'category',
      include: [categoryAvatarInclude]
    }
  ]
}
