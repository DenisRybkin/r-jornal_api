import { OrderType } from '../order.type';

export interface IPagingOptions {
  page?: number;
  pageSize?: number;
  order?: OrderType;
}
