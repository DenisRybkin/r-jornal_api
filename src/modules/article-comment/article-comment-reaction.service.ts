import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleCommentReaction } from '../../database/models/singles/ArticleCommentReaction/article-comment-reaction.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleCommentReactionService extends BaseServiceCRUD<ArticleCommentReaction> {
  constructor(
    @InjectModel(ArticleCommentReaction)
    private readonly articleCommentReactionRepository: typeof ArticleCommentReaction
  ) {
    super({
      modelRepository: articleCommentReactionRepository,
      autocompleteProperty: 'commentId',
      includes: []
    })
  }
}
