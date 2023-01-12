import { OrderType } from '../order.type';

export type PagingOptions = {
  page?: number;
  pageSize?: number;
  order?: OrderType;
};
