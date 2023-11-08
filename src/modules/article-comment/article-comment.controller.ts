import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import {
  ArticleCommentReactionDto,
  CreateArticleCommentDto,
  CreateComplexArticleCommentDto,
  ReadArticleCommentFilterDto,
  UpdateArticleCommentDto,
  UpdatePartiallyArticleCommentDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ArticleComment } from '../../database/models/singles/ArticleComment/article-comment.model'
import { ArticleCommentService } from './article-comment.service'
import { CreateEndpoint, UpdateEndpoint } from '../../core/bases/decorators'
import { UpdateComplexArticleCommentDto } from './dto/update-complex-article-comment.dto'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ArticleCommentReactionService } from './article-comment-reaction.service'
import { ArticleCommentReaction } from '../../database/models/singles/ArticleCommentReaction/article-comment-reaction.model'

const BaseController = buildBaseControllerCRUD<ArticleComment>({
  swagger: { model: ArticleComment, modelName: 'article comment' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    checkPermissionForUpdateInfo: {
      EntityClass: ArticleComment,
      comparableFieldName: 'createdByUserId'
    },
    checkPermissionForDeleteInfo: {
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
  UpdateComplexArticleCommentDto,
  ArticleCommentReactionDto
)
@ApiTags('Article Comment')
@Controller('article-comment')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleCommentController extends BaseController {
  constructor(
    private readonly articleCommentService: ArticleCommentService,
    private readonly articleCommentReactionService: ArticleCommentReactionService,
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
    return await this.articleCommentService.createComplex(dto)
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
    return await this.articleCommentService.updateComplex(commentId, dto)
  }

  @CreateEndpoint({
    operationName: 'Endpoint for toggle reaction (emoji)',
    createDto: ArticleCommentReactionDto,
    model: ArticleCommentReaction
  })
  @Post('/:commentId/reaction')
  async reaction(
    @Param(
      'commentId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('commentId', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    commentId: number,
    @Body() dto: ArticleCommentReactionDto
  ) {
    const { id: userId } = this.asyncContext.get('user')
    const createOrUpdateDto = {
      commentId,
      userId,
      value: dto.value
    }
    return await this.articleCommentReactionService.createOrDelete(
      createOrUpdateDto,
      createOrUpdateDto
    )
  }
}
