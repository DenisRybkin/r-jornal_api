import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleHashtag } from '../../database/models/related/ArticleHashtag/article-hashtag.model'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ArticleLikeService } from './article-like.service'

@Injectable()
export class ArticleHashtagService extends BaseServiceCRUD<ArticleHashtag> {
  constructor(
    @InjectModel(ArticleHashtag)
    private readonly articleHashtagRepository: typeof ArticleHashtag
  ) {
    super(
      {
        modelRepository: articleHashtagRepository,
        autocompleteProperty: 'hashtagId',
        includes: []
      },
      new Logger(ArticleLikeService.name)
    )
  }
}
