import { Includeable } from 'sequelize'
import { User } from '../../models/singles/User/user.model'
import { ArticleLike } from '../../models/related/ArticleLike/article-like.model'
import { ArticleComment } from '../../models/singles/ArticleComment/article-comment.model'
import { ArticleRepost } from '../../models/related/ArticleRepost/article-repost.model'
import { ArticleTest } from '../../models/singles/ArticleTest/article-test.model'
import { ArticleCategory } from '../../models/related/ArticleCategory/article-category.model'
import { ArticleStaticField } from '../../models/related/ArticleStaticField/article-static-field.model'
import { ArticleHashtag } from '../../models/related/ArticleHashtag/article-hashtag.model'
import {
  avatarInclude as userAvatarInclude,
  defaultAvatarInclude as userDefaultAvatarInclude
} from '../user'
import { avatarInclude as categoryAvatarInclude } from '../category'
import { StaticField } from '../../models/singles/StaticField/static-field.model'
import { Hashtag } from '../../models/singles/Hashtag/hashtag.model'
import { Category } from '../../models/singles/Category/category.model'
import { questionsWithAnswersInclude } from '../article-test'

export const creatorInclude: Includeable = {
  model: User,
  as: 'createdByUser',
  include: [userAvatarInclude, userDefaultAvatarInclude]
}

export const testInclude: Includeable = {
  model: ArticleTest,
  as: 'test',
  include: [questionsWithAnswersInclude]
}

export const commentsInclude: Includeable = {
  model: ArticleComment,
  as: 'comments'
}

export const likesInclude: Includeable = {
  model: ArticleLike,
  as: 'likes'
}

export const repostsInclude: Includeable = {
  model: ArticleRepost,
  as: 'reposts'
}

const categoryInclude: Includeable = {
  model: Category,
  include: [categoryAvatarInclude]
}

export const categoriesInclude: Includeable = {
  model: ArticleCategory,
  as: 'categories',
  include: [categoryInclude]
}

const staticFiledInclude: Includeable = {
  model: StaticField,
  as: 'staticField'
}

export const previewInclude: Includeable = {
  model: ArticleStaticField,
  as: 'preview',
  include: [staticFiledInclude]
}

const articleHashtagInclude: Includeable = {
  model: Hashtag,
  as: 'hashtag'
}

export const hashtagsInclude: Includeable = {
  model: ArticleHashtag,
  as: 'hashtags',
  include: [articleHashtagInclude]
}
