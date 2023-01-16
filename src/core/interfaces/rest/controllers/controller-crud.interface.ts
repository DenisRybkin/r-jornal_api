import { IControllerGet } from './controller-get.interface';

export interface IControllerCrud<T, TFilter>
  extends IControllerGet<T, TFilter> {
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
