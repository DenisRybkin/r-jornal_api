import { BaseServiceCRUD } from '../../core/bases/services'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ExaminationAnswerService extends BaseServiceCRUD<ExaminationAnswer> {
  constructor(
    @InjectModel(ExaminationAnswer)
    private readonly answerRepository: typeof ExaminationAnswer
  ) {
    super(
      {
        autocompleteProperty: 'name',
        modelRepository: answerRepository
      },
      new Logger(ExaminationAnswerService.name)
    )
  }
}
