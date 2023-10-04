import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Question } from '../../database/models/singles/Question/question.model'
import { Answer } from '../../database/models/singles/Answer/answer.model'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'

@Module({
  imports: [SequelizeModule.forFeature([Question, Answer])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
