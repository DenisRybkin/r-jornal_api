import { IPagingOptions } from '../../common';
import { IPaging } from '../../common';
import { IAutocomplete } from '../../common';

export interface IServiceRead<T, TFilter> {
  getAll: (
    opts: Required<IPagingOptions> & TFilter,
  ) => Promise<IPaging<T> | null>;
  autocomplete: (
    opts: Required<IPagingOptions> & TFilter,
  ) => Promise<IAutocomplete[] | null>;
  getById: (id: number, opts?: TFilter) => Promise<T | null>;
}
