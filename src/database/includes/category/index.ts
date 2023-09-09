import { Includeable } from 'sequelize'
import { CategoryAvatar } from '../../models/related/CategoryAvatar/category-avatar.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'

export const avatarInclude: Includeable = {
  model: CategoryAvatar,
  as: 'avatar',
  include: [StaticField]
}
