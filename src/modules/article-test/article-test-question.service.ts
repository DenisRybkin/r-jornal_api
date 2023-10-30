import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleTestQuestion } from '../../database/models/singles/ArticleTestQuestion/article-test-question.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleTestQuestionService extends BaseServiceCRUD<ArticleTestQuestion> {
  constructor(
    @InjectModel(ArticleTestQuestion)
    private readonly articleTestQuestionRepository: typeof ArticleTestQuestion
  ) {
    super({
      modelRepository: articleTestQuestionRepository,
      autocompleteProperty: 'name'
    })
  }
}
