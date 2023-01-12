import { PagingOptions } from '../common/paging/paging.options';
import { PagingModel } from '../common/paging/paging.model';
import { AutocompleteModel } from '../common/autocomplete.model';

export interface IServiceGetInterface<T, TFilter> {
  getAll: (opts?: PagingOptions & TFilter) => Promise<PagingModel<T> | null>;
  autoComplete: (
    opts?: PagingOptions & TFilter,
  ) => Promise<AutocompleteModel[] | null>;
  getById: (id?: number, opts?: TFilter) => Promise<T>;
}
