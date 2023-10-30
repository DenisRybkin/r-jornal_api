import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import {
  CreateArticleTestQuestionDto,
  ReadArticleTestQuestionFilterDto,
  UpdateArticleTestQuestionDto,
  UpdatePartiallyArticleTestQuestionDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ArticleTestQuestion } from '../../database/models/singles/ArticleTestQuestion/article-test-question.model'
import { Roles } from '../../core/interfaces/common'
import { ArticleTestQuestionService } from './article-test-question.service'

const BaseController = buildBaseControllerCRUD<ArticleTestQuestion>({
  swagger: { model: ArticleTestQuestion, modelName: 'article test question' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    createRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    updateRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    deleteRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  },
  filterDto: ReadArticleTestQuestionFilterDto,
  createDto: CreateArticleTestQuestionDto,
  updateDto: UpdateArticleTestQuestionDto,
  updatePartiallyDto: UpdatePartiallyArticleTestQuestionDto
})

@ApiExtraModels(
  CreateArticleTestQuestionDto,
  UpdateArticleTestQuestionDto,
  UpdatePartiallyArticleTestQuestionDto,
  ReadArticleTestQuestionFilterDto
)
@ApiTags('Article Test Question')
@Controller('article-test-question')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleTestQuestionController extends BaseController {
  constructor(
    private readonly articleTestQuestionService: ArticleTestQuestionService
  ) {
    super(articleTestQuestionService)
  }
}
