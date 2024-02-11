import { Model } from 'sequelize-typescript'
import { BaseServiceRead } from 'src/core/bases/services'
import { IPaging, IPagingOptions } from '../../common'
import { ModelWithId } from '../model-with-id.interface'
import { IConfigServiceRead } from './service-read.interface'
import { Nullable, NullableLike } from '../../../types'
import { TransformedReadFilters } from '../../../bases/utils'
import { Logger } from '@nestjs/common'

export interface IConfigServiceReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
> extends IConfigServiceRead<T> {
  mapper: (fullModel: T) => TShort
}

export abstract class BaseServiceReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
> extends BaseServiceRead<T> {
  protected constructor(
    protected readonly config: IConfigServiceReadShort<T, TShort>,
    protected readonly logger: Logger
  ) {
    super(config, logger)
  }
  abstract getShortById(id: number): Promise<TShort>
  abstract getAllShort(
    pagingOpts: NullableLike<IPagingOptions, 'pageSize'>,
    filterOpts: Nullable<Partial<TransformedReadFilters<T>>>
  ): Promise<IPaging<TShort>>
}
