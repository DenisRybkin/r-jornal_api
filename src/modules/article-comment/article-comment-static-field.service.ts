import { Injectable, Logger } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleCommentStaticField } from '../../database/models/related/ArticleCommentStaticField/article-comment-static-field.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleCommentStaticFieldService extends BaseServiceCRUD<ArticleCommentStaticField> {
  constructor(
    @InjectModel(ArticleCommentStaticField)
    private readonly articleStaticFieldComment: typeof ArticleCommentStaticField
  ) {
    super(
      {
        autocompleteProperty: 'commentId',
        modelRepository: articleStaticFieldComment,
        includes: []
      },
      new Logger(ArticleCommentStaticFieldService.name)
    )
  }
}
