import {
  Includeable,
  IncludeOptions,
  Transaction,
  WhereOptions
} from 'sequelize'
import { Model } from 'sequelize-typescript'
import { ErrorMessagesConstants } from 'src/core/constants'
import { NotFoundException } from 'src/core/exceptions/build-in'
import { IncludesHelper, PaginationHelper } from '../../helpers'
import { IAutocomplete, IPaging, IPagingOptions } from '../../interfaces/common'
import { Attributes, Order as SequelizeOrder } from 'sequelize/types/model'
import {
  BaseServiceRead as AbstractServiceRead,
  IConfigServiceRead
} from '../../interfaces/rest/services'
import { Nullable, NullableLike } from '../../types'
import { defaultPagingOptions, TransformedReadFilters } from '../utils'
import { BaseException } from '../../exceptions/base.exception'
import { Logger } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceRead<T extends Model<T, any>>
  implements AbstractServiceRead<T>
{
  protected constructor(
    protected readonly config: IConfigServiceRead<T>,
    protected readonly logger: Logger
  ) {}

  public async getAll(
    pagingOpts: NullableLike<IPagingOptions, 'pageSize'> = defaultPagingOptions,
    filterOpts: Nullable<Partial<TransformedReadFilters>> = null,
    transaction: Nullable<Transaction> = null
  ): Promise<IPaging<T>> {
    this.logger.log('start "getAll" method in base service read')
    const { count, rows } = await this.config.modelRepository.findAndCountAll({
      distinct: true,
      where: Object.assign(
        filterOpts?.filters ?? {},
        this.config.whereOpts,
        this.config.whereOptsFactory?.()
      ),
      ...PaginationHelper.genPagingOpts(pagingOpts),
      order: (this.config.orderOpts ?? []).concat([
        [pagingOpts.orderBy, pagingOpts.order]
      ]) as SequelizeOrder,
      include: IncludesHelper.transformWithFilters(
        (this.config.includes ?? []) as IncludeOptions[],
        filterOpts?.associatedFilters ?? []
      ),
      transaction
    })
    this.logger.log('end "getAll" method in base service read')
    return PaginationHelper.mapToIPaging<T>(count, rows, pagingOpts)
  }

  public async getById(
    id: number,
    rejectOnEmpty: Nullable<BaseException | false> = null,
    transaction: Nullable<Transaction> = null
  ): Promise<T> {
    this.logger.log('start "getById" method in base service read')
    const result = await this.config.modelRepository.findByPk(id, {
      include: this.config.includes,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(
          ErrorMessagesConstants.NotFound,
          `No such ${this.config.modelRepository.name}`
        ),
      transaction
    })
    this.logger.log('end "getById" method in base service read')
    return result
  }

  public async autocomplete(
    pagingOpts: NullableLike<IPagingOptions, 'pageSize'> = defaultPagingOptions,
    filterOpts: Nullable<WhereOptions<Attributes<T>>> = null,
    transaction: Nullable<Transaction> = null
  ): Promise<IPaging<IAutocomplete>> {
    this.logger.log('start "autocomplete" method in base service read')
    const { count, rows } = await this.config.modelRepository.findAndCountAll({
      ...PaginationHelper.genPagingOpts(pagingOpts),
      attributes: ['id', [this.config.autocompleteProperty, 'text']],
      order: (this.config.orderOpts ?? []).concat([
        [pagingOpts.orderBy, pagingOpts.order]
      ]) as SequelizeOrder,
      where: Object.assign(
        filterOpts ?? {},
        this.config.whereOpts,
        this.config.whereOptsFactory?.()
      ),
      transaction
    })
    this.logger.log('end "autocomplete" method in base service read')
    return PaginationHelper.mapToIPaging<IAutocomplete>(
      count,
      rows as unknown as IAutocomplete[],
      pagingOpts
    )
  }

  public async getOne(
    whereOpts: WhereOptions<Attributes<T>>,
    includes: Includeable[] | undefined = this.config.includes,
    rejectOnEmpty: Nullable<BaseException | false> = null,
    transaction: Nullable<Transaction> = null
  ) {
    this.logger.log('start "getOne" method in base service read')
    const result = await this.config.modelRepository.findOne({
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
    this.logger.log('end "getOne" method in base service read')
    return result
  }
}
