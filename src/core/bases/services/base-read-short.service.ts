import { WhereOptions } from 'sequelize'
import { Model } from 'sequelize-typescript'
import { IPaging, IPagingOptions, Order } from 'src/core/interfaces/common'
import { ModelWithId } from 'src/core/interfaces/rest/model-with-id.interface'
import {
  BaseServiceReadShort as AbstractServiceReadShort,
  IConfigServiceReadShort
} from 'src/core/interfaces/rest/services'
import { BaseServiceRead } from './base-read.service'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceReadShort<
    T extends Model<T, any>,
    TShort extends ModelWithId
  >
  extends BaseServiceRead<T>
  implements AbstractServiceReadShort<T, TShort>
{
  constructor(protected readonly config: IConfigServiceReadShort<T, TShort>) {
    super(config)
  }

  public async getAllShort(
    pagingOpts: IPagingOptions = {
      order: Order.desc,
      pageSize: 10,
      page: 1
    },
    filterOpts: WhereOptions
  ): Promise<IPaging<TShort>> {
    const result = await this.getAll(pagingOpts, filterOpts)
    return { ...result, items: result?.items.map(this.config.mapper) }
  }

  public async getShortById(id: number): Promise<TShort> {
    return this.config.mapper(await this.getById(id))
  }
}
