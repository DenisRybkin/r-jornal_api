import { PagingOptions } from '../common';
import { PagingModel } from '../common';
import { AutocompleteModel } from '../common';

export interface IServiceGetInterface<T, TFilter> {
  getAll: (opts?: PagingOptions & TFilter) => Promise<PagingModel<T> | null>;
  autoComplete: (
    opts?: PagingOptions & TFilter,
  ) => Promise<AutocompleteModel[] | null>;
  getById: (id?: number, opts?: TFilter) => Promise<T>;
}
