import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'
import { Roles } from '../../core/interfaces/common'
import {
  UpdateExaminationQuestionDto,
  CreateExaminationQuestionDto,
  UpdatePartiallyExaminationQuestionDto,
  ReadExaminationQuestionFilterDto
} from './dto'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { ExaminationQuestionService } from './examination-question.service'

const BaseController = buildBaseControllerCRUD<ExaminationQuestion>({
  swagger: { model: ExaminationQuestion, modelName: 'question' },
  privacySettings: {
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner],
    deleteRequireRoles: [Roles.Admin, Roles.Owner]
  },
  filterDto: ReadExaminationQuestionFilterDto,
  createDto: CreateExaminationQuestionDto,
  updateDto: UpdateExaminationQuestionDto,
  updatePartiallyDto: UpdatePartiallyExaminationQuestionDto
})

@ApiExtraModels(
  UpdateExaminationQuestionDto,
  CreateExaminationQuestionDto,
  UpdatePartiallyExaminationQuestionDto,
  ReadExaminationQuestionFilterDto
)
@ApiTags('Examination Question')
@Controller('examination-question')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ExaminatinQuestionController extends BaseController {
  constructor(private readonly questionService: ExaminationQuestionService) {
    super(questionService)
  }
}
