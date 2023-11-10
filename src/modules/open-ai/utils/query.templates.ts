import { Locale, LocaleType } from '../../../core/interfaces/common'

const questionForm =
  '{questions: [ {name: " ", answers: [{name: " ", isRight: true }]} ]}'

export const genTemplateForQuestions = (
  topic: string,
  locale: LocaleType,
  count?: number
) => {
  switch (locale) {
    case Locale.ru:
      return `Сформируй вопросы в количестве: ${
        count ?? 1
      }, с вложенными ответами (один из которых верный) на тему ${topic}, и выведи это в формате json ${questionForm}`
    case Locale.en:
      return `Form questions in the number: ${
        count ?? 1
      }, with nested answers (one of which is correct) on the topic of ${topic}, and output it in json ${questionForm}`
  }
}
