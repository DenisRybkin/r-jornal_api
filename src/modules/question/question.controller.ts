import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Question } from '../../database/models/singles/Question/question.model'
import { Roles } from '../../core/interfaces/common'
import {
  UpdateQuestionDto,
  CreateQuestionDto,
  UpdatePartiallyQuestionDto,
  ReadQuestionFilterDto
} from './dto'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { QuestionService } from './question.service'

const BaseController = buildBaseControllerCRUD<Question>({
  swagger: { model: Question, modelName: 'question' },
  privacySettings: {
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner],
    deleteRequireRoles: [Roles.Admin, Roles.Owner]
  },
  filterDto: ReadQuestionFilterDto,
  createDto: CreateQuestionDto,
  updateDto: UpdateQuestionDto,
  updatePartiallyDto: UpdatePartiallyQuestionDto
})

@ApiExtraModels(
  UpdateQuestionDto,
  CreateQuestionDto,
  UpdatePartiallyQuestionDto,
  ReadQuestionFilterDto
)
@ApiTags('Question')
@Controller('question')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class QuestionController extends BaseController {
  constructor(private readonly questionService: QuestionService) {
    super(questionService)
  }
}
