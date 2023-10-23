import { ApiProperty } from '@nestjs/swagger'
import { UserFollowing } from '../../../database/models/related/UserFollowing/user-following.model'
import { UserFollower } from '../../../database/models/related/UserFollower/user-follower.model'

export class FollowDto {
  @ApiProperty()
  readonly userFollowing: UserFollowing

  @ApiProperty()
  readonly userFollower: UserFollower
}
