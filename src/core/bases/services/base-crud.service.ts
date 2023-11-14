import { Model } from 'sequelize-typescript'
import { MakeNullishOptional } from 'sequelize/types/utils'
import {
  BaseServiceCRUD as AbstractServiceCRUD,
  IConfigServiceCRUD
} from '../../interfaces/rest/services'
import { BaseServiceRead } from './base-read.service'
import { ORMModelWithId } from '../../interfaces/rest/model-with-id.interface'
import { Includeable } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceCRUD<T extends Model<T, any>>
  extends BaseServiceRead<T>
  implements AbstractServiceCRUD<T>
{
  protected constructor(protected readonly config: IConfigServiceCRUD<T>) {
    super(config)
  }

  public async create(model: MakeNullishOptional<T['_creationAttributes']>) {
    const result = await this.config.modelRepository.create(model)
    if (result && this.config.beforeCreate)
      await this.config.beforeCreate(result)
    return result
  }

  public async update(
    idOrWhereOpts: number | Partial<T>,
    model: T | Partial<T>
  ) {
    const result = (
      await this.config.modelRepository.update<ORMModelWithId>(model, {
        where: {
          ...(typeof idOrWhereOpts == 'number'
            ? { id: idOrWhereOpts }
            : idOrWhereOpts)
        },
        returning: true
      })
    )[1][0] as unknown as T
    if (result && this.config.beforeUpdate)
      await this.config.beforeUpdate(result)
    return result
  }

  public async createOrUpdate(
    idOrWhereOpts: number | Partial<T>,
    model: MakeNullishOptional<T['_creationAttributes']>,
    includes?: Includeable[]
  ) {
    const foundModel = await super.getOne(
      {
        where: {
          ...(typeof idOrWhereOpts == 'number'
            ? { id: idOrWhereOpts }
            : idOrWhereOpts)
        }
      },
      includes,
      false
    )
    if (foundModel) return await this.update(idOrWhereOpts, model as T)
    return await this.create(model)
  }

  public async delete(idOrWhereOpts: number | Partial<T>): Promise<number> {
    const result = await this.config.modelRepository.destroy<ORMModelWithId>({
      where: {
        ...(typeof idOrWhereOpts == 'number'
          ? { id: idOrWhereOpts }
          : idOrWhereOpts)
      }
    })
    if (this.config.beforeDelete) await this.config.beforeDelete()
    return result
  }

  public async createOrDelete(
    idOrWhereOpts: number | Partial<T>,
    model: MakeNullishOptional<T['_creationAttributes']>
  ) {
    const foundModel = await super.getOne({
      where: {
        ...(typeof idOrWhereOpts == 'number'
          ? { id: idOrWhereOpts }
          : idOrWhereOpts)
      }
    })

    if (foundModel) return await this.delete(idOrWhereOpts)
    return this.create(model)
  }
}
