import { Injectable, Logger } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Achievement } from '../../database/models/singles/Achievement/achievement.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class AchievementService extends BaseServiceCRUD<Achievement> {
  constructor(
    @InjectModel(Achievement)
    private readonly achievementRepository: typeof Achievement
  ) {
    super(
      {
        autocompleteProperty: 'name',
        modelRepository: achievementRepository
      },
      new Logger(AchievementService.name)
    )
  }
}
