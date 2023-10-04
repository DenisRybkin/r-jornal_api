import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { InjectModel } from '@nestjs/sequelize'
import { questionsInclude } from '../../database/includes/examination'

@Injectable()
export class ExaminationService extends BaseServiceCRUD<Examination> {
  constructor(
    @InjectModel(Examination)
    private readonly examinationRepository: typeof Examination
  ) {
    super({
      autocompleteProperty: 'title',
      modelRepository: examinationRepository,
      includes: [questionsInclude]
    })
  }
}
