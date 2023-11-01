import { Includeable } from 'sequelize'
import { ExaminationQuestion } from '../../models/singles/ExaminationQuestion/examination-question.model'
import { ExaminationAnswer } from '../../models/singles/ExaminationAnswer/examination-answer.model'

export const answersInclude: Includeable = {
  model: ExaminationAnswer,
  as: 'answers'
}

export const questionsInclude: Includeable = {
  model: ExaminationQuestion,
  as: 'questions',
  include: [answersInclude]
}
