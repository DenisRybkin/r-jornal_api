import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { Roles } from '../../core/interfaces/common'
import {
  CreateExaminationDto,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto
} from './dto'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller, Param, Post } from '@nestjs/common'
import { ExaminationService } from './examination.service'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { CreateEndpoint } from '../../core/bases/decorators'
import { User } from '../../database/models/singles/User/user.model'

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

  @CreateEndpoint({
    operationName: 'Endpoint for pass examination & mutate user role',
    model: User
  })
  @Post('/pass/:id')
  async passExamination(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    id: number
  ) {
    return this.examinationService.passExamination(id)
  }
}
