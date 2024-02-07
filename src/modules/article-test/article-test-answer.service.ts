import { Injectable, Logger } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleTestAnswer } from '../../database/models/singles/ArticleTestAnswer/article-test-answer.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ArticleTestAnswerService extends BaseServiceCRUD<ArticleTestAnswer> {
  constructor(
    @InjectModel(ArticleTestAnswer)
    private readonly articleTestAnswerRepository: typeof ArticleTestAnswer
  ) {
    super(
      {
        modelRepository: articleTestAnswerRepository,
        autocompleteProperty: 'name'
      },
      new Logger(ArticleTestAnswerService.name)
    )
  }
}
