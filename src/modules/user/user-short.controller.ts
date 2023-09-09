import { buildBaseControllerReadShort } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import { ReadUserFilterDto, UserShortDto } from './dtos'
import { UserShortService } from './user-short.service'
import { Controller } from '@nestjs/common'
import { ApiExtraModels } from '@nestjs/swagger'

const BaseController = buildBaseControllerReadShort<User, UserShortDto>({
  filterDto: ReadUserFilterDto,
  swagger: { modelName: 'userShort', model: User, shortModel: UserShortDto }
})

@ApiExtraModels(UserShortDto)
@Controller('user-short')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class UserShortController extends BaseController {
  constructor(private readonly userShortService: UserShortService) {
    super(userShortService)
  }
}