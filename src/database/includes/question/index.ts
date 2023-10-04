import { Includeable } from 'sequelize'
import { Answer } from '../../models/singles/Answer/answer.model'

export const answersInclude: Includeable = {
  model: Answer,
  as: 'answers'
}
