import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import {
  CreateArticleTestAnswerDto,
  ReadArticleTestAnswerFilterDto,
  UpdateArticleTestAnswerDto,
  UpdatePartiallyArticleTestAnswerDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ArticleTestAnswer } from '../../database/models/singles/ArticleTestAnswer/article-test-answer.model'
import { Roles } from '../../core/interfaces/common'
import { ArticleTestAnswerService } from './article-test-answer.service'

const BaseController = buildBaseControllerCRUD<ArticleTestAnswer>({
  swagger: { model: ArticleTestAnswer, modelName: 'article test answer' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    createRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    updateRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    deleteRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  },
  filterDto: ReadArticleTestAnswerFilterDto,
  createDto: CreateArticleTestAnswerDto,
  updateDto: UpdateArticleTestAnswerDto,
  updatePartiallyDto: UpdatePartiallyArticleTestAnswerDto
})

@ApiExtraModels(
  CreateArticleTestAnswerDto,
  UpdateArticleTestAnswerDto,
  UpdatePartiallyArticleTestAnswerDto,
  ReadArticleTestAnswerFilterDto
)
@ApiTags('Article Test Answer')
@Controller('article-test-answer')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleTestAnswerController extends BaseController {
  constructor(
    private readonly articleTestAnswerService: ArticleTestAnswerService
  ) {
    super(articleTestAnswerService)
  }
}
