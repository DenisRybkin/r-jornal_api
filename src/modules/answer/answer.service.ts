import { BaseServiceCRUD } from '../../core/bases/services'
import { Answer } from '../../database/models/singles/Answer/answer.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class AnswerService extends BaseServiceCRUD<Answer> {
  constructor(
    @InjectModel(Answer)
    private readonly answerRepository: typeof Answer
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: answerRepository
    })
  }
}
