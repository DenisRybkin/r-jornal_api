import { InjectModel } from '@nestjs/sequelize'
import { Injectable, Logger } from '@nestjs/common'
import { UserFollower } from '../../database/models/related/UserFollower/user-follower.model'
import { BaseServiceCRUD } from '../../core/bases/services'
import { followerWithAvatarInclude } from '../../database/includes/user'

@Injectable()
export class UserFollowerService extends BaseServiceCRUD<UserFollower> {
  constructor(
    @InjectModel(UserFollower)
    private readonly userFollowerRepository: typeof UserFollower // @InjectModel(UserFollowing) // private readonly userFollowingRepository: typeof UserFollowing
  ) {
    super(
      {
        autocompleteProperty: 'userId',
        modelRepository: userFollowerRepository,
        includes: [followerWithAvatarInclude]
      },
      new Logger(UserFollowerService.name)
    )
  }

  async count(userId: number) {
    return this.userFollowerRepository.count({ where: { userId } })
  }
}
