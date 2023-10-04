import { Includeable } from 'sequelize'
import { Question } from '../../models/singles/Question/question.model'
import { answersInclude } from '../question'

export const questionsInclude: Includeable = {
  model: Question,
  as: 'questions',
  include: [answersInclude]
}
