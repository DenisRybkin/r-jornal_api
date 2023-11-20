import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Article } from '../../database/models/singles/Article/article.model'
import { ArticleStaticField } from '../../database/models/related/ArticleStaticField/article-static-field.model'
import { ArticlePreviewService } from './article-preview.service'
import { ArticleService } from './article.service'
import { ArticleCategoryService } from './article-category.service'
import { ArticleHashtagService } from './article-hashtag.service'
import { ArticleCategory } from '../../database/models/related/ArticleCategory/article-category.model'
import { ArticleHashtag } from '../../database/models/related/ArticleHashtag/article-hashtag.model'
import { ArticleController } from './article.controller'
import { ArticleLike } from '../../database/models/related/ArticleLike/article-like.model'
import { ArticleLikeService } from './article-like.service'
import { ArticleRepostService } from './article-repost.service'
import { ArticleRepost } from '../../database/models/related/ArticleRepost/article-repost.model'
import { UserModule } from '../user/user.module'
import { ArticleTestModule } from '../article-test/article-test.module'
import { ArticleShortService } from './article-short.service'
import { ArticleShortController } from './article-short.controller'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Article,
      ArticleStaticField,
      ArticleCategory,
      ArticleHashtag,
      ArticleLike,
      ArticleRepost
    ]),
    ArticleTestModule,
    UserModule
  ],
  controllers: [ArticleController, ArticleShortController],
  providers: [
    ArticleService,
    ArticlePreviewService,
    ArticleCategoryService,
    ArticleHashtagService,
    ArticleLikeService,
    ArticleRepostService,
    ArticleShortService
  ],
  exports: [
    ArticleService,
    ArticlePreviewService,
    ArticleCategoryService,
    ArticleHashtagService,
    ArticleLikeService,
    ArticleRepostService,
    ArticleShortService
  ]
})
export class ArticleModule {}
