import { Locale, LocaleType } from '../../../core/interfaces/common'

interface Message {
  role: 'system' | 'user'
  text: string
}

export const jsonSeparator = '```'

const questionForm =
  '{questions: [ {name: " ", answers: [{name: " ", isRight: boolean }]} ]}'

export const genTemplatesForQuestions = (
  topic: string,
  locale: LocaleType,
  count = 3
): Message[] => {
  switch (locale) {
    case Locale.ru:
      return [
        {
          role: 'system',
          text: 'Ты опытный составитель тестов для научных статей. Представь ты читаешь новую научную статью на определенную тему и ты должен сгенерировать N вопросов с ответами для составления теста читателям.'
        },
        {
          role: 'user',
          text: `Вид вопросов: JSON формат типа ${questionForm}, без лишнего текста. Тема научной статьи: "${topic}". Количество вопросов для тестирования: ${count}`
        }
      ]
    case Locale.en:
      return [
        {
          role: 'system',
          text: 'You are an experienced copywriter of scientific articles. Imagine you are reading a new scientific article on a certain topic and you have to generate N questions with answers to compile a test for readers.'
        },
        {
          role: 'user',
          text: `The type of your questions: JSON format of the type ${questionForm}, The topic of the scientific article: "${topic}". Number of questions to test: ${count}`
        }
      ]
  }
}

export const defaultGPTOptions = (idKey: string) => ({
  modelUri: `gpt://${idKey}/yandexgpt/latest`,
  completionOptions: {
    stream: false,
    temperature: 0,
    maxTokens: 1500
  }
})
