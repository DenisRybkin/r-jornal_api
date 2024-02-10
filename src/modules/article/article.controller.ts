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
import { CreateEndpoint, UpdateEndpoint } from '../../core/bases/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { ArticleLikeService } from './article-like.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ArticleRepostService } from './article-repost.service'
import { ArticleTestUser } from '../../database/models/related/ArticleTestUser/article-test-user.model'

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
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleLikeService: ArticleLikeService,
    private readonly articleRepostService: ArticleRepostService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(articleService)
  }

  @CreateEndpoint({
    operationName: 'Endpoint for create article with full dto model',
    modelName: 'article',
    createDto: CreateComplexArticleDto,
    model: Article,
    requiredRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  })
  @Post('/complex')
  async createComplex(@Body() dto: CreateComplexArticleDto) {
    return await this.articleService.createComplex(dto)
  }

  @UpdateEndpoint({
    operationName: 'Endpoint for create article with full dto model',
    modelName: 'article',
    updateDto: UpdateComplexArticleDto,
    model: CreateComplexArticleDto,
    requiredRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    modelInfo: {
      EntityClass: Article,
      comparableFieldName: 'createdByUserId',
      paramName: 'articleId'
    }
  })
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

  @CreateEndpoint({
    operationName: 'Endpoint for toggle like in article',
    modelName: 'article like'
  })
  @Post('/like/:articleId')
  async toggleLike(
    @Param(
      'articleId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('articleId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    articleId: number
  ) {
    const { id: userId } = this.asyncContext.get('user')
    return this.articleLikeService.createOrDelete(
      { articleId, userId },
      { articleId, userId }
    )
  }

  @CreateEndpoint({
    operationName: 'Endpoint for toggle repost in article',
    modelName: 'article like'
  })
  @Post('/repost/:articleId')
  async toggleRepost(
    @Param(
      'articleId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('articleId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    articleId: number
  ) {
    const { id: userId } = this.asyncContext.get('user')
    return this.articleRepostService.createOrDelete(
      { articleId, userId },
      { articleId, userId }
    )
  }

  @CreateEndpoint({
    operationName: 'Endpoint for pass article test',
    model: ArticleTestUser
  })
  @Post('/pass-test/:articleId')
  async passTest(
    @Param(
      'articleId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('articleId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    articleId: number
  ) {
    return this.articleService.passTest(articleId)
  }
}
