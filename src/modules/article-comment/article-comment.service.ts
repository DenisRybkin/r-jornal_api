import { Injectable, Logger } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleComment } from '../../database/models/singles/ArticleComment/article-comment.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateComplexArticleCommentDto } from './dto'
import { ArticleCommentStaticFieldService } from './article-comment-static-field.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { UpdateComplexArticleCommentDto } from './dto/update-complex-article-comment.dto'
import { Sequelize } from 'sequelize-typescript'
import {
  attachmentsInclude,
  creatorInclude,
  reactionsInclude
} from '../../database/includes/article-comment'

@Injectable()
export class ArticleCommentService extends BaseServiceCRUD<ArticleComment> {
  constructor(
    @InjectModel(ArticleComment)
    private readonly articleCommentRepository: typeof ArticleComment,
    private readonly articleCommentStaticFieldService: ArticleCommentStaticFieldService,
    private readonly asyncContext: AsyncContext<string, any>,
    private readonly sequelize: Sequelize
  ) {
    super(
      {
        modelRepository: articleCommentRepository,
        autocompleteProperty: 'text',
        includes: [creatorInclude, attachmentsInclude, reactionsInclude]
      },
      new Logger(ArticleCommentService.name)
    )
  }

  async createComplex(dto: CreateComplexArticleCommentDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.sequelize.transaction(async transaction => {
      const articleComment = await super.create(
        {
          articleId: dto.articleId,
          createdByUserId: userId,
          text: dto.text
        },
        { transaction }
      )
      if (dto.staticFieldIds)
        await Promise.all(
          dto.staticFieldIds.map(staticFieldId =>
            this.articleCommentStaticFieldService.create(
              {
                commentId: articleComment.id,
                staticFieldId: staticFieldId
              },
              { transaction }
            )
          )
        )

      return articleComment
    })
  }

  async updateComplex(commentId: number, dto: UpdateComplexArticleCommentDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.sequelize.transaction(async transaction => {
      const articleComment = await super.update(
        commentId,
        {
          articleId: dto.articleId,
          createdByUserId: userId,
          text: dto.text
        },
        { transaction }
      )
      if (dto.staticFieldIds)
        await Promise.all(
          dto.staticFieldIds.map(staticFieldId =>
            this.articleCommentStaticFieldService.createOrUpdate(
              { staticFieldId },
              { staticFieldId, commentId: articleComment.articleId },
              [],
              { transaction },
              { transaction }
            )
          )
        )

      return articleComment
    })
  }
}
