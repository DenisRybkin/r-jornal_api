import { Module } from '@nestjs/common'
import { ArticleCommentController } from './article-comment.controller'
import { ArticleCommentService } from './article-comment.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleComment } from '../../database/models/singles/ArticleComment/article-comment.model'
import { ArticleCommentStaticField } from '../../database/models/related/ArticleCommentStaticField/article-comment-static-field.model'
import { StaticFieldModule } from '../static-field/static-field.module'
import { ArticleCommentStaticFieldService } from './article-comment-static-field.service'

@Module({
  imports: [
    SequelizeModule.forFeature([ArticleComment, ArticleCommentStaticField]),
    StaticFieldModule
  ],
  providers: [ArticleCommentService, ArticleCommentStaticFieldService],
  controllers: [ArticleCommentController],
  exports: [ArticleCommentService, ArticleCommentStaticFieldService]
})
export class ArticleCommentModule {}
