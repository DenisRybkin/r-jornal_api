import { IPagingOptions } from './';

export type IPaging<T> = {
  pagingOptions: IPagingOptions;
  totalItems?: number;
  totalPages?: number;
  items: T[];
};
