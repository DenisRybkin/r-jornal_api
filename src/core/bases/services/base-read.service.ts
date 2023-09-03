import sequelize, { WhereOptions } from 'sequelize'
import { Model, Sequelize } from 'sequelize-typescript'
import { ErrorMessagesConstants } from 'src/core/constants'
import { NotFoundException } from 'src/core/exceptions/build-in'
import { PaginationHelper } from '../../helpers'
import {
  IAutocomplete,
  IPaging,
  IPagingOptions,
  Order
} from '../../interfaces/common'
import {
  BaseServiceRead as AbstractServiceRead,
  IConfigServiceRead
} from '../../interfaces/rest/services'
import { Nullable } from '../../types'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceRead<T extends Model<T, any>>
  implements AbstractServiceRead<T>
{
  protected constructor(protected readonly config: IConfigServiceRead<T>) {}

  public async getAll(
    pagingOpts: IPagingOptions = {
      order: Order.desc,
      pageSize: 10,
      page: 1
    },
    filterOpts: WhereOptions
  ): Promise<IPaging<T>> {
    const { count, rows } = await this.config.modelRepository.findAndCountAll({
      ...PaginationHelper.genPagingOpts(pagingOpts),
      order: Sequelize.literal(`id ${pagingOpts.order.toUpperCase()}`),
      where: Object.assign(
        filterOpts,
        this.config.whereOpts,
        this.config.whereOptsFactory?.()
      ),
      include: this.config.includes
    })
    return PaginationHelper.mapToIPaging<T>(count, rows, pagingOpts)
  }

  public async getById(
    id: number,
    rejectOnEmpty: Nullable<Error> = null
  ): Promise<T> {
    return await this.config.modelRepository.findByPk(id, {
      include: this.config.includes,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(
          ErrorMessagesConstants.NotFound,
          `No such ${this.config.modelRepository.name}`
        )
    })
  }

  public async autocomplete(
    pagingOpts: IPagingOptions = {
      order: Order.desc,
      pageSize: 10,
      page: 1
    },
    filterOpts: WhereOptions
  ): Promise<IPaging<IAutocomplete>> {
    const { count, rows } = await this.config.modelRepository.findAndCountAll({
      ...PaginationHelper.genPagingOpts(pagingOpts),
      attributes: ['id', [this.config.autocompleteProperty, 'text']],
      order: Sequelize.literal(`id ${pagingOpts.order.toUpperCase()}`),
      where: Object.assign(filterOpts, this.config.whereOpts),
      include: this.config.includes
    })

    return PaginationHelper.mapToIPaging<IAutocomplete>(
      count,
      rows as unknown as IAutocomplete[],
      pagingOpts
    )
  }
}
