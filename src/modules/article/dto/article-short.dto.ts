import { User } from '../../../database/models/singles/User/user.model'
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

  @ApiProperty()
  readonly commentsCount: number

  @ApiProperty()
  readonly likesCount: number

  @ApiProperty()
  readonly repostsCount: number

  @ApiProperty({ type: ArticleHashtag, isArray: true })
  readonly hashtags: ArticleHashtag[]

  @ApiProperty()
  readonly isLiked?: boolean

  @ApiProperty()
  readonly isCommented?: boolean

  @ApiProperty()
  readonly isReposted?: boolean
}
