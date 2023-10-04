import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Answer } from '../../database/models/singles/Answer/answer.model'
import { AnswerController } from './answer.controller'
import { AnswerService } from './answer.service'

@Module({
  imports: [SequelizeModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService]
})
export class AnswerModule {}
