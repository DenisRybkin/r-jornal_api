import { Includeable } from 'sequelize'
import { ExaminationQuestion } from '../../models/singles/ExaminationQuestion/examination-question.model'
import { answersInclude } from '../question'

export const questionsInclude: Includeable = {
  model: ExaminationQuestion,
  as: 'questions',
  include: [answersInclude]
}
