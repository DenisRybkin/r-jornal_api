import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { AnswerController } from './answer.controller'
import { AnswerService } from './answer.service'

@Module({
  imports: [SequelizeModule.forFeature([ExaminationAnswer])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService]
})
export class AnswerModule {}
