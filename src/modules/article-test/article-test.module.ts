import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleTest } from '../../database/models/singles/ArticleTest/article-test.model'
import { ArticleTestQuestion } from '../../database/models/singles/ArticleTestQuestion/article-test-question.model'
import { ArticleTestAnswer } from '../../database/models/singles/ArticleTestAnswer/article-test-answer.model'
import { ArticleTestService } from './article-test.service'
import { ArticleTestQuestionService } from './article-test-question.service'
import { ArticleTestAnswerService } from './article-test-answer.service'
import { ArticleTestController } from './article-test.controller'
import { ArticleTestQuestionController } from './article-test-question.controller'
import { ArticleTestAnswerController } from './article-test-answer.controller'

@Module({
  imports: [
    SequelizeModule.forFeature([
      ArticleTest,
      ArticleTestQuestion,
      ArticleTestAnswer
    ])
  ],
  providers: [
    ArticleTestService,
    ArticleTestQuestionService,
    ArticleTestAnswerService
  ],
  controllers: [
    ArticleTestController,
    ArticleTestQuestionController,
    ArticleTestAnswerController
  ]
})
export class ArticleTestModule {}
