import { Model } from 'sequelize-typescript'
import { MakeNullishOptional } from 'sequelize/types/utils'
import {
  BaseServiceCRUD as AbstractServiceCRUD,
  IConfigServiceCRUD
} from '../../interfaces/rest/services'
import { BaseServiceRead } from './base-read.service'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceCRUD<T extends Model<T, any>>
  extends BaseServiceRead<T>
  implements AbstractServiceCRUD<T>
{
  constructor(protected readonly config: IConfigServiceCRUD<T>) {
    super(config)
  }

  public async create(model: MakeNullishOptional<T['_creationAttributes']>) {
    return this.config.modelRepository.create(model)
  }

  public async update(id: number, model: T) {
    return (
      await this.config.modelRepository.update(model, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        where: {
          id
        },
        returning: true,
        plain: true
      })
    )[1] as unknown as T
  }

  public async updatePartially(id: number, model: Partial<T>) {
    return (
      await this.config.modelRepository.update(model, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        where: {
          id
        },
        returning: true,
        plain: true
      })
    )[1] as unknown as T
  }

  public async delete(id: number): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.config.modelRepository.destroy({ where: { id } })
  }
}
