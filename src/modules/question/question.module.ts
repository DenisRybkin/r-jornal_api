import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'

@Module({
  imports: [
    SequelizeModule.forFeature([ExaminationQuestion, ExaminationAnswer])
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
