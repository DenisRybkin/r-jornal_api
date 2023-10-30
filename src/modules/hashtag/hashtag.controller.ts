import {
  CreateHashtagDto,
  ReadHashtagFilterDto,
  UpdateHashtagDto,
  UpdatePartiallyHashtagDto
} from './dto'
import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Hashtag } from '../../database/models/singles/Hashtag/hashtag.model'
import { Roles } from '../../core/interfaces/common'
import { HashtagService } from './hashtag.service'

const BaseController = buildBaseControllerCRUD<Hashtag>({
  swagger: { model: Hashtag, modelName: 'hashtag' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    deleteRequireRoles: [Roles.Admin, Roles.Owner],
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner, Roles.Publisher]
  },
  updatePartiallyDto: UpdatePartiallyHashtagDto,
  createDto: CreateHashtagDto,
  updateDto: UpdateHashtagDto,
  filterDto: ReadHashtagFilterDto
})

@ApiExtraModels(
  UpdatePartiallyHashtagDto,
  CreateHashtagDto,
  UpdateHashtagDto,
  ReadHashtagFilterDto
)
@ApiTags('Hashtag')
@Controller('hashtag')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class HashtagController extends BaseController {
  constructor(private readonly hashtagService: HashtagService) {
    super(hashtagService)
  }
}
