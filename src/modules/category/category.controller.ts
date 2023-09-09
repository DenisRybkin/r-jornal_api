import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import {
  CreateCategoryDto,
  ReadFilterDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto
} from './dtos'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Category } from '../../database/models/singles/Category/category.model'
import { Roles } from '../../core/interfaces/common'
import { CategoryService } from './category.service'

const BaseController = buildBaseControllerCRUD<Category>({
  swagger: { model: Category, modelName: 'category' },
  privacySettings: {
    deleteRequireRoles: [Roles.Admin, Roles.OWNER],
    updateRequireRoles: [Roles.Admin, Roles.OWNER],
    createRequireRoles: [Roles.Admin, Roles.OWNER]
  },
  updatePartiallyDto: UpdatePartiallyCategoryDto,
  updateDto: UpdateCategoryDto,
  createDto: CreateCategoryDto,
  filterDto: ReadFilterDto
})

@ApiExtraModels(
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto,
  ReadFilterDto
)
@ApiTags('Category')
@Controller('category')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService)
  }
}
