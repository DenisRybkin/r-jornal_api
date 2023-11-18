import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleCategory } from '../../database/models/related/ArticleCategory/article-category.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleCategoryService extends BaseServiceCRUD<ArticleCategory> {
  constructor(
    @InjectModel(ArticleCategory)
    private readonly articleCategoryRepository: typeof ArticleCategory
  ) {
    super({
      modelRepository: articleCategoryRepository,
      autocompleteProperty: 'categoryId',
      includes: []
    })
  }
}
