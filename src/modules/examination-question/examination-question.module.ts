import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { ExaminatinQuestionController } from './examinatin-question.controller'
import { ExaminationQuestionService } from './examination-question.service'

@Module({
  imports: [
    SequelizeModule.forFeature([ExaminationQuestion, ExaminationAnswer])
  ],
  controllers: [ExaminatinQuestionController],
  providers: [ExaminationQuestionService],
  exports: [ExaminationQuestionService]
})
export class ExaminationQuestionModule {}
