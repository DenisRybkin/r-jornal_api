import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { ExaminationAnswerController } from './examination-answer.controller'
import { ExaminationAnswerService } from './examination-answer.service'

@Module({
  imports: [SequelizeModule.forFeature([ExaminationAnswer])],
  controllers: [ExaminationAnswerController],
  providers: [ExaminationAnswerService],
  exports: [ExaminationAnswerService]
})
export class ExaminationAnswerModule {}
