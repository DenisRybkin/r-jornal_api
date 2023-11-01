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

@Module({
  imports: [
    SequelizeModule.forFeature([
      Article,
      ArticleStaticField,
      ArticleCategory,
      ArticleHashtag
    ])
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticlePreviewService,
    ArticleCategoryService,
    ArticleHashtagService
  ],
  exports: [
    ArticleService,
    ArticlePreviewService,
    ArticleCategoryService,
    ArticleHashtagService
  ]
})
export class ArticleModule {}
