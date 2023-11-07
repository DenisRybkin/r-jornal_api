import { IPaging, IPagingOptions } from '../interfaces/common'
import { DbPaginationOptions } from './types'
import { NullableLike } from '../types'

export class PaginationHelper {
  public static genPagingOpts(
    initialPagingOpts: NullableLike<IPagingOptions, 'pageSize'>
  ): DbPaginationOptions | undefined {
    if (!initialPagingOpts.pageSize || initialPagingOpts.pageSize < 0)
      return undefined
    return {
      limit: initialPagingOpts.pageSize,
      offset: PaginationHelper.getOffset(
        initialPagingOpts.page,
        initialPagingOpts.pageSize
      )
    }
  }

  public static mapToIPaging<T>(
    count: number,
    data: T[],
    opts: NullableLike<IPagingOptions, 'pageSize'>
  ): IPaging<T> {
    return {
      items: data,
      totalItems: count,
      pagingOptions: { ...opts, pageSize: opts.pageSize ?? -1 },
      totalPages: PaginationHelper.getTotalPages(count, opts.pageSize)
    }
  }

  private static getTotalPages(totalItems: number, pageSize?: number | null) {
    if (!pageSize) return 1
    return Math.ceil(totalItems / pageSize)
  }

  private static getOffset(page: number, pageSize: number): number {
    return page * pageSize - pageSize
  }
}
