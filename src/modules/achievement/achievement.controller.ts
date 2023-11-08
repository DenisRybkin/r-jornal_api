import { buildBaseControllerRead } from '../../core/bases/controllers'
import { Achievement } from '../../database/models/singles/Achievement/achievement.model'
import { ReadAchievementFilterDto } from './dto/read-achievement-filter.dto'
import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { AchievementService } from './achievement.service'

const BaseController = buildBaseControllerRead<Achievement>({
  swagger: { model: Achievement, modelName: 'achievement' },
  filterDto: ReadAchievementFilterDto,
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true
  }
})

@ApiExtraModels(ReadAchievementFilterDto)
@ApiTags('Achievement')
@Controller('achievement')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class AchievementController extends BaseController {
  constructor(private readonly achievementService: AchievementService) {
    super(achievementService)
  }
}
