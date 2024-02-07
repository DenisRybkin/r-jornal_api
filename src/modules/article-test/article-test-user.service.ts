import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleTestUser } from '../../database/models/related/ArticleTestUser/article-test-user.model'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { includeUsers } from '../../database/includes/article-test'

@Injectable()
export class ArticleTestUserService extends BaseServiceCRUD<ArticleTestUser> {
  constructor(
    @InjectModel(ArticleTestUser)
    private readonly articleTestUserRepository: typeof ArticleTestUser
  ) {
    super(
      {
        modelRepository: ArticleTestUser,
        autocompleteProperty: 'testId',
        includes: [includeUsers]
      },
      new Logger(ArticleTestUserService.name)
    )
  }
}
