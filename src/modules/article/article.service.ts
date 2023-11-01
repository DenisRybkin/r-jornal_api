import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Article } from '../../database/models/singles/Article/article.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateComplexArticleDto, UpdateComplexArticleDto } from './dto'
import { ArticlePreviewService } from './article-preview.service'
import { ArticleCategoryService } from './article-category.service'
import { ArticleHashtagService } from './article-hashtag.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'

@Injectable()
export class ArticleService extends BaseServiceCRUD<Article> {
  constructor(
    @InjectModel(Article) private readonly articleRepository: typeof Article,
    private readonly articlePreviewService: ArticlePreviewService,
    private readonly articleCategoryService: ArticleCategoryService,
    private readonly articleHashtagService: ArticleHashtagService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super({
      modelRepository: articleRepository,
      autocompleteProperty: 'body',
      includes: []
    })
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
        : Promise.resolve()
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
