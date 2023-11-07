import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleTestUser } from '../../database/models/related/ArticleTestUser/article-test-user.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleTestUserService extends BaseServiceCRUD<ArticleTestUser> {
  constructor(
    @InjectModel(ArticleTestUser)
    private readonly articleTestUserRepository: typeof ArticleTestUser
  ) {
    super({
      modelRepository: ArticleTestUser,
      autocompleteProperty: 'testId',
      includes: []
    })
  }
}