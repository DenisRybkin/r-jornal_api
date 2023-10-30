import { BaseServiceCRUD } from '../../core/bases/services'
import { Hashtag } from '../../database/models/singles/Hashtag/hashtag.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class HashtagService extends BaseServiceCRUD<Hashtag> {
  constructor(
    @InjectModel(Hashtag) private readonly hashtagRepository: typeof Hashtag
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: hashtagRepository,
      includes: []
    })
  }
}
