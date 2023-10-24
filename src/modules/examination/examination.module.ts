import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { ExaminationService } from './examination.service'
import { ExaminationController } from './examination.controller'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Examination,
      ExaminationQuestion,
      ExaminationAnswer
    ])
  ],
  controllers: [ExaminationController],
  providers: [ExaminationService],
  exports: [ExaminationService]
})
export class ExaminationModule {}
