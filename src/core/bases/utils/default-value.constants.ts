import { IPagingOptions, Order } from '../../interfaces/common'
import { TransformedQuery } from './transform-read-filter.util'

export const defaultPagingOptions: IPagingOptions = {
  order: Order.desc,
  pageSize: 10,
  page: 1,
  orderBy: 'createdAt'
}

export const defaultTransformedQuery: TransformedQuery = {
  filters: [],
  associatedFilters: []
}
