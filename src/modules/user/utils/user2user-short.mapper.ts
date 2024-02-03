import { User } from '../../../database/models/singles/User/user.model'
import { UserShortDto } from '../dto'

export const user2userShortMapper = (user: User): UserShortDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  nickname: user.nickname,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  role: user!.role!,
  userAvatar: user.userAvatar,
  defaultAvatar: user.defaultAvatar,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
})
