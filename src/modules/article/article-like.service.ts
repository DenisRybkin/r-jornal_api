import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleLike } from '../../database/models/related/ArticleLike/article-like.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleLikeService extends BaseServiceCRUD<ArticleLike> {
  constructor(
    @InjectModel(ArticleLike)
    private readonly articleLikeRepository: typeof ArticleLike
  ) {
    super({
      modelRepository: articleLikeRepository,
      autocompleteProperty: 'articleId',
      includes: []
    })
  }
}
