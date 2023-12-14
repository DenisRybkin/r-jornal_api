import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { ReadArticleTestUserFilterDto } from './dto'
import { buildBaseControllerRead } from '../../core/bases/controllers'
import { ArticleTestUser } from '../../database/models/related/ArticleTestUser/article-test-user.model'
import { ArticleTestUserService } from './article-test-user.service'

const BaseController = buildBaseControllerRead<ArticleTestUser>({
  swagger: { model: ArticleTestUser, modelName: 'article-test-user' },
  filterDto: ReadArticleTestUserFilterDto,
  privacySettings: {
    getAllIsPublic: true,
    autocompleteIsPublic: true,
    getByIdIsPublic: true
  }
})

@ApiExtraModels(ReadArticleTestUserFilterDto)
@ApiTags('Article Test Answer')
@Controller('article-test-user')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleTestUserController extends BaseController {
  constructor(private readonly articleTestUserService: ArticleTestUserService) {
    super(articleTestUserService)
  }
}
