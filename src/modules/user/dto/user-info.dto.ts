import { ApiProperty } from '@nestjs/swagger'
import { UserShortDto } from './user-short.dto'

export class UserInfoDto extends UserShortDto {
  @ApiProperty()
  readonly countFollowers: number

  @ApiProperty()
  readonly countFollowings: number

  // @ApiProperty({ type: UserCategory, isArray: true })
  // readonly favoriteCategories: UserCategory[]
}
