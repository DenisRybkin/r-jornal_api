import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import {
  CreateArticleCommentDto,
  CreateComplexArticleCommentDto,
  ReadArticleCommentFilterDto,
  UpdateArticleCommentDto,
  UpdatePartiallyArticleCommentDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ArticleComment } from '../../database/models/singles/ArticleComment/article-comment.model'
import { ArticleCommentService } from './article-comment.service'
import { ArticleCommentStaticFieldService } from './article-comment-static-field.service'
import { CreateEndpoint, UpdateEndpoint } from '../../core/bases/decorators'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { UpdateComplexArticleCommentDto } from './dto/update-complex-article-comment.dto'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'

const BaseController = buildBaseControllerCRUD<ArticleComment>({
  swagger: { model: ArticleComment, modelName: 'article comment' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    checkPermissionForUpdateInfo: {
      EntityClass: ArticleComment,
      comparableFieldName: 'createdByUserId'
    }
  },
  updatePartiallyDto: UpdatePartiallyArticleCommentDto,
  updateDto: UpdateArticleCommentDto,
  filterDto: ReadArticleCommentFilterDto,
  createDto: CreateArticleCommentDto
})

@ApiExtraModels(
  ReadArticleCommentFilterDto,
  UpdateArticleCommentDto,
  CreateArticleCommentDto,
  UpdatePartiallyArticleCommentDto,
  CreateComplexArticleCommentDto,
  UpdateComplexArticleCommentDto
)
@ApiTags('Article Comment')
@Controller('article-comment')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleCommentController extends BaseController {
  constructor(
    private readonly articleCommentService: ArticleCommentService,
    private readonly articleCommentStaticFieldService: ArticleCommentStaticFieldService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(articleCommentService)
  }

  @CreateEndpoint({
    operationName: 'Create complex comment model with static field',
    model: ArticleComment,
    createDto: CreateComplexArticleCommentDto,
    modelName: 'comment'
  })
  @Post('/complex')
  async createComplex(@Body() dto: CreateComplexArticleCommentDto) {
    const { id: userId } = this.asyncContext.get('user')
    const articleComment = await this.articleCommentService.create({
      articleId: dto.articleId,
      createdByUserId: userId,
      text: dto.text
    })
    if (dto.staticFieldIds)
      await Promise.all(
        dto.staticFieldIds.map(staticFieldId =>
          this.articleCommentStaticFieldService.create({
            commentId: articleComment.articleId,
            staticFieldId: staticFieldId
          })
        )
      )

    return articleComment
  }

  @UpdateEndpoint({
    operationName: 'Update complex comment model with static field',
    model: ArticleComment,
    updateDto: UpdateComplexArticleCommentDto,
    modelName: 'comment'
  })
  @Put('/complex/:commentId')
  async updateComplex(
    @Param(
      'commentId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('commentId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    commentId: number,
    @Body() dto: UpdateComplexArticleCommentDto
  ) {
    const { id: userId } = this.asyncContext.get('user')
    const articleComment = await this.articleCommentService.update(commentId, {
      articleId: dto.articleId,
      createdByUserId: userId,
      text: dto.text
    })
    if (dto.staticFieldId)
      await this.articleCommentStaticFieldService.update(
        { commentId: commentId },
        {
          commentId: articleComment.articleId,
          staticFieldId: dto.staticFieldId
        }
      )
    return articleComment
  }
}
