import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleHashtag } from '../../database/models/related/ArticleHashtag/article-hashtag.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleHashtagService extends BaseServiceCRUD<ArticleHashtag> {
  constructor(
    @InjectModel(ArticleHashtag)
    private readonly articleHashtagRepository: typeof ArticleHashtag
  ) {
    super({
      modelRepository: articleHashtagRepository,
      autocompleteProperty: 'hashtagId',
      includes: []
    })
  }
}
