import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { UserFollowing } from '../../database/models/related/UserFollowing/user-following.model'
import { InjectModel } from '@nestjs/sequelize'
import { followingWithAvatar } from '../../database/includes/user'

@Injectable()
export class UserFollowingService extends BaseServiceCRUD<UserFollowing> {
  constructor(
    @InjectModel(UserFollowing)
    private readonly userFollowingRepository: typeof UserFollowing
  ) {
    super({
      autocompleteProperty: 'userId',
      modelRepository: userFollowingRepository,
      includes: [followingWithAvatar]
    })
  }

  async count(userId: number) {
    return this.userFollowingRepository.count({ where: { userId } })
  }
}
