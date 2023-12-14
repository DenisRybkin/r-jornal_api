import { Includeable } from 'sequelize'
import { ArticleTestQuestion } from '../../models/singles/ArticleTestQuestion/article-test-question.model'
import { ArticleTestAnswer } from '../../models/singles/ArticleTestAnswer/article-test-answer.model'
import { ArticleTestUser } from '../../models/related/ArticleTestUser/article-test-user.model'
import { avatarInclude } from '../user'
import { User } from '../../models/singles/User/user.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'

export const answersInclude: Includeable = {
  model: ArticleTestAnswer,
  as: 'answers'
}

export const questionsInclude: Includeable = {
  model: ArticleTestQuestion,
  as: 'questions'
}

export const questionsWithAnswersInclude: Includeable = {
  ...questionsInclude,
  include: [answersInclude]
}

export const includeUsers: Includeable = {
  model: User,
  as: 'user',
  include: [avatarInclude, { model: StaticField, as: 'defaultAvatar' }]
}

export const usersWhoPassedInclude: Includeable = {
  model: ArticleTestUser,
  as: 'usersWhoPassed',
  include: [includeUsers]
}
