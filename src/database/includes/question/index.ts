import { Includeable } from 'sequelize'
import { ExaminationAnswer } from '../../models/singles/ExaminationAnswer/examination-answer.model'

export const answersInclude: Includeable = {
  model: ExaminationAnswer,
  as: 'answers'
}
