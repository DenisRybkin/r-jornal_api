import { Model } from 'sequelize-typescript'
import { IPaging, IPagingOptions } from 'src/core/interfaces/common'
import { ModelWithId } from 'src/core/interfaces/rest/model-with-id.interface'
import {
  BaseServiceReadShort as AbstractServiceReadShort,
  IConfigServiceReadShort
} from 'src/core/interfaces/rest/services'
import { BaseServiceRead } from './base-read.service'
import { TransformedReadFilters } from '../utils'
import { Nullable } from '../../types'
import { Logger } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceReadShort<
    T extends Model<T, any>,
    TShort extends ModelWithId
  >
  extends BaseServiceRead<T>
  implements AbstractServiceReadShort<T, TShort>
{
  protected constructor(
    protected readonly config: IConfigServiceReadShort<T, TShort>,
    protected readonly logger: Logger
  ) {
    super(config, logger)
  }

  public async getAllShort(
    pagingOpts: IPagingOptions,
    filterOpts: Nullable<Partial<TransformedReadFilters<T>>>
  ): Promise<IPaging<TShort>> {
    this.logger.log('start "getAllShort" method in base service read short')
    const result = await super.getAll(pagingOpts, filterOpts)
    this.logger.log('end "getAllShort" method in base service read short')
    return { ...result, items: result?.items.map(this.config.mapper) }
  }

  public async getShortById(id: number): Promise<TShort> {
    this.logger.log('start "getShortById" method in base service read short')
    const result = this.config.mapper(await this.getById(id))
    this.logger.log('end "getShortById" method in base service read short')
    return result
  }
}
