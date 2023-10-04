import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Question } from '../../database/models/singles/Question/question.model'
import { InjectModel } from '@nestjs/sequelize'
import { answersInclude } from '../../database/includes/question'

@Injectable()
export class QuestionService extends BaseServiceCRUD<Question> {
  constructor(
    @InjectModel(Question)
    private readonly questionRepository: typeof Question
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: questionRepository,
      includes: [answersInclude]
    })
  }
}
