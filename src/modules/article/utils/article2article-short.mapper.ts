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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createdByUser: article.createdByUser!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  hashtags: article.hashtags!,
  likesCount: article.likes?.length ?? 0,
  commentsCount: article.comments?.length ?? 0,
  repostsCount: article.reposts?.length ?? 0,
  isLiked: article.likes?.some(item => item.userId == user?.id),
  isCommented: article.comments?.some(item => item.createdByUserId == user?.id),
  isReposted: article.reposts?.some(item => item.userId == user?.id),
  createdAt: article.createdAt,
  updatedAt: article.updatedAt
})
