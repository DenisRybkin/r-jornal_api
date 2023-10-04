import {
  UpdateAnswerDto,
  ReadAnswerFilterDto,
  CreateAnswerDto,
  UpdatePartiallyAnswerDto
} from './dtos'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Answer } from '../../database/models/singles/Answer/answer.model'
import { Roles } from '../../core/interfaces/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { AnswerService } from './answer.service'

const BaseController = buildBaseControllerCRUD<Answer>({
  swagger: { model: Answer, modelName: 'answer' },
  privacySettings: {
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner],
    deleteRequireRoles: [Roles.Admin, Roles.Owner]
  },
  filterDto: ReadAnswerFilterDto,
  createDto: CreateAnswerDto,
  updateDto: UpdateAnswerDto,
  updatePartiallyDto: UpdatePartiallyAnswerDto
})

@ApiExtraModels(
  UpdateAnswerDto,
  ReadAnswerFilterDto,
  CreateAnswerDto,
  UpdatePartiallyAnswerDto
)
@ApiTags('Answer')
@Controller('answer')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class AnswerController extends BaseController {
  constructor(private readonly answerService: AnswerService) {
    super(answerService)
  }
}
