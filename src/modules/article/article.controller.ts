import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import {
  CreateArticleDto,
  CreateComplexArticleDto,
  ReadArticleFilterDto,
  UpdateArticleDto,
  UpdatePartiallyArticleDto,
  UpdateComplexArticleDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Article } from '../../database/models/singles/Article/article.model'
import { Roles } from '../../core/interfaces/common'
import { ArticleService } from './article.service'
import { CreateEndpoint } from '../../core/bases/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'

const BaseController = buildBaseControllerCRUD<Article>({
  swagger: { model: Article, modelName: 'article' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    deleteRequireRoles: [Roles.Admin, Roles.Owner, Roles.Publisher],
    updateRequireRoles: [Roles.Admin, Roles.Owner, Roles.Publisher],
    createRequireRoles: [Roles.Admin, Roles.Owner, Roles.Publisher],
    checkPermissionForUpdateInfo: {
      EntityClass: Article,
      comparableFieldName: 'createdByUserId'
    },
    checkPermissionForDeleteInfo: {
      EntityClass: Article,
      comparableFieldName: 'createdByUserId'
    }
  },
  updatePartiallyDto: UpdatePartiallyArticleDto,
  createDto: CreateArticleDto,
  updateDto: UpdateArticleDto,
  filterDto: ReadArticleFilterDto
})

@ApiExtraModels(
  ReadArticleFilterDto,
  CreateArticleDto,
  UpdateArticleDto,
  UpdatePartiallyArticleDto,
  CreateComplexArticleDto,
  UpdateComplexArticleDto
)
@ApiTags('Article')
@Controller('article')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleController extends BaseController {
  constructor(private readonly articleService: ArticleService) {
    super(articleService)
  }

  @CreateEndpoint({
    operationName: 'Endpoint for create article with full dto model',
    modelName: 'article',
    createDto: CreateComplexArticleDto,
    model: CreateComplexArticleDto,
    requiredRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  })
  @Post('/complex')
  async createComplex(@Body() dto: CreateComplexArticleDto) {
    return await this.articleService.createComplex(dto)
  }

  @Put('/complex/:articleId')
  async updateComplex(
    @Param(
      'articleId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('articleId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    articleId: number,
    @Body() dto: UpdateComplexArticleDto
  ) {
    return await this.articleService.updateComplex(articleId, dto)
  }
}
