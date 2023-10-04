import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { Roles } from '../../core/interfaces/common'
import {
  CreateExaminationDto,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto
} from './dtos'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { ExaminationService } from './examination.service'

const BaseController = buildBaseControllerCRUD<Examination>({
  swagger: { model: Examination, modelName: 'examination' },
  privacySettings: {
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner],
    deleteRequireRoles: [Roles.Admin, Roles.Owner]
  },
  filterDto: ReadExaminationFilterDto,
  createDto: CreateExaminationDto,
  updateDto: UpdatePartiallyExaminationDto,
  updatePartiallyDto: UpdateExaminationDto
})

@ApiExtraModels(
  CreateExaminationDto,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto
)
@ApiTags('Examination')
@Controller('examination')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ExaminationController extends BaseController {
  constructor(private readonly examinationService: ExaminationService) {
    super(examinationService)
  }
}
