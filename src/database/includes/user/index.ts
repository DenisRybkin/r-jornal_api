import { Includeable } from 'sequelize'
import { Role } from '../../models/singles/Role/role.model'
import { UserAvatar } from '../../models/related/UserAvatar/user-avatar.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'
import { UserCategory } from '../../models/related/UserCategory/user-category.model'
import { Category } from '../../models/singles/Category/category.model'
import { avatarInclude as categoryAvatarInclude } from '../category'
import { UserAchievement } from '../../models/related/UserAchievement/user-achievement.model'
import { Achievement } from '../../models/singles/Achievement/achievement.model'

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

export const categoriesInclude: Includeable = {
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

export const achievementsInclude: Includeable = {
  model: UserAchievement,
  as: 'userAchievements',
  include: [
    {
      model: Achievement,
      as: 'achievement'
    }
  ]
}
