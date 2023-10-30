import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleComment } from '../../database/models/singles/ArticleComment/article-comment.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleCommentService extends BaseServiceCRUD<ArticleComment> {
  constructor(
    @InjectModel(ArticleComment)
    private readonly articleCommentRepository: typeof ArticleComment
  ) {
    super({
      modelRepository: articleCommentRepository,
      autocompleteProperty: 'text',
      includes: []
    })
  }
}
