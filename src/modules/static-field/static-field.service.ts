import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { BaseServiceRead } from '../../core/bases/services'
import { CreateStaticFieldAttributes } from '../../database/models/singles/StaticField/static-field.attributes'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { unlink } from 'fs'
import { join } from 'path'
import { NotFoundException } from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'

@Injectable()
export class StaticFieldService extends BaseServiceRead<StaticField> {
  constructor(
    @InjectModel(StaticField)
    private readonly staticFieldRepository: typeof StaticField,
    private readonly configService: ApiConfigService
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
    return this.staticFieldRepository.create(dto)
  }

  async delete(id: number) {
    const target = await this.staticFieldRepository.findOne({ where: { id } })
    if (!target)
      throw new NotFoundException(
        ErrorMessagesConstants.NotFound,
        'No such static-field'
      )
    this.deleteFromStorage(target.name)
    return await this.staticFieldRepository.destroy({ where: { id } })
  }

  private deleteFromStorage(name: string) {
    unlink(
      join(this.configService.multerConfig.dest || './static/uploads', name),
      console.error
    )
  }
}
