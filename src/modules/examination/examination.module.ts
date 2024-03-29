import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { ExaminationService } from './examination.service'
import { ExaminationController } from './examination.controller'
import { ExaminationQuestionController } from './examination-question.controller'
import { ExaminationQuestionService } from './examination-question.service'
import { ExaminationAnswerController } from './examination-answer.controller'
import { ExaminationAnswerService } from './examination-answer.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Examination,
      ExaminationQuestion,
      ExaminationAnswer
    ]),
    UserModule
  ],
  controllers: [
    ExaminationController,
    ExaminationQuestionController,
    ExaminationAnswerController
  ],
  providers: [
    ExaminationService,
    ExaminationQuestionService,
    ExaminationAnswerService
  ],
  exports: [
    ExaminationService,
    ExaminationQuestionService,
    ExaminationAnswerService
  ]
})
export class ExaminationModule {}
