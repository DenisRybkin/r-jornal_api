import { Includeable, Transaction, WhereOptions } from 'sequelize'
import { Model, Repository } from 'sequelize-typescript'
import { IAutocomplete, IPaging, IPagingOptions, Order } from '../../common'
import { Nullable, NullableLike } from '../../../types'
import { BaseException } from '../../../exceptions/base.exception'
import { TransformedReadFilters } from '../../../bases/utils'
import { Attributes } from 'sequelize/types/model'
import { Logger } from '@nestjs/common'

export interface IConfigServiceRead<T extends Model<T, any>> {
  modelRepository: Repository<T>
  autocompleteProperty: string
  includes?: Includeable[]
  whereOpts?: WhereOptions<T>
  orderOpts?: Array<[string, Order]>
  whereOptsFactory?: () => WhereOptions
}

export abstract class BaseServiceRead<T extends Model<T, any>> {
  protected constructor(
    protected readonly config: IConfigServiceRead<T>,
    protected readonly logger: Logger
  ) {}
  abstract getById(
    id: number,
    rejectOnEmpty?: Nullable<BaseException | false>,
    transaction?: Nullable<Transaction>
  ): Promise<T>
  abstract getAll(
    pagingOpts: NullableLike<IPagingOptions, 'pageSize'>,
    filterOpts: Nullable<Partial<TransformedReadFilters<T>>>,
    transaction?: Nullable<Transaction>
  ): Promise<IPaging<T>>
  abstract autocomplete(
    pagingOpts: IPagingOptions,
    filterOpts: WhereOptions<Attributes<T>>,
    transaction?: Nullable<Transaction>
  ): Promise<IPaging<IAutocomplete>>
  abstract getOne(
    whereOpts: WhereOptions<Attributes<T>>,
    includes: Includeable[] | undefined,
    rejectOnEmpty: Nullable<BaseException | false>,
    transaction: Nullable<Transaction>
  ): Promise<T>
}
