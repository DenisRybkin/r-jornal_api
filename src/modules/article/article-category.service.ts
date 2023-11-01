import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleCategory } from '../../database/models/related/ArticleCategory/article-category.model'
import { InjectModel } from '@nestjs/sequelize'
import { ArticleStaticField } from '../../database/models/related/ArticleStaticField/article-static-field.model'

@Injectable()
export class ArticleCategoryService extends BaseServiceCRUD<ArticleCategory> {
  constructor(
    @InjectModel(ArticleStaticField)
    private readonly articleCategoryRepository: typeof ArticleCategory
  ) {
    super({
      modelRepository: articleCategoryRepository,
      autocompleteProperty: 'categoryId',
      includes: []
    })
  }
}
