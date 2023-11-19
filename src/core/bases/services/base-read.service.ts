import { Includeable, Transaction, WhereOptions } from 'sequelize'
import { Model } from 'sequelize-typescript'
import { ErrorMessagesConstants } from 'src/core/constants'
import { NotFoundException } from 'src/core/exceptions/build-in'
import { PaginationHelper } from '../../helpers'
import { IAutocomplete, IPaging, IPagingOptions } from '../../interfaces/common'
import { Order as SequelizeOrder } from 'sequelize/types/model'
import {
  BaseServiceRead as AbstractServiceRead,
  IConfigServiceRead
} from '../../interfaces/rest/services'
import { Nullable, NullableLike } from '../../types'
import { defaultPagingOptions } from '../utils'
import { BaseException } from '../../exceptions/base.exception'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceRead<T extends Model<T, any>>
  implements AbstractServiceRead<T>
{
  protected constructor(protected readonly config: IConfigServiceRead<T>) {}

  public async getAll(
    pagingOpts: NullableLike<IPagingOptions, 'pageSize'> = defaultPagingOptions,
    filterOpts: Nullable<WhereOptions<T>> = null,
    transaction: Nullable<Transaction> = null
  ): Promise<IPaging<T>> {
    const { count, rows } = await this.config.modelRepository.findAndCountAll({
      ...PaginationHelper.genPagingOpts(pagingOpts),
      order: (this.config.orderOpts ?? []).concat([
        [pagingOpts.orderBy, pagingOpts.order]
      ]) as SequelizeOrder,
      where: Object.assign(
        filterOpts ?? {},
        this.config.whereOpts,
        this.config.whereOptsFactory?.()
      ),
      include: this.config.includes,
      transaction
    })
    return PaginationHelper.mapToIPaging<T>(count, rows, pagingOpts)
  }

  public async getById(
    id: number,
    rejectOnEmpty: Nullable<BaseException | false> = null,
    transaction: Nullable<Transaction> = null
  ): Promise<T> {
    return await this.config.modelRepository.findByPk(id, {
      include: this.config.includes,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(
          ErrorMessagesConstants.NotFound,
          `No such ${this.config.modelRepository.name}`
        ),
      transaction
    })
  }

  public async autocomplete(
    pagingOpts: IPagingOptions = defaultPagingOptions,
    filterOpts: WhereOptions<T>,
    transaction: Nullable<Transaction> = null
  ): Promise<IPaging<IAutocomplete>> {
    const { count, rows } = await this.config.modelRepository.findAndCountAll({
      ...PaginationHelper.genPagingOpts(pagingOpts),
      attributes: ['id', [this.config.autocompleteProperty, 'text']],
      order: (this.config.orderOpts ?? []).concat([
        [pagingOpts.orderBy, pagingOpts.order]
      ]) as SequelizeOrder,
      where: Object.assign(
        filterOpts,
        this.config.whereOpts,
        this.config.whereOptsFactory?.()
      ),
      transaction
    })

    return PaginationHelper.mapToIPaging<IAutocomplete>(
      count,
      rows as unknown as IAutocomplete[],
      pagingOpts
    )
  }

  protected async getOne(
    whereOpts: WhereOptions<T>,
    includes: Includeable[] | undefined = this.config.includes,
    rejectOnEmpty: Nullable<BaseException | false> = null,
    transaction: Nullable<Transaction> = null
  ) {
    return await this.config.modelRepository.findOne({
      where: whereOpts,
      include: includes,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(
          ErrorMessagesConstants.NotFound,
          `No such ${this.config.modelRepository.name}`
        ),
      transaction
    })
  }
}
