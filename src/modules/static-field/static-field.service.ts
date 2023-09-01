import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { BaseServiceRead } from '../../core/bases/services'
import { CreateStaticFieldAttributes } from '../../database/models/singles/StaticField/static-field.attributes'

@Injectable()
export class StaticFieldService extends BaseServiceRead<StaticField> {
  constructor(
    @InjectModel(StaticField)
    private readonly staticFieldRepository: typeof StaticField
  ) {
    super({
      modelRepository: staticFieldRepository,
      autocompleteProperty: 'url'
    })
  }

  async getByName(name: string) {
    return this.staticFieldRepository.findOne({ where: { name } })
  }

  async create(dto: CreateStaticFieldAttributes) {
    console.log(dto)
    return this.staticFieldRepository.create(dto)
  }

  async delete(id: number) {
    return this.staticFieldRepository.destroy({ where: { id } })
  }
}
