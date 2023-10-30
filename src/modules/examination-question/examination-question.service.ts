import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'
import { InjectModel } from '@nestjs/sequelize'
import { answersInclude } from '../../database/includes/question'

@Injectable()
export class ExaminationQuestionService extends BaseServiceCRUD<ExaminationQuestion> {
  constructor(
    @InjectModel(ExaminationQuestion)
    private readonly questionRepository: typeof ExaminationQuestion
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: questionRepository,
      includes: [answersInclude]
    })
  }
}
