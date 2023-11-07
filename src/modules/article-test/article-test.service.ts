import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ArticleTest } from '../../database/models/singles/ArticleTest/article-test.model'
import { InjectModel } from '@nestjs/sequelize'
import { ArticleTestQuestionService } from './article-test-question.service'
import { ComplexCreateArticleTestDto, ComplexUpdateArticleTestDto } from './dto'
import { ArticleTestAnswerService } from './article-test-answer.service'

@Injectable()
export class ArticleTestService extends BaseServiceCRUD<ArticleTest> {
  constructor(
    @InjectModel(ArticleTest)
    private readonly articleTestRepository: typeof ArticleTest,
    private readonly articleTestQuestionService: ArticleTestQuestionService,
    private readonly articleTestAnswerService: ArticleTestAnswerService
  ) {
    super({
      modelRepository: articleTestRepository,
      autocompleteProperty: 'articleId'
    })
  }

  async getByArticleId(articleId: number) {
    return super.getOne({ articleId })
  }

  async createComplex(
    dto: ComplexCreateArticleTestDto
  ): Promise<ComplexCreateArticleTestDto> {
    const articleTest = await super.create({ articleId: dto.articleId })
    const articleTestQuestions = await Promise.all(
      dto.questions.map(question =>
        this.articleTestQuestionService.create({
          testId: articleTest.id,
          name: question.name
        })
      )
    )
    const articleTestAnswers = await Promise.all(
      dto.questions
        .map((question, questionIndex) =>
          question.answers.map(answer => ({
            ...answer,
            questionId: articleTestQuestions[questionIndex].id
          }))
        )
        .flat(1)
        .map(answer =>
          this.articleTestAnswerService.create({
            questionId: answer.questionId,
            isRight: answer.isRight,
            name: answer.name
          })
        )
    )
    return {
      ...articleTest,
      questions: articleTestQuestions.map(question => ({
        ...question,
        answers: articleTestAnswers.filter(
          answer => answer.questionId == question.id
        )
      }))
    }
  }

  async updateComplex(
    id: number,
    dto: ComplexUpdateArticleTestDto
  ): Promise<ComplexUpdateArticleTestDto> {
    const [articleTestQuestions, articleTestAnswers] = await Promise.all([
      Promise.all(
        dto.questions.map(question =>
          this.articleTestQuestionService.update(question.id, {
            name: question.name,
            testId: question.testId
          })
        )
      ),
      Promise.all(
        dto.questions
          .map(question => question.answers)
          .flat(1)
          .map(answer =>
            this.articleTestAnswerService.update(answer.id, {
              name: answer.name,
              questionId: answer.questionId,
              isRight: answer.isRight
            })
          )
      )
    ])
    return {
      ...dto,
      questions: articleTestQuestions.map(question => ({
        ...question,
        answers: articleTestAnswers.filter(
          answer => answer.questionId == question.id
        )
      }))
    }
  }
}
