import { Includeable } from 'sequelize'
import { ArticleTestQuestion } from '../../models/singles/ArticleTestQuestion/article-test-question.model'
import { ArticleTestAnswer } from '../../models/singles/ArticleTestAnswer/article-test-answer.model'
import { ArticleTestUser } from '../../models/related/ArticleTestUser/article-test-user.model'

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

export const usersWhoPassedInclude: Includeable = {
  model: ArticleTestUser,
  as: 'usersWhoPassed'
}
