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
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super({
      modelRepository: articleRepository,
      autocompleteProperty: 'body',
      includes: [],
      beforeCreate: async article =>
        await this.updateUserPoints.call(
          this,
          article.id,
          EarnUserPointsStrategyConstants.BY_PUBLICATION
        )
    })
  }

  async updateUserPoints(
    articleId: number,
    strategy: EarnUserPointsStrategyConstants
  ) {
    const { id: userId } = this.asyncContext.get('user')
    const articleCategories = await this.articleCategoryService.getAll(
      {
        ...defaultPagingOptions,
        pageSize: -1
      },
      {
        articleId
      }
    )
    return await Promise.all(
      articleCategories.items.map(articleCategory =>
        this.userAchievementService.updateUserPoints(
          userId,
          articleCategory.categoryId,
          strategy
        )
      )
    )
  }

  async passTest(articleId: number) {
    const { id: userId } = this.asyncContext.get('user')
    const articleTest = await this.articleTestService.getByArticleId(articleId)
    const [articleTestUser, userAchievements] = await Promise.all([
      this.articleTestUserService.create({
        userId,
        testId: articleTest.id
      }),
      this.updateUserPoints(
        articleId,
        EarnUserPointsStrategyConstants.BY_PASS_TEST
      )
    ])
    return articleTestUser
  }

  async createComplex(dto: CreateComplexArticleDto) {
    const { id: userId } = this.asyncContext.get('user')
    const article = await super.create({
      createdByUserId: userId,
      body: dto.body
    })
    const [preview, categories, hashtags] = await Promise.all([
      dto.previewId
        ? this.articlePreviewService.create({
            articleId: article.id,
            staticFieldId: dto.previewId
          })
        : Promise.resolve(),
      dto.categoryIds
        ? Promise.all(
            dto.categoryIds.map(categoryId =>
              this.articleCategoryService.create({
                articleId: article.id,
                categoryId: categoryId
              })
            )
          )
        : Promise.resolve(),
      dto.hashtagIds
        ? Promise.all(
            dto.hashtagIds.map(hashtagId =>
              this.articleHashtagService.create({
                articleId: article.id,
                hashtagId
              })
            )
          )
        : Promise.resolve(),
      this.updateUserPoints(
        article.id,
        EarnUserPointsStrategyConstants.BY_PUBLICATION
      )
    ])
    return article
  }

  async updateComplex(articleId: number, dto: UpdateComplexArticleDto) {
    const { id: userId } = this.asyncContext.get('user')

    const article = await super.update(articleId, {
      createdByUserId: userId,
      body: dto.body
    })

    const [] = await Promise.all([
      dto.previewId
        ? this.articlePreviewService.createOrUpdate(
            { articleId: article.id, staticFieldId: dto.previewId },
            {
              articleId: article.id,
              staticFieldId: dto.previewId
            }
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
                }
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
                }
              )
            )
          )
        : Promise.resolve()
    ])
    return article
  }
}
