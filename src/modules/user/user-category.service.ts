import { BaseServiceCRUD } from '../../core/bases/services'
import { UserCategory } from '../../database/models/related/UserCategory/user-category.model'
import { InjectModel } from '@nestjs/sequelize'

export class UserCategoryService extends BaseServiceCRUD<UserCategory> {
  constructor(
    @InjectModel(UserCategory)
    private readonly userCategoryRepository: typeof UserCategory
  ) {
    super({
      autocompleteProperty: 'categoryId',
      modelRepository: userCategoryRepository
    })
  }
}
