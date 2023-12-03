import { Includeable } from 'sequelize'
import { User } from '../../models/singles/User/user.model'
import {
  avatarInclude as userAvatarInclude,
  defaultAvatarInclude as userDefaultAvatarInclude
} from '../user'
import { ArticleCommentStaticField } from '../../models/related/ArticleCommentStaticField/article-comment-static-field.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'
import { ArticleCommentReaction } from '../../models/singles/ArticleCommentReaction/article-comment-reaction.model'

export const creatorInclude: Includeable = {
  model: User,
  as: 'createdByUser',
  include: [userAvatarInclude, userDefaultAvatarInclude]
}

export const attachmentsInclude: Includeable = {
  model: ArticleCommentStaticField,
  as: 'attachments',
  include: [{ model: StaticField, as: 'staticField' }]
}

const userReactionInclude: Includeable = {
  model: User,
  as: 'user'
}

export const reactionsInclude: Includeable = {
  model: ArticleCommentReaction,
  as: 'reactions',
  include: [userReactionInclude]
}
