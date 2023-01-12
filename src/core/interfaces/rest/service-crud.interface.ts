import { IServiceGetInterface } from './service-get.interface';

export interface IServiceCrudInterface<T, TFilter>
  extends IServiceGetInterface<T, TFilter> {
  create: (model: T) => Promise<T | null>;
  edit: (id: number, model: T, params?: any) => Promise<T | null>;
  editPartially: (
    id: number,
    currentModel: T,
    newModel: T,
    params?: any,
  ) => Promise<T | null>;
  delete: (id: number) => Promise<boolean | null>;
}
