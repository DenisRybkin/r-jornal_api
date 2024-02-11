import { ApiProperty } from '@nestjs/swagger'
import { UserShortDto } from './user-short.dto'
import { UserAchievement } from '../../../database/models/related/UserAchievement/user-achievement.model'

export class UserInfoDto extends UserShortDto {
  @ApiProperty()
  readonly countFollowers: number

  @ApiProperty()
  readonly countFollowings: number

  @ApiProperty({ type: UserAchievement, isArray: true })
  readonly achievements: UserAchievement[]

  // @ApiProperty({ type: UserCategory, isArray: true })
  // readonly favoriteCategories: UserCategory[]
}
