import { Model } from 'sequelize-typescript'
import { MakeNullishOptional } from 'sequelize/types/utils'
import {
  BaseServiceCRUD as AbstractServiceCRUD,
  IConfigServiceCRUD
} from '../../interfaces/rest/services'
import { BaseServiceRead } from './base-read.service'
import { ORMModelWithId } from '../../interfaces/rest/model-with-id.interface'
import { Includeable, WhereOptions } from 'sequelize'
import {
  Attributes,
  CreateOptions,
  DestroyOptions,
  UpdateOptions
} from 'sequelize/types/model'
import { Logger } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceCRUD<T extends Model<T, any>>
  extends BaseServiceRead<T>
  implements AbstractServiceCRUD<T>
{
  protected constructor(
    protected readonly config: IConfigServiceCRUD<T>,
    protected readonly logger: Logger
  ) {
    super(config, logger)
  }

  public async create(
    model: MakeNullishOptional<T['_creationAttributes']>,
    createOpts?: CreateOptions<Attributes<T>>
  ) {
    this.logger.log('start "create" method in base service crud')
    const result = await this.config.modelRepository.create(model, createOpts)
    if (result && this.config.beforeCreate)
      await this.config.beforeCreate(result)
    this.logger.log('end "create" method in base service crud')
    return result
  }

  public async update(
    idOrWhereOpts: number | Partial<T>,
    model: T | Partial<T>,
    updateOptions?: Omit<UpdateOptions<Attributes<T>>, 'returning' | 'where'>
  ) {
    this.logger.log('start "update" method in base service crud')
    const result = (
      await this.config.modelRepository.update<ORMModelWithId>(model, {
        where: {
          ...(typeof idOrWhereOpts == 'number'
            ? { id: idOrWhereOpts }
            : idOrWhereOpts)
        },
        returning: true,
        ...updateOptions
      })
    )[1][0] as unknown as T
    if (result && this.config.beforeUpdate)
      await this.config.beforeUpdate(result)
    this.logger.log('end "update" method in base service crud')
    return result
  }

  public async createOrUpdate(
    idOrWhereOpts: number | Partial<T>,
    model: MakeNullishOptional<T['_creationAttributes']>,
    includes?: Includeable[],
    createOpts?: CreateOptions<Attributes<T>>,
    updateOptions?: Omit<UpdateOptions<Attributes<T>>, 'returning' | 'where'>
  ) {
    this.logger.log('start "createOrUpdate" method in base service crud')
    const foundModel = await super.getOne(
      {
        ...(typeof idOrWhereOpts == 'number'
          ? { id: idOrWhereOpts }
          : idOrWhereOpts)
      } as WhereOptions<Attributes<T>>,
      includes,
      false
    )
    if (foundModel)
      return await this.update(idOrWhereOpts, model as T, updateOptions)
    this.logger.log('end "createOrUpdate" method in base service crud')
    return await this.create(model, createOpts)
  }

  public async delete(
    idOrWhereOpts: number | WhereOptions<Attributes<T>>,
    deleteOpts?: Omit<DestroyOptions<Attributes<T>>, 'where'>
  ): Promise<number> {
    this.logger.log('start "delete" method in base service crud')
    const result = await this.config.modelRepository.destroy<ORMModelWithId>({
      where: {
        ...(typeof idOrWhereOpts == 'number'
          ? { id: idOrWhereOpts }
          : idOrWhereOpts)
      },
      ...deleteOpts
    })
    if (this.config.beforeDelete) await this.config.beforeDelete()
    this.logger.log('end "delete" method in base service crud')
    return result
  }

  public async createOrDelete(
    idOrWhereOpts: WhereOptions<Attributes<T>>,
    model: MakeNullishOptional<T['_creationAttributes']>,
    createOpts?: CreateOptions<Attributes<T>>,
    deleteOpts?: Omit<DestroyOptions<Attributes<T>>, 'where'>
  ) {
    this.logger.log('start "createOrDelete" method in base service crud')
    const foundModel = await super.getOne(
      {
        ...(typeof idOrWhereOpts == 'number'
          ? { id: idOrWhereOpts }
          : idOrWhereOpts)
      } as WhereOptions<Attributes<T>>,
      undefined,
      false
    )
    if (foundModel) return await this.delete(idOrWhereOpts, deleteOpts)
    const createdModel = await this.create(model, createOpts)
    this.logger.log('end "createOrDelete" method in base service crud')
    return createdModel
  }
}
