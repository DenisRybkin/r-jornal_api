import { User } from '../../../database/models/singles/User/user.model'
import { ArticleComment } from '../../../database/models/singles/ArticleComment/article-comment.model'
import { ArticleLike } from '../../../database/models/related/ArticleLike/article-like.model'
import { ArticleRepost } from '../../../database/models/related/ArticleRepost/article-repost.model'
import { ArticleHashtag } from '../../../database/models/related/ArticleHashtag/article-hashtag.model'
import { ModelWithId } from '../../../core/interfaces/rest/model-with-id.interface'
import { ApiProperty } from '@nestjs/swagger'

export class ArticleShortDto implements ModelWithId {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly body: string

  @ApiProperty()
  readonly createdByUserId: number

  @ApiProperty({ type: User })
  readonly createdByUser: User

  @ApiProperty({ type: ArticleComment, isArray: true })
  readonly comments: ArticleComment[]

  @ApiProperty({ type: ArticleLike, isArray: true })
  readonly likes: ArticleLike[]

  @ApiProperty({ type: ArticleRepost, isArray: true })
  readonly reposts: ArticleRepost[]

  @ApiProperty({ type: ArticleHashtag, isArray: true })
  readonly hashtags: ArticleHashtag[]

  @ApiProperty()
  readonly isLiked?: boolean

  @ApiProperty()
  readonly isCommented?: boolean

  @ApiProperty()
  readonly isReposted?: boolean
}
