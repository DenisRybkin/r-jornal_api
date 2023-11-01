import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleStaticField } from '../../database/models/related/ArticleStaticField/article-static-field.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticlePreviewService extends BaseServiceCRUD<ArticleStaticField> {
  constructor(
    @InjectModel(ArticleStaticField)
    private readonly articleStaticFieldRepository: typeof ArticleStaticField
  ) {
    super({
      modelRepository: articleStaticFieldRepository,
      autocompleteProperty: 'staticFieldId',
      includes: []
    })
  }
}
