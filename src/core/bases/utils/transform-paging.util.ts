import { Query } from 'express-serve-static-core'
import { PagingConstants } from 'src/core/constants/paging.constants'
import { IPagingOptions, Order, OrderType } from 'src/core/interfaces/common'

export type TransformPagingType = {
  pagingOptions: IPagingOptions
  other: Query
}

const transformOrder = (
  transformValue: OrderType,
  defaultValue: OrderType
): OrderType => {
  return transformValue
    ? Object.values(Order).includes(transformValue)
      ? transformValue
      : defaultValue
    : defaultValue
}

const transformInt = (transformValue: string, defaultValue: number): number => {
  return transformValue
    ? Number.isNaN(parseInt(transformValue, 10))
      ? defaultValue
      : parseInt(transformValue as unknown as string, 10)
    : defaultValue
}

export const transformPagingOptions = (value: Query): TransformPagingType => {
  const { page, pageSize, order, ...other } = value

  const transformedPage = transformInt(page as string, PagingConstants.Page)
  const transformedPageSize = transformInt(
    pageSize as string,
    PagingConstants.PageSize
  )
  const transformedOrder = transformOrder(order as OrderType, Order.desc)

  return {
    pagingOptions: {
      page: transformedPage,
      pageSize: transformedPageSize,
      order: transformedOrder
    },
    other
  }
}
