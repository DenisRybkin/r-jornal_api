import { Injectable, Logger } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { InjectModel } from '@nestjs/sequelize'
import { questionsInclude } from '../../database/includes/examination'
import { UserService } from '../user/user.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'

@Injectable()
export class ExaminationService extends BaseServiceCRUD<Examination> {
  constructor(
    @InjectModel(Examination)
    private readonly examinationRepository: typeof Examination,
    private readonly useService: UserService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(
      {
        autocompleteProperty: 'title',
        modelRepository: examinationRepository,
        includes: [questionsInclude]
      },
      new Logger(ExaminationService.name)
    )
  }

  async passExamination(examinationId: number) {
    const { id: userId } = this.asyncContext.get('user')
    const examination = await super.getById(examinationId)
    return this.useService.update(userId, {
      roleId: examination.certificateRoleId
    })
  }
}
