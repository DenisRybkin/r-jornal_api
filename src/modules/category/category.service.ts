import { Injectable } from '@nestjs/common'
import { Category } from '../../database/models/singles/Category/category.model'
import { InjectModel } from '@nestjs/sequelize'
import { BaseServiceCRUD } from '../../core/bases/services'
import { avatarInclude } from '../../database/includes/category'

@Injectable()
export class CategoryService extends BaseServiceCRUD<Category> {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: categoryRepository,
      includes: [avatarInclude]
    })
  }
}
