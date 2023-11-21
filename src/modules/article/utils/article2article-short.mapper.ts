import { Article } from '../../../database/models/singles/Article/article.model'
import { ArticleShortDto } from '../dto'
import { TokenPayload } from '../../auth/types'

export const article2articleShortMapper = (
  article: Article,
  user?: TokenPayload
): ArticleShortDto => ({
  id: article.id,
  body: article.body,
  createdByUserId: article.createdByUserId,
  createdByUser: article.createdByUser!,
  hashtags: article.hashtags!,
  likes: article.likes!,
  comments: article.comments!,
  reposts: article.reposts!,
  isLiked: article.likes?.some(item => item.userId == user?.id),
  isCommented: article.comments?.some(item => item.createdByUserId == user?.id),
  isReposted: article.reposts?.some(item => item.userId == user?.id)
})
