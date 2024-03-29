import { Injectable } from '@nestjs/common'
import {
  AutoCompleteType,
  PagingType,
  BaseProcessedError,
  LoginResponseType,
  PagingOptionsType,
  ProcessedError400Type,
  ProcessedError401Type,
  ProcessedError404Type,
  ProcessedError500Type
} from '../../../interfaces/common'
import {
  ValidationErrorType,
  ValidationMessageType
} from '../../../exceptions/types/validation.types'
import { Role } from '../../../../database/models/singles/Role/role.model'
import { User } from '../../../../database/models/singles/User/user.model'
import { StaticField } from '../../../../database/models/singles/StaticField/static-field.model'
import { UserAvatar } from '../../../../database/models/related/UserAvatar/user-avatar.model'
import { Category } from '../../../../database/models/singles/Category/category.model'
import { CategoryAvatar } from '../../../../database/models/related/CategoryAvatar/category-avatar.model'
import { UserCategory } from '../../../../database/models/related/UserCategory/user-category.model'
import { Achievement } from '../../../../database/models/singles/Achievement/achievement.model'
import { UserAchievement } from '../../../../database/models/related/UserAchievement/user-achievement.model'
import { UserFollower } from '../../../../database/models/related/UserFollower/user-follower.model'
import { UserFollowing } from '../../../../database/models/related/UserFollowing/user-following.model'
import { Article } from '../../../../database/models/singles/Article/article.model'
import { ArticleTest } from '../../../../database/models/singles/ArticleTest/article-test.model'
import { ArticleTestQuestion } from '../../../../database/models/singles/ArticleTestQuestion/article-test-question.model'
import { ArticleTestAnswer } from '../../../../database/models/singles/ArticleTestAnswer/article-test-answer.model'
import { ArticleComment } from '../../../../database/models/singles/ArticleComment/article-comment.model'
import { ArticleCommentStaticField } from '../../../../database/models/related/ArticleCommentStaticField/article-comment-static-field.model'
import { ArticleCommentReaction } from '../../../../database/models/singles/ArticleCommentReaction/article-comment-reaction.model'
import { ArticleLike } from '../../../../database/models/related/ArticleLike/article-like.model'
import { ArticleRepost } from '../../../../database/models/related/ArticleRepost/article-repost.model'
import { ArticleCategory } from '../../../../database/models/related/ArticleCategory/article-category.model'
import { ArticleStaticField } from '../../../../database/models/related/ArticleStaticField/article-static-field.model'
import { ArticleHashtag } from '../../../../database/models/related/ArticleHashtag/article-hashtag.model'
import { Hashtag } from '../../../../database/models/singles/Hashtag/hashtag.model'
import { ArticleTestUser } from '../../../../database/models/related/ArticleTestUser/article-test-user.model'
import { Examination } from '../../../../database/models/singles/Examination/examination.model'
import { ExaminationAnswer } from '../../../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { ExaminationQuestion } from '../../../../database/models/singles/ExaminationQuestion/examination-question.model'

@Injectable()
export class SwaggerConfigProvider {
  private dbModels = [
    User,
    UserAvatar,
    Role,
    StaticField,
    CategoryAvatar,
    Category,
    UserCategory,
    UserAchievement,
    Achievement,
    Examination,
    ExaminationAnswer,
    ExaminationQuestion,
    UserFollower,
    UserFollowing,
    Article,
    ArticleTest,
    ArticleTestQuestion,
    ArticleTestAnswer,
    ArticleComment,
    ArticleCommentStaticField,
    ArticleCommentReaction,
    ArticleLike,
    ArticleRepost,
    ArticleCategory,
    ArticleStaticField,
    ArticleHashtag,
    Hashtag,
    ArticleTestUser
  ]
  private miscModels = [
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ValidationMessageType,
    ValidationErrorType,
    BaseProcessedError,
    ProcessedError400Type,
    ProcessedError401Type,
    ProcessedError404Type,
    ProcessedError500Type,
    LoginResponseType
  ]

  public extraModels = [...this.dbModels, ...this.miscModels]
}
