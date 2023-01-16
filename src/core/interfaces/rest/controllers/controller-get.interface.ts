import { IAutocomplete, IPaging, IPagingOptions } from '../../common';

export interface IControllerGet<T, TFilter> {
  getAll: (opts?: IPagingOptions & TFilter) => Promise<IPaging<T> | null>;
  autoComplete: (
    opts?: IPagingOptions & TFilter,
  ) => Promise<IAutocomplete[] | null>;
  getById: (id: number, opts?: TFilter) => Promise<T>;
}
