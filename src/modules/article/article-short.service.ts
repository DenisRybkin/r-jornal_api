import { BaseServiceReadShort } from '../../core/bases/services'
import { Article } from '../../database/models/singles/Article/article.model'
import { InjectModel } from '@nestjs/sequelize'
import {
  commentsInclude,
  creatorInclude,
  hashtagsInclude,
  likesInclude,
  repostsInclude
} from '../../database/includes/article'
import { Injectable } from '@nestjs/common'
import { ArticleShortDto } from './dto'
import { article2articleShortMapper } from './utils/article2article-short.mapper'
import { AsyncContext } from '../../core/modules/async-context/async-context'

@Injectable()
export class ArticleShortService extends BaseServiceReadShort<
  Article,
  ArticleShortDto
> {
  constructor(
    @InjectModel(Article) private readonly articleRepository: typeof Article,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super({
      modelRepository: articleRepository,
      autocompleteProperty: 'body',
      mapper: article =>
        article2articleShortMapper(article, asyncContext.get('user')),
      includes: [
        creatorInclude,
        likesInclude,
        commentsInclude,
        repostsInclude,
        hashtagsInclude
      ]
    })
  }
}
