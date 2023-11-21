import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { buildBaseControllerReadShort } from '../../core/bases/controllers'
import { Article } from '../../database/models/singles/Article/article.model'
import { ArticleShortDto, ReadArticleFilterDto } from './dto'
import { ArticleShortService } from './article-short.service'

const BaseController = buildBaseControllerReadShort<Article, ArticleShortDto>({
  privacySettings: {
    autocompleteIsPublic: true,
    getShortAllIsPublic: true,
    getShortByIdIsPublic: true
  },
  filterDto: ReadArticleFilterDto,
  swagger: {
    modelName: 'articleShort',
    model: Article,
    shortModel: ArticleShortDto
  }
})

@ApiExtraModels(ArticleShortDto)
@ApiTags('Article-short')
@Controller('article-short')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleShortController extends BaseController {
  constructor(private readonly articleShortService: ArticleShortService) {
    super(articleShortService)
  }
}
