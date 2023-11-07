import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleRepost } from '../../database/models/related/ArticleRepost/article-repost.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleRepostService extends BaseServiceCRUD<ArticleRepost> {
  constructor(
    @InjectModel(ArticleRepost)
    private readonly articleRepostRepository: typeof ArticleRepost
  ) {
    super({
      modelRepository: articleRepostRepository,
      autocompleteProperty: 'articleId',
      includes: []
    })
  }
}
