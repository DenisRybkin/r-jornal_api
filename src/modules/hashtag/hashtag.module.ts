import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Hashtag } from '../../database/models/singles/Hashtag/hashtag.model'
import { HashtagController } from './hashtag.controller'
import { HashtagService } from './hashtag.service'

@Module({
  imports: [SequelizeModule.forFeature([Hashtag])],
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService]
})
export class HashtagModule {}
