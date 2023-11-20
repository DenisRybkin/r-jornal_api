import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Article } from '../../database/models/singles/Article/article.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateComplexArticleDto, UpdateComplexArticleDto } from './dto'
import { ArticlePreviewService } from './article-preview.service'
import { ArticleCategoryService } from './article-category.service'
import { ArticleHashtagService } from './article-hashtag.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ArticleTestService } from '../article-test/article-test.service'
import { defaultPagingOptions } from '../../core/bases/utils'
import { ArticleTestUserService } from '../article-test/article-test-user.service'
import { UserAchievementService } from '../user/user-achievement.service'
import { EarnUserPointsStrategyConstants } from '../user/constants/user-point.constants'
import { Sequelize } from 'sequelize-typescript'
import { Transaction } from 'sequelize'
import {
  commentsInclude,
  creatorInclude,
  likesInclude,
  repostsInclude,
  testInclude,
  hashtagsInclude,
  categoriesInclude,
  previewInclude
} from '../../database/includes/article'

@Injectable()
export class ArticleService extends BaseServiceCRUD<Article> {
  constructor(
    @InjectModel(Article) private readonly articleRepository: typeof Article,
    private readonly articlePreviewService: ArticlePreviewService,
    private readonly articleCategoryService: ArticleCategoryService,
    private readonly articleHashtagService: ArticleHashtagService,
    private readonly articleTestService: ArticleTestService,
    private readonly articleTestUserService: ArticleTestUserService,
    private readonly userAchievementService: UserAchievementService,
    private readonly sequelize: Sequelize,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super({
      modelRepository: articleRepository,
      autocompleteProperty: 'body',
      includes: [
        commentsInclude,
        creatorInclude,
        likesInclude,
        repostsInclude,
        testInclude,
        hashtagsInclude,
        categoriesInclude,
        previewInclude
      ],
      beforeCreate: async article =>
        await this.updateUserPoints.call(
          this,
          article.id,
          EarnUserPointsStrategyConstants.BY_CREATE_ARTICLE
        )
    })
  }

  async updateUserPoints(
    articleId: number,
    strategy: EarnUserPointsStrategyConstants,
    transaction?: Transaction
  ) {
    const { id: userId } = this.asyncContext.get('user')
    const articleCategories = await this.articleCategoryService.getAll(
      {
        ...defaultPagingOptions,
        pageSize: -1
      },
      {
        articleId
      },
      transaction
    )
    return await Promise.all(
      articleCategories.items.map(articleCategory =>
        this.userAchievementService.updateUserPoints(
          userId,
          articleCategory.categoryId,
          strategy,
          transaction
        )
      )
    )
  }

  async passTest(articleId: number) {
    const { id: userId } = this.asyncContext.get('user')
    const articleTest = await this.articleTestService.getByArticleId(articleId)
    return await this.sequelize.transaction(async transaction => {
      const [articleTestUser, userAchievements] = await Promise.all([
        this.articleTestUserService.create(
          {
            userId,
            testId: articleTest.id
          },
          { transaction }
        ),
        this.updateUserPoints(
          articleId,
          EarnUserPointsStrategyConstants.BY_PASS_TEST,
          transaction
        )
      ])
      return articleTestUser
    })
  }

  async createComplex(dto: CreateComplexArticleDto) {
    const { id: userId } = this.asyncContext.get('user')
    return await this.sequelize.transaction(async transaction => {
      const article = await super.create(
        {
          createdByUserId: userId,
          body: dto.body
        },
        { transaction }
      )
      const [preview, categories, hashtags, test] = await Promise.all([
        dto.previewId
          ? this.articlePreviewService.create(
              {
                articleId: article.id,
                staticFieldId: dto.previewId
              },
              { transaction }
            )
          : Promise.resolve(),
        dto.categoryIds
          ? Promise.all(
              dto.categoryIds.map(categoryId =>
                this.articleCategoryService.create(
                  {
                    articleId: article.id,
                    categoryId: categoryId
                  },
                  { transaction }
                )
              )
            )
          : Promise.resolve(),
        dto.hashtagIds
          ? Promise.all(
              dto.hashtagIds.map(hashtagId =>
                this.articleHashtagService.create(
                  {
                    articleId: article.id,
                    hashtagId
                  },
                  { transaction }
                )
              )
            )
          : Promise.resolve(),
        dto.questions
          ? this.articleTestService.createComplex(
              {
                articleId: article.id,
                questions: dto.questions
              },
              transaction
            )
          : Promise.resolve()
      ])
      await this.updateUserPoints(
        article.id,
        dto.questions
          ? EarnUserPointsStrategyConstants.BY_CREATE_ARTICLE_WITH_TEST
          : EarnUserPointsStrategyConstants.BY_CREATE_ARTICLE,
        transaction
      )
      return article
    })
  }

  async updateComplex(articleId: number, dto: UpdateComplexArticleDto) {
    const { id: userId } = this.asyncContext.get('user')

    return this.sequelize.transaction(async transaction => {
      const article = await super.update(
        articleId,
        {
          createdByUserId: userId,
          body: dto.body
        },
        { transaction }
      )

      const [] = await Promise.all([
        dto.previewId
          ? this.articlePreviewService.createOrUpdate(
              { articleId: article.id, staticFieldId: dto.previewId },
              {
                articleId: article.id,
                staticFieldId: dto.previewId
              },
              undefined,
              { transaction },
              { transaction }
            )
          : Promise.resolve(),
        dto.categoryIds
          ? Promise.all(
              dto.categoryIds.map(categoryId =>
                this.articleCategoryService.createOrUpdate(
                  {
                    articleId: article.id,
                    categoryId: categoryId
                  },
                  {
                    articleId: article.id,
                    categoryId: categoryId
                  },
                  undefined,
                  { transaction },
                  { transaction }
                )
              )
            )
          : Promise.resolve(),
        dto.hashtagIds
          ? Promise.all(
              dto.hashtagIds.map(hashtagId =>
                this.articleHashtagService.createOrUpdate(
                  {
                    articleId: article.id,
                    hashtagId
                  },
                  {
                    articleId: article.id,
                    hashtagId
                  },
                  undefined,
                  { transaction },
                  { transaction }
                )
              )
            )
          : Promise.resolve()
      ])
      return article
    })
  }
}
