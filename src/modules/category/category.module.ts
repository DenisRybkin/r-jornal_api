import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Category } from '../../database/models/singles/Category/category.model'
import { CategoryAvatar } from '../../database/models/related/CategoryAvatar/category-avatar.model'
import { StaticFieldModule } from '../static-field/static-field.module'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [
    SequelizeModule.forFeature([Category, CategoryAvatar]),
    StaticFieldModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
