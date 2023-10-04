import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import {
  CreateCategoryDto,
  ReadCategoryFilterDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto
} from './dtos'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Category } from '../../database/models/singles/Category/category.model'
import { CategoryService } from './category.service'
import { Roles } from '../../core/interfaces/common'

const BaseController = buildBaseControllerCRUD<Category>({
  swagger: { model: Category, modelName: 'category' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    deleteRequireRoles: [Roles.Admin, Roles.Owner],
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner]
  },
  updatePartiallyDto: UpdatePartiallyCategoryDto,
  updateDto: UpdateCategoryDto,
  createDto: CreateCategoryDto,
  filterDto: ReadCategoryFilterDto
})

@ApiExtraModels(
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto,
  ReadCategoryFilterDto
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
