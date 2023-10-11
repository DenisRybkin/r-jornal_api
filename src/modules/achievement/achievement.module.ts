import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Achievement } from '../../database/models/singles/Achievement/achievement.model'
import { UserAchievement } from '../../database/models/related/UserAchievement/user-achievement.model'
import { AchievementService } from './achievement.service'
import { AchievementController } from './achievement.controller'

@Module({
  imports: [SequelizeModule.forFeature([Achievement, UserAchievement])],
  controllers: [AchievementController],
  providers: [AchievementService],
  exports: [AchievementService]
})
export class AchievementModule {}
