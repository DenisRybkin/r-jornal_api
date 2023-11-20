import { BaseServiceReadShort } from '../../core/bases/services'
import { Article } from '../../database/models/singles/Article/article.model'
import { InjectModel } from '@nestjs/sequelize'
import {
  commentsInclude,
  creatorInclude,
  likesInclude,
  repostsInclude
} from '../../database/includes/article'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ArticleShortService extends BaseServiceReadShort<
  Article,
  Article
> {
  constructor(
    @InjectModel(Article) private readonly articleRepository: typeof Article
  ) {
    super({
      modelRepository: articleRepository,
      autocompleteProperty: 'body',
      mapper: article => article,
      includes: [creatorInclude, likesInclude, commentsInclude, repostsInclude]
    })
  }
}
