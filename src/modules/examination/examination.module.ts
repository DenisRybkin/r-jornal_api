import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { Question } from '../../database/models/singles/Question/question.model'
import { Answer } from '../../database/models/singles/Answer/answer.model'
import { ExaminationService } from './examination.service'
import { ExaminationController } from './examination.controller'

@Module({
  imports: [SequelizeModule.forFeature([Examination, Question, Answer])],
  controllers: [ExaminationController],
  providers: [ExaminationService],
  exports: [ExaminationService]
})
export class ExaminationModule {}
