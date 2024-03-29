import { Includeable } from 'sequelize'
import { Role } from '../../models/singles/Role/role.model'
import { UserAvatar } from '../../models/related/UserAvatar/user-avatar.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'
import { UserCategory } from '../../models/related/UserCategory/user-category.model'
import { Category } from '../../models/singles/Category/category.model'
import { avatarInclude as categoryAvatarInclude } from '../category'
import { UserAchievement } from '../../models/related/UserAchievement/user-achievement.model'
import { Achievement } from '../../models/singles/Achievement/achievement.model'
import { UserFollowing } from '../../models/related/UserFollowing/user-following.model'
import { User } from '../../models/singles/User/user.model'
import { UserFollower } from '../../models/related/UserFollower/user-follower.model'

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

export const achievementInclude: Includeable = {
  model: Achievement,
  as: 'achievement'
}

export const achievementsInclude: Includeable = {
  model: UserAchievement,
  as: 'userAchievements',
  include: [achievementInclude]
}

export const followingInclude: Includeable = {
  model: User,
  as: 'following'
}

export const followingWithAvatar: Includeable = {
  model: User,
  as: 'following',
  include: [defaultAvatarInclude, avatarInclude]
}

export const followingsInclude: Includeable = {
  model: UserFollowing,
  as: 'userFollowings',
  include: [followingInclude]
}

export const followerInclude: Includeable = {
  model: User,
  as: 'follower'
}

export const followerWithAvatarInclude: Includeable = {
  model: User,
  as: 'follower',
  include: [defaultAvatarInclude, avatarInclude]
}

export const followersInclude: Includeable = {
  model: UserFollower,
  as: 'userFollowers',
  include: [followerInclude]
}
